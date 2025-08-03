from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.responses import JSONResponse
import os
import uuid
from .processor import process_vocal_removal
from shared.config import VOCAL_REMOVER_PORT, UPLOAD_DIR, PROCESSED_DIR
from shared.audio_utils import validate_audio_file, generate_unique_filename
from shared.storage import get_file_url

app = FastAPI(title="Vocal Remover Service")

# Create directories
os.makedirs(UPLOAD_DIR, exist_ok=True)
os.makedirs(PROCESSED_DIR, exist_ok=True)

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "vocal_remover"}

@app.post("/process")
async def remove_vocals(file: UploadFile = File(...)):
    """
    Remove vocals from audio file using Spleeter
    """
    try:
        # Validate file
        if not validate_audio_file(file):
            raise HTTPException(status_code=400, detail="Invalid audio file format")
        
        # Generate unique filenames
        file_id = str(uuid.uuid4())
        input_filename = generate_unique_filename(file.filename, "input")
        input_path = os.path.join(UPLOAD_DIR, input_filename)
        
        # Save uploaded file
        with open(input_path, "wb") as buffer:
            content = await file.read()
            buffer.write(content)
        
        # Process vocal removal
        result = await process_vocal_removal(input_path, file_id)
        
        # Clean up input file
        if os.path.exists(input_path):
            os.remove(input_path)
        
        if result["success"]:
            # Get URLs for output files
            vocals_url = get_file_url(result["vocals_path"]) if result["vocals_path"] else None
            instrumental_url = get_file_url(result["instrumental_path"]) if result["instrumental_path"] else None
            
            return {
                "success": True,
                "file_id": file_id,
                "message": "Vocal removal completed successfully",
                "results": {
                    "vocals": {
                        "url": vocals_url,
                        "filename": os.path.basename(result["vocals_path"]) if result["vocals_path"] else None
                    },
                    "instrumental": {
                        "url": instrumental_url,
                        "filename": os.path.basename(result["instrumental_path"]) if result["instrumental_path"] else None
                    }
                },
                "processing_time": result.get("processing_time", 0)
            }
        else:
            raise HTTPException(status_code=500, detail=result["error"])
            
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Vocal removal failed: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=VOCAL_REMOVER_PORT)
