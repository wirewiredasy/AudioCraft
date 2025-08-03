from fastapi import FastAPI, UploadFile, File, Form, HTTPException
import os
import uuid
from .processor import process_pitch_tempo_adjustment
from shared.config import PITCH_TEMPO_PORT, UPLOAD_DIR, PROCESSED_DIR
from shared.audio_utils import validate_audio_file, generate_unique_filename
from shared.storage import get_file_url

app = FastAPI(title="Pitch and Tempo Adjustment Service")

os.makedirs(UPLOAD_DIR, exist_ok=True)
os.makedirs(PROCESSED_DIR, exist_ok=True)

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "pitch_tempo"}

@app.post("/process")
async def adjust_pitch_tempo(
    file: UploadFile = File(...),
    pitch_shift: float = Form(0.0),
    tempo_change: float = Form(1.0)
):
    """
    Adjust pitch and tempo of audio file using Librosa
    """
    try:
        if not validate_audio_file(file):
            raise HTTPException(status_code=400, detail="Invalid audio file format")
        
        # Validate parameters
        if not (-12.0 <= pitch_shift <= 12.0):
            raise HTTPException(status_code=400, detail="Pitch shift must be between -12 and 12 semitones")
        
        if not (0.5 <= tempo_change <= 2.0):
            raise HTTPException(status_code=400, detail="Tempo change must be between 0.5 and 2.0")
        
        file_id = str(uuid.uuid4())
        input_filename = generate_unique_filename(file.filename, "input")
        input_path = os.path.join(UPLOAD_DIR, input_filename)
        
        with open(input_path, "wb") as buffer:
            content = await file.read()
            buffer.write(content)
        
        result = await process_pitch_tempo_adjustment(input_path, file_id, pitch_shift, tempo_change)
        
        if os.path.exists(input_path):
            os.remove(input_path)
        
        if result["success"]:
            output_url = get_file_url(result["output_path"])
            
            return {
                "success": True,
                "file_id": file_id,
                "message": "Pitch and tempo adjustment completed successfully",
                "result": {
                    "url": output_url,
                    "filename": os.path.basename(result["output_path"])
                },
                "parameters": {
                    "pitch_shift": pitch_shift,
                    "tempo_change": tempo_change
                },
                "processing_time": result.get("processing_time", 0)
            }
        else:
            raise HTTPException(status_code=500, detail=result["error"])
            
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Pitch/tempo adjustment failed: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=PITCH_TEMPO_PORT)
