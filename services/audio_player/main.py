from fastapi import FastAPI, HTTPException, Query
from fastapi.responses import FileResponse, StreamingResponse
import os
import mimetypes
from typing import Optional
from .processor import get_audio_file_info, stream_audio_file
from shared.config import AUDIO_PLAYER_PORT, PROCESSED_DIR
from shared.storage import get_file_url

app = FastAPI(title="Audio Player Service")

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "audio_player"}

@app.get("/play/{file_id}")
async def play_audio(file_id: str):
    """
    Get audio file information and streaming URL
    """
    try:
        # Find the file in processed directory
        file_path = None
        for filename in os.listdir(PROCESSED_DIR):
            if file_id in filename:
                file_path = os.path.join(PROCESSED_DIR, filename)
                break
        
        if not file_path or not os.path.exists(file_path):
            raise HTTPException(status_code=404, detail="Audio file not found")
        
        # Get file information
        file_info = await get_audio_file_info(file_path)
        
        # Get streaming URL
        streaming_url = get_file_url(file_path)
        
        return {
            "success": True,
            "file_id": file_id,
            "streaming_url": streaming_url,
            "download_url": f"/download/{file_id}",
            "file_info": file_info
        }
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to prepare audio for playback: {str(e)}")

@app.get("/download/{file_id}")
async def download_audio(file_id: str):
    """
    Download audio file
    """
    try:
        # Find the file in processed directory
        file_path = None
        for filename in os.listdir(PROCESSED_DIR):
            if file_id in filename:
                file_path = os.path.join(PROCESSED_DIR, filename)
                break
        
        if not file_path or not os.path.exists(file_path):
            raise HTTPException(status_code=404, detail="Audio file not found")
        
        # Determine content type
        content_type, _ = mimetypes.guess_type(file_path)
        if not content_type:
            content_type = "audio/wav"
        
        return FileResponse(
            path=file_path,
            media_type=content_type,
            filename=os.path.basename(file_path)
        )
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to download audio file: {str(e)}")

@app.get("/stream/{file_id}")
async def stream_audio(
    file_id: str,
    start: Optional[int] = Query(None, description="Start byte position"),
    end: Optional[int] = Query(None, description="End byte position")
):
    """
    Stream audio file with range support
    """
    try:
        # Find the file in processed directory
        file_path = None
        for filename in os.listdir(PROCESSED_DIR):
            if file_id in filename:
                file_path = os.path.join(PROCESSED_DIR, filename)
                break
        
        if not file_path or not os.path.exists(file_path):
            raise HTTPException(status_code=404, detail="Audio file not found")
        
        return await stream_audio_file(file_path, start, end)
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to stream audio file: {str(e)}")

@app.get("/list")
async def list_audio_files():
    """
    List all available audio files
    """
    try:
        files = []
        for filename in os.listdir(PROCESSED_DIR):
            file_path = os.path.join(PROCESSED_DIR, filename)
            if os.path.isfile(file_path):
                file_info = await get_audio_file_info(file_path)
                files.append({
                    "filename": filename,
                    "file_id": filename.split('_')[0] if '_' in filename else filename,
                    "file_info": file_info
                })
        
        return {
            "success": True,
            "files": files,
            "total_files": len(files)
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to list audio files: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=AUDIO_PLAYER_PORT)
