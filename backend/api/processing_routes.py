"""
Processing API Routes for ODOREMOVER Audio Suite
"""
import json
from typing import List, Optional
from fastapi import APIRouter, HTTPException, status, Depends, UploadFile, File, WebSocket
from pydantic import BaseModel

from ..shared.database import db_manager, AudioJobCreate, AudioJobResponse, AudioTool, ProcessingStatus
from ..shared.processing_queue import queue_manager, audio_processor
from ..auth.jwt_handler import get_current_user, UserResponse

router = APIRouter(prefix="/processing", tags=["audio processing"])

class BatchProcessingRequest(BaseModel):
    tool_type: AudioTool
    settings: dict
    priority: Optional[int] = 5

class ProgressResponse(BaseModel):
    job_id: str
    progress: float
    status: ProcessingStatus
    message: str
    current_step: str
    current_step_num: int
    total_steps: int
    estimated_time_remaining: Optional[float] = None
    updated_at: str

@router.post("/batch/upload", response_model=AudioJobResponse)
async def batch_upload_and_process(
    request: BatchProcessingRequest,
    files: List[UploadFile] = File(...),
    current_user: UserResponse = Depends(get_current_user)
):
    """Upload and process multiple audio files in batch"""
    
    if not files:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No files provided"
        )
    
    # Validate file types
    allowed_extensions = {'.mp3', '.wav', '.flac', '.m4a', '.aac', '.ogg', '.wma'}
    file_paths = []
    
    for file in files:
        if not any(file.filename.lower().endswith(ext) for ext in allowed_extensions):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Unsupported file type: {file.filename}"
            )
        
        # Save uploaded file (implement actual file saving logic)
        file_path = f"uploads/{current_user.id}/{file.filename}"
        file_paths.append(file_path)
        
        # Here you would save the actual file
        # with open(file_path, "wb") as f:
        #     f.write(await file.read())
    
    # Enqueue job for processing
    job = await queue_manager.enqueue_job(
        job_id="",  # Will be generated
        user_id=str(current_user.id),
        tool_type=request.tool_type,
        settings=request.settings,
        input_files=file_paths,
        priority=request.priority or 5
    )
    
    return job

@router.get("/jobs", response_model=List[AudioJobResponse])
async def get_user_jobs(
    limit: int = 50,
    current_user: UserResponse = Depends(get_current_user)
):
    """Get user's processing jobs history"""
    
    jobs = await db_manager.get_user_jobs(str(current_user.id), limit)
    return jobs

@router.get("/jobs/{job_id}", response_model=AudioJobResponse)
async def get_job_details(
    job_id: str,
    current_user: UserResponse = Depends(get_current_user)
):
    """Get specific job details"""
    
    # Here you would implement job detail retrieval
    # For now, return a placeholder
    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail="Job not found or access denied"
    )

@router.get("/jobs/{job_id}/progress", response_model=ProgressResponse)
async def get_job_progress(
    job_id: str,
    current_user: UserResponse = Depends(get_current_user)
):
    """Get real-time job progress"""
    
    progress = await audio_processor.get_progress_from_redis(job_id)
    if not progress:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Progress not found"
        )
    
    return ProgressResponse(
        job_id=progress.job_id,
        progress=progress.progress,
        status=progress.status,
        message=progress.message,
        current_step=progress.current_step,
        current_step_num=progress.current_step_num,
        total_steps=progress.total_steps,
        estimated_time_remaining=progress.estimated_time_remaining,
        updated_at=progress.current_step  # This should be updated_at timestamp
    )

@router.delete("/jobs/{job_id}")
async def cancel_job(
    job_id: str,
    current_user: UserResponse = Depends(get_current_user)
):
    """Cancel a queued or running job"""
    
    result = await queue_manager.cancel_job(job_id, str(current_user.id))
    return result

@router.get("/queue/status")
async def get_queue_status(current_user: UserResponse = Depends(get_current_user)):
    """Get current processing queue status"""
    
    status_info = await queue_manager.get_queue_status()
    return status_info

@router.websocket("/ws/{job_id}")
async def websocket_job_progress(websocket: WebSocket, job_id: str):
    """WebSocket endpoint for real-time job progress updates"""
    
    await websocket.accept()
    
    try:
        # Register WebSocket connection
        await audio_processor.register_websocket(job_id, websocket)
        
        # Send initial progress if available
        progress = await audio_processor.get_progress_from_redis(job_id)
        if progress:
            initial_message = {
                "type": "progress_update",
                "job_id": progress.job_id,
                "progress": progress.progress,
                "status": progress.status.value,
                "message": progress.message,
                "current_step": progress.current_step,
                "current_step_num": progress.current_step_num,
                "total_steps": progress.total_steps,
                "estimated_time_remaining": progress.estimated_time_remaining
            }
            await websocket.send_text(json.dumps(initial_message))
        
        # Keep connection alive
        while True:
            try:
                # Wait for ping from client
                data = await websocket.receive_text()
                if data == "ping":
                    await websocket.send_text("pong")
            except Exception:
                break
                
    except Exception as e:
        print(f"WebSocket error: {e}")
    finally:
        # Unregister WebSocket connection
        await audio_processor.unregister_websocket(job_id, websocket)