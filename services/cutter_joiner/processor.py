import os
import time
from typing import Dict, Any, Optional
from pydub import AudioSegment
from shared.config import PROCESSED_DIR
from shared.audio_utils import generate_unique_filename

async def process_cut_operation(
    input_path: str,
    file_id: str,
    start_time: float,
    end_time: Optional[float] = None
) -> Dict[str, Any]:
    """
    Cut audio segment from file
    """
    start_process_time = time.time()
    
    try:
        # Load audio file
        audio = AudioSegment.from_file(input_path)
        
        # Convert time to milliseconds
        start_ms = int(start_time * 1000)
        end_ms = int(end_time * 1000) if end_time else len(audio)
        
        # Validate time parameters
        if start_ms < 0:
            start_ms = 0
        if end_ms > len(audio):
            end_ms = len(audio)
        if start_ms >= end_ms:
            return {
                "success": False,
                "error": "Invalid time range: start_time must be less than end_time"
            }
        
        # Cut audio segment
        cut_audio = audio[start_ms:end_ms]
        
        # Generate output filename
        output_filename = generate_unique_filename("cut_audio.wav", file_id)
        output_path = os.path.join(PROCESSED_DIR, output_filename)
        
        # Export cut audio
        cut_audio.export(output_path, format="wav")
        
        processing_time = time.time() - start_process_time
        
        return {
            "success": True,
            "output_path": output_path,
            "processing_time": processing_time,
            "parameters": {
                "start_time": start_time,
                "end_time": end_time,
                "duration": len(cut_audio) / 1000.0,
                "original_duration": len(audio) / 1000.0
            }
        }
        
    except Exception as e:
        return {
            "success": False,
            "error": f"Audio cutting error: {str(e)}"
        }

async def process_join_operation(
    first_file_path: str,
    second_file_path: str,
    file_id: str
) -> Dict[str, Any]:
    """
    Join two audio files
    """
    start_time = time.time()
    
    try:
        # Load both audio files
        audio1 = AudioSegment.from_file(first_file_path)
        audio2 = AudioSegment.from_file(second_file_path)
        
        # Match sample rates if different
        if audio1.frame_rate != audio2.frame_rate:
            audio2 = audio2.set_frame_rate(audio1.frame_rate)
        
        # Match channels if different
        if audio1.channels != audio2.channels:
            if audio1.channels == 1:
                audio1 = audio1.set_channels(2)
            elif audio2.channels == 1:
                audio2 = audio2.set_channels(2)
        
        # Join audio files
        joined_audio = audio1 + audio2
        
        # Generate output filename
        output_filename = generate_unique_filename("joined_audio.wav", file_id)
        output_path = os.path.join(PROCESSED_DIR, output_filename)
        
        # Export joined audio
        joined_audio.export(output_path, format="wav")
        
        processing_time = time.time() - start_time
        
        return {
            "success": True,
            "output_path": output_path,
            "processing_time": processing_time,
            "parameters": {
                "first_file_duration": len(audio1) / 1000.0,
                "second_file_duration": len(audio2) / 1000.0,
                "joined_duration": len(joined_audio) / 1000.0,
                "sample_rate": audio1.frame_rate,
                "channels": audio1.channels
            }
        }
        
    except Exception as e:
        return {
            "success": False,
            "error": f"Audio joining error: {str(e)}"
        }
