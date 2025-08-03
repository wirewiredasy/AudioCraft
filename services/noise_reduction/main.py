from fastapi import FastAPI, UploadFile, File, Form, HTTPException
import os
import uuid
from .processor import process_noise_reduction
from shared.config import NOISE_REDUCTION_PORT, UPLOAD_DIR, PROCESSED_DIR
from shared.audio_utils import validate_audio_file, generate_unique_filename
from shared.storage import get_file_url

app = FastAPI(title="Noise Reduction Service")

os.makedirs(UPLOAD_DIR, exist_ok=True)
os.makedirs(PROCESSED_DIR, exist_ok=True)

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "noise_reduction"}

@app.post("/process")
async def reduce_noise(
    file: UploadFile = File(...),
    noise_reduction_strength: float = Form(0.5),
    stationary: bool = Form(True)
):
    """
    Reduce noise from audio file using noisereduce library
    """
    try:
        if not validate_audio_file(file):
            raise HTTPException(status_code=400, detail="Invalid audio file format")
        
        # Validate noise reduction strength
        if not (0.0 <= noise_reduction_strength <= 1.0):
            raise HTTPException(
                status_code=400, 
                detail="Noise reduction strength must be between 0.0 and 1.0"
            )
        
        file_id = str(uuid.uuid4())
        input_filename = generate_unique_filename(file.filename, "input")
        input_path = os.path.join(UPLOAD_DIR, input_filename)
        
        with open(input_path, "wb") as buffer:
            content = await file.read()
            buffer.write(content)
        
        result = await process_noise_reduction(
            input_path, file_id, noise_reduction_strength, stationary
        )
        
        if os.path.exists(input_path):
            os.remove(input_path)
        
        if result["success"]:
            output_url = get_file_url(result["output_path"])
            
            return {
                "success": True,
                "file_id": file_id,
                "message": "Noise reduction completed successfully",
                "result": {
                    "url": output_url,
                    "filename": os.path.basename(result["output_path"])
                },
                "parameters": {
                    "noise_reduction_strength": noise_reduction_strength,
                    "stationary": stationary
                },
                "processing_time": result.get("processing_time", 0),
                "noise_analysis": result.get("noise_analysis", {})
            }
        else:
            raise HTTPException(status_code=500, detail=result["error"])
            
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Noise reduction failed: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=NOISE_REDUCTION_PORT)
