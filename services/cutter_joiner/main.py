from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from typing import Optional
import os
import uuid
from .processor import process_cut_operation, process_join_operation
from shared.config import CUTTER_JOINER_PORT, UPLOAD_DIR, PROCESSED_DIR
from shared.audio_utils import validate_audio_file, generate_unique_filename
from shared.storage import get_file_url

app = FastAPI(title="Audio Cutter and Joiner Service")

os.makedirs(UPLOAD_DIR, exist_ok=True)
os.makedirs(PROCESSED_DIR, exist_ok=True)

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "cutter_joiner"}

@app.post("/process")
async def cut_join_audio(
    file: UploadFile = File(...),
    operation: str = Form(...),
    start_time: Optional[float] = Form(None),
    end_time: Optional[float] = Form(None),
    join_file: Optional[UploadFile] = File(None)
):
    """
    Cut or join audio files
    """
    try:
        if not validate_audio_file(file):
            raise HTTPException(status_code=400, detail="Invalid audio file format")
        
        if operation not in ["cut", "join"]:
            raise HTTPException(status_code=400, detail="Operation must be 'cut' or 'join'")
        
        file_id = str(uuid.uuid4())
        input_filename = generate_unique_filename(file.filename, "input")
        input_path = os.path.join(UPLOAD_DIR, input_filename)
        
        with open(input_path, "wb") as buffer:
            content = await file.read()
            buffer.write(content)
        
        if operation == "cut":
            if start_time is None:
                raise HTTPException(status_code=400, detail="start_time is required for cut operation")
            
            result = await process_cut_operation(input_path, file_id, start_time, end_time)
            
        elif operation == "join":
            if not join_file:
                raise HTTPException(status_code=400, detail="join_file is required for join operation")
            
            if not validate_audio_file(join_file):
                raise HTTPException(status_code=400, detail="Invalid second audio file format")
            
            # Save second file
            join_filename = generate_unique_filename(join_file.filename, "join")
            join_path = os.path.join(UPLOAD_DIR, join_filename)
            
            with open(join_path, "wb") as buffer:
                join_content = await join_file.read()
                buffer.write(join_content)
            
            result = await process_join_operation(input_path, join_path, file_id)
            
            # Clean up second file
            if os.path.exists(join_path):
                os.remove(join_path)
        
        # Clean up input file
        if os.path.exists(input_path):
            os.remove(input_path)
        
        if result["success"]:
            output_url = get_file_url(result["output_path"])
            
            return {
                "success": True,
                "file_id": file_id,
                "message": f"Audio {operation} completed successfully",
                "result": {
                    "url": output_url,
                    "filename": os.path.basename(result["output_path"])
                },
                "operation": operation,
                "parameters": result.get("parameters", {}),
                "processing_time": result.get("processing_time", 0)
            }
        else:
            raise HTTPException(status_code=500, detail=result["error"])
            
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Audio {operation} operation failed: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=CUTTER_JOINER_PORT)
