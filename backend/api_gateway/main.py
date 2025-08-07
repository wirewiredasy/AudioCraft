from fastapi import FastAPI, File, UploadFile, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
import os
import sys
import uuid
from pathlib import Path

# Add backend root to Python path
backend_root = os.path.join(os.path.dirname(__file__), '..')
sys.path.insert(0, backend_root)

# Create FastAPI app
app = FastAPI(
    title="ODOREMOVER Audio Suite API",
    description="Professional audio processing microservices platform with advanced features",
    version="2.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create directories
UPLOAD_DIR = "uploads"
PROCESSED_DIR = "processed"
os.makedirs(UPLOAD_DIR, exist_ok=True)
os.makedirs(PROCESSED_DIR, exist_ok=True)

# Mount static files
app.mount("/download", StaticFiles(directory=PROCESSED_DIR), name="downloads")

# Initialize processors with fallbacks
vocal_processor = None
pitch_processor = None
converter_processor = None

# Try to import processors
try:
    from services.vocal_remover.processor import VocalRemoverProcessor
    vocal_processor = VocalRemoverProcessor()
    print("✓ Vocal remover processor loaded")
except Exception as e:
    print(f"✗ Vocal remover processor failed: {e}")

try:
    from services.pitch_tempo.processor import PitchTempoProcessor
    pitch_processor = PitchTempoProcessor()
    print("✓ Pitch tempo processor loaded")
except Exception as e:
    print(f"✗ Pitch tempo processor failed: {e}")

try:
    from services.converter.processor import ConverterProcessor
    converter_processor = ConverterProcessor()
    print("✓ Converter processor loaded")
except Exception as e:
    print(f"✗ Converter processor failed: {e}")

@app.get("/")
async def root():
    return {
        "message": "ODOREMOVER Audio Suite API",
        "version": "2.0.0",
        "status": "active",
        "available_tools": {
            "vocal_remover": vocal_processor is not None,
            "pitch_tempo": pitch_processor is not None,
            "converter": converter_processor is not None,
        }
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy", "message": "API is running"}

@app.post("/vocal-remover")
async def remove_vocals(file: UploadFile = File(...)):
    """Remove vocals from audio file"""
    if not vocal_processor:
        raise HTTPException(status_code=503, detail="Vocal remover service unavailable")
    
    try:
        result = await vocal_processor.process(file)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Processing failed: {str(e)}")

@app.post("/pitch-tempo")
async def adjust_pitch_tempo(
    file: UploadFile = File(...),
    pitch_shift: float = Form(0),
    tempo_change: float = Form(0)
):
    """Adjust pitch and tempo of audio file"""
    if not pitch_processor:
        raise HTTPException(status_code=503, detail="Pitch tempo service unavailable")
    
    try:
        # Note: This is a simplified version, actual processor may need different parameters
        result = await pitch_processor.process(file, pitch_shift, tempo_change)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Processing failed: {str(e)}")

@app.post("/convert")
async def convert_audio(
    file: UploadFile = File(...),
    output_format: str = Form("mp3")
):
    """Convert audio file to different format"""
    if not converter_processor:
        raise HTTPException(status_code=503, detail="Converter service unavailable")
    
    try:
        result = await converter_processor.process(file, output_format)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Processing failed: {str(e)}")

@app.post("/upload-test")
async def test_upload(file: UploadFile = File(...)):
    """Test file upload functionality"""
    try:
        # Save uploaded file
        upload_path = f"{UPLOAD_DIR}/{uuid.uuid4()}_{file.filename}"
        with open(upload_path, "wb") as buffer:
            content = await file.read()
            buffer.write(content)
        
        return {
            "message": "File uploaded successfully",
            "filename": file.filename,
            "size": len(content),
            "content_type": file.content_type,
            "saved_as": upload_path
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Upload failed: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)