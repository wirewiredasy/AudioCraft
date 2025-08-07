"""
Background Processing Queue System for ODOREMOVER Audio Suite
"""
import os
import asyncio
import json
from typing import Dict, Any, Optional, Callable, List
from datetime import datetime, timedelta
from enum import Enum
import uuid
import redis
from celery import Celery
import websockets
from dataclasses import dataclass

from .database import db_manager, ProcessingStatus, AudioTool

# Redis Configuration
REDIS_URL = os.getenv("REDIS_URL", "redis://localhost:6379")
BROKER_URL = os.getenv("CELERY_BROKER_URL", REDIS_URL)

# Celery Configuration
celery_app = Celery(
    'odoremover_audio_processor',
    broker=BROKER_URL,
    backend=BROKER_URL,
    include=['backend.shared.processing_queue']
)

celery_app.conf.update(
    task_serializer='json',
    accept_content=['json'],
    result_serializer='json',
    timezone='UTC',
    enable_utc=True,
    task_track_started=True,
    task_time_limit=30 * 60,  # 30 minutes
    task_soft_time_limit=25 * 60,  # 25 minutes
    worker_prefetch_multiplier=1,
    task_acks_late=True,
    worker_disable_rate_limits=False,
    task_default_retry_delay=60,
    task_max_retries=3,
)

# Redis client for real-time updates
redis_client = redis.from_url(REDIS_URL, decode_responses=True)

@dataclass
class ProcessingProgress:
    job_id: str
    progress: float
    status: ProcessingStatus
    message: str = ""
    current_step: str = ""
    total_steps: int = 1
    current_step_num: int = 1
    estimated_time_remaining: Optional[float] = None

class AudioProcessor:
    def __init__(self):
        self.active_connections: Dict[str, List[websockets.WebSocketServerProtocol]] = {}
    
    async def register_websocket(self, job_id: str, websocket: websockets.WebSocketServerProtocol):
        """Register WebSocket connection for job updates"""
        if job_id not in self.active_connections:
            self.active_connections[job_id] = []
        self.active_connections[job_id].append(websocket)
    
    async def unregister_websocket(self, job_id: str, websocket: websockets.WebSocketServerProtocol):
        """Unregister WebSocket connection"""
        if job_id in self.active_connections:
            if websocket in self.active_connections[job_id]:
                self.active_connections[job_id].remove(websocket)
            if not self.active_connections[job_id]:
                del self.active_connections[job_id]
    
    async def broadcast_progress(self, progress: ProcessingProgress):
        """Broadcast progress update to all connected WebSocket clients"""
        if progress.job_id in self.active_connections:
            message = {
                "type": "progress_update",
                "job_id": progress.job_id,
                "progress": progress.progress,
                "status": progress.status.value,
                "message": progress.message,
                "current_step": progress.current_step,
                "current_step_num": progress.current_step_num,
                "total_steps": progress.total_steps,
                "estimated_time_remaining": progress.estimated_time_remaining,
                "timestamp": datetime.utcnow().isoformat()
            }
            
            # Send to all connected WebSocket clients
            dead_connections = []
            for websocket in self.active_connections[progress.job_id]:
                try:
                    await websocket.send(json.dumps(message))
                except websockets.exceptions.ConnectionClosed:
                    dead_connections.append(websocket)
            
            # Clean up dead connections
            for dead_ws in dead_connections:
                await self.unregister_websocket(progress.job_id, dead_ws)
        
        # Store progress in Redis for REST API access
        await self.store_progress_in_redis(progress)
    
    async def store_progress_in_redis(self, progress: ProcessingProgress):
        """Store progress in Redis for REST API access"""
        key = f"job_progress:{progress.job_id}"
        data = {
            "progress": progress.progress,
            "status": progress.status.value,
            "message": progress.message,
            "current_step": progress.current_step,
            "current_step_num": progress.current_step_num,
            "total_steps": progress.total_steps,
            "estimated_time_remaining": progress.estimated_time_remaining,
            "updated_at": datetime.utcnow().isoformat()
        }
        redis_client.setex(key, 3600, json.dumps(data))  # Expire after 1 hour
    
    async def get_progress_from_redis(self, job_id: str) -> Optional[ProcessingProgress]:
        """Get progress from Redis"""
        key = f"job_progress:{job_id}"
        data = redis_client.get(key)
        if data:
            parsed = json.loads(data)
            return ProcessingProgress(
                job_id=job_id,
                progress=parsed["progress"],
                status=ProcessingStatus(parsed["status"]),
                message=parsed["message"],
                current_step=parsed["current_step"],
                current_step_num=parsed["current_step_num"],
                total_steps=parsed["total_steps"],
                estimated_time_remaining=parsed.get("estimated_time_remaining")
            )
        return None

# Global audio processor instance
audio_processor = AudioProcessor()

class ProcessingError(Exception):
    """Custom exception for processing errors"""
    pass

@celery_app.task(bind=True)
def process_audio_task(self, job_id: str, user_id: str, tool_type: str, settings: dict, input_files: list):
    """Celery task for processing audio files"""
    import asyncio
    
    async def _process_audio():
        try:
            # Update job status to processing
            await db_manager.update_job_progress(
                job_id, 
                0.0, 
                ProcessingStatus.PROCESSING
            )
            
            # Send initial progress update
            progress = ProcessingProgress(
                job_id=job_id,
                progress=0.0,
                status=ProcessingStatus.PROCESSING,
                message="Starting audio processing...",
                current_step="Initializing",
                total_steps=len(input_files) + 2,  # files + init + finalize
                current_step_num=1
            )
            await audio_processor.broadcast_progress(progress)
            
            # Import the specific processor based on tool type
            tool_processors = {
                AudioTool.VOCAL_REMOVER: 'backend.services.vocal_remover.processor',
                AudioTool.PITCH_TEMPO: 'backend.services.pitch_tempo.processor',
                AudioTool.CONVERTER: 'backend.services.converter.processor',
                AudioTool.SPLITTER: 'backend.services.audio_splitter.processor',
                AudioTool.KARAOKE: 'backend.services.karaoke.processor',
                AudioTool.NOISE_REDUCTION: 'backend.services.noise_reduction.processor',
                AudioTool.VOLUME_NORMALIZER: 'backend.services.volume_normalizer.processor',
                AudioTool.EQUALIZER: 'backend.services.equalizer.processor',
                AudioTool.CUTTER_JOINER: 'backend.services.cutter_joiner.processor',
                AudioTool.METADATA_EDITOR: 'backend.services.metadata_editor.processor',
                AudioTool.AUDIO_REVERSE: 'backend.services.audio_reverse.processor',
                AudioTool.FADE_EFFECT: 'backend.services.fade_effect.processor',
            }
            
            processor_module = tool_processors.get(AudioTool(tool_type))
            if not processor_module:
                raise ProcessingError(f"Unknown tool type: {tool_type}")
            
            # Process each file
            output_files = []
            for i, input_file in enumerate(input_files):
                current_progress = ProcessingProgress(
                    job_id=job_id,
                    progress=(i + 1) / (len(input_files) + 2) * 100,
                    status=ProcessingStatus.PROCESSING,
                    message=f"Processing file {i + 1} of {len(input_files)}...",
                    current_step=f"Processing {input_file}",
                    current_step_num=i + 2,
                    total_steps=len(input_files) + 2
                )
                await audio_processor.broadcast_progress(current_progress)
                
                # Here we would call the actual processor
                # For now, simulate processing with a delay
                await asyncio.sleep(2)  # Simulate processing time
                
                # Add processed file to output list
                output_file = f"processed_{input_file}"
                output_files.append(output_file)
                
                # Update database with partial progress
                await db_manager.update_job_progress(
                    job_id, 
                    (i + 1) / (len(input_files) + 2) * 100
                )
            
            # Finalization step
            final_progress = ProcessingProgress(
                job_id=job_id,
                progress=100.0,
                status=ProcessingStatus.COMPLETED,
                message="Audio processing completed successfully!",
                current_step="Finalizing",
                current_step_num=len(input_files) + 2,
                total_steps=len(input_files) + 2
            )
            await audio_processor.broadcast_progress(final_progress)
            
            # Update job in database
            await db_manager.update_job_progress(
                job_id, 
                100.0, 
                ProcessingStatus.COMPLETED
            )
            
            return {"status": "completed", "output_files": output_files}
            
        except Exception as e:
            # Handle errors
            error_progress = ProcessingProgress(
                job_id=job_id,
                progress=0.0,
                status=ProcessingStatus.FAILED,
                message=f"Processing failed: {str(e)}",
                current_step="Error"
            )
            await audio_processor.broadcast_progress(error_progress)
            
            await db_manager.update_job_progress(
                job_id, 
                0.0, 
                ProcessingStatus.FAILED
            )
            
            raise ProcessingError(str(e))
    
    # Run the async processing function
    return asyncio.run(_process_audio())

class QueueManager:
    def __init__(self):
        self.redis_client = redis_client
    
    async def enqueue_job(self, job_id: str, user_id: str, tool_type: AudioTool, settings: dict, input_files: list, priority: int = 5):
        """Enqueue a job for processing"""
        
        # Create job record in database
        from .database import AudioJobCreate
        job_data = AudioJobCreate(
            tool_type=tool_type,
            settings=settings,
            batch_files=input_files
        )
        
        job_record = await db_manager.create_job(user_id, job_data)
        
        # Submit to Celery for background processing
        task = process_audio_task.delay(
            job_id=job_record.id,
            user_id=user_id,
            tool_type=tool_type.value,
            settings=settings,
            input_files=input_files
        )
        
        # Store task ID for tracking
        self.redis_client.setex(
            f"celery_task:{job_record.id}",
            3600,  # 1 hour
            task.id
        )
        
        return job_record
    
    async def get_queue_status(self) -> dict:
        """Get current queue status"""
        inspect = celery_app.control.inspect()
        
        # Get active, scheduled, and reserved tasks
        active = inspect.active()
        scheduled = inspect.scheduled()
        reserved = inspect.reserved()
        
        return {
            "active_tasks": len(active.get('celery@worker', [])) if active else 0,
            "scheduled_tasks": len(scheduled.get('celery@worker', [])) if scheduled else 0,
            "reserved_tasks": len(reserved.get('celery@worker', [])) if reserved else 0,
            "total_workers": len(active.keys()) if active else 0
        }
    
    async def cancel_job(self, job_id: str, user_id: str):
        """Cancel a queued or running job"""
        
        # Get Celery task ID
        task_id = self.redis_client.get(f"celery_task:{job_id}")
        if task_id:
            celery_app.control.revoke(task_id, terminate=True)
        
        # Update job status in database
        await db_manager.update_job_progress(
            job_id, 
            0.0, 
            ProcessingStatus.CANCELLED
        )
        
        # Broadcast cancellation
        cancel_progress = ProcessingProgress(
            job_id=job_id,
            progress=0.0,
            status=ProcessingStatus.CANCELLED,
            message="Job cancelled by user"
        )
        await audio_processor.broadcast_progress(cancel_progress)
        
        return {"status": "cancelled"}

# Global queue manager instance
queue_manager = QueueManager()