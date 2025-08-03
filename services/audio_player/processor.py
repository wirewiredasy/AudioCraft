import os
import mimetypes
from typing import Dict, Any, Optional
from fastapi.responses import StreamingResponse
from shared.audio_utils import get_audio_info

async def get_audio_file_info(file_path: str) -> Dict[str, Any]:
    """
    Get comprehensive audio file information
    """
    try:
        # Get basic file stats
        file_stats = os.stat(file_path)
        
        # Get audio metadata
        audio_info = get_audio_info(file_path)
        
        # Get MIME type
        content_type, _ = mimetypes.guess_type(file_path)
        
        return {
            "filename": os.path.basename(file_path),
            "file_size": file_stats.st_size,
            "file_size_mb": round(file_stats.st_size / (1024 * 1024), 2),
            "created_time": file_stats.st_ctime,
            "modified_time": file_stats.st_mtime,
            "content_type": content_type or "audio/wav",
            "audio_info": audio_info
        }
        
    except Exception as e:
        return {
            "error": f"Failed to get file info: {str(e)}",
            "filename": os.path.basename(file_path) if file_path else "unknown"
        }

async def stream_audio_file(
    file_path: str, 
    start: Optional[int] = None, 
    end: Optional[int] = None
) -> StreamingResponse:
    """
    Stream audio file with range support for efficient playback
    """
    file_size = os.path.getsize(file_path)
    
    # Set default range
    start = start or 0
    end = end or file_size - 1
    
    # Ensure valid range
    start = max(0, start)
    end = min(file_size - 1, end)
    
    # Calculate content length
    content_length = end - start + 1
    
    # Determine content type
    content_type, _ = mimetypes.guess_type(file_path)
    if not content_type:
        content_type = "audio/wav"
    
    # Create streaming generator
    def generate_chunks():
        with open(file_path, "rb") as f:
            f.seek(start)
            remaining = content_length
            chunk_size = 8192  # 8KB chunks
            
            while remaining:
                chunk_read_size = min(chunk_size, remaining)
                chunk = f.read(chunk_read_size)
                if not chunk:
                    break
                remaining -= len(chunk)
                yield chunk
    
    headers = {
        "Content-Length": str(content_length),
        "Accept-Ranges": "bytes",
        "Content-Range": f"bytes {start}-{end}/{file_size}",
        "Cache-Control": "no-cache"
    }
    
    status_code = 206 if start > 0 or end < file_size - 1 else 200
    
    return StreamingResponse(
        generate_chunks(),
        status_code=status_code,
        headers=headers,
        media_type=content_type
    )
