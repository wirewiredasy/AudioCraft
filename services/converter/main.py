from fastapi import FastAPI, UploadFile, File, Form, HTTPException
import os
import uuid
from .processor import process_format_conversion
from shared.config import CONVERTER_PORT, UPLOAD_DIR, PROCESSED_DIR
from shared.audio_utils import validate_audio_file, generate_unique_filename
from shared.storage import get_file_url

app = FastAPI(title="Audio Format Converter Service")

os.makedirs(UPLOAD_DIR, exist_ok=True)
os.makedirs(PROCESSED_DIR, exist_ok=True)

SUPPORTED_FORMATS = ["mp3", "wav", "flac", "aac", "ogg", "m4a"]

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "converter"}

@app.get("/formats")
async def get_supported_formats():
    return {"supported_formats": SUPPORTED_FORMATS}

@app.post("/process")
async def convert_format(
    file: UploadFile = File(...),
    target_format: str = Form(...),
    quality: str = Form("high"),
    bitrate: int = Form(None)
):
    """
    Convert audio file to different format
    """
    try:
        if not validate_audio_file(file):
            raise HTTPException(status_code=400, detail="Invalid audio file format")
        
        if target_format.lower() not in SUPPORTED_FORMATS:
            raise HTTPException(
                status_code=400, 
                detail=f"Unsupported format. Supported formats: {', '.join(SUPPORTED_FORMATS)}"
            )
        
        file_id = str(uuid.uuid4())
        input_filename = generate_unique_filename(file.filename, "input")
        input_path = os.path.join(UPLOAD_DIR, input_filename)
        
        with open(input_path, "wb") as buffer:
            content = await file.read()
            buffer.write(content)
        
        result = await process_format_conversion(
            input_path, file_id, target_format, quality, bitrate
        )
        
        if os.path.exists(input_path):
            os.remove(input_path)
        
        if result["success"]:
            output_url = get_file_url(result["output_path"])
            
            return {
                "success": True,
                "file_id": file_id,
                "message": f"Format conversion to {target_format} completed successfully",
                "result": {
                    "url": output_url,
                    "filename": os.path.basename(result["output_path"]),
                    "format": target_format,
                    "quality": quality
                },
                "processing_time": result.get("processing_time", 0),
                "metadata": result.get("metadata", {})
            }
        else:
            raise HTTPException(status_code=500, detail=result["error"])
            
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Format conversion failed: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=CONVERTER_PORT)
