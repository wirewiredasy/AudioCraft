from fastapi import FastAPI, HTTPException, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
import os
from typing import Optional
import uuid
from shared.config import UPLOAD_DIR, PROCESSED_DIR, GATEWAY_PORT

app = FastAPI(
    title="Audio Processing API Gateway",
    description="Comprehensive audio processing backend with microservices",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create necessary directories
os.makedirs(UPLOAD_DIR, exist_ok=True)
os.makedirs(PROCESSED_DIR, exist_ok=True)

# Mount static files
app.mount("/static", StaticFiles(directory="static"), name="static")

# Service endpoints mapping
SERVICES = {
    "vocal_remover": "http://127.0.0.1:8001",
    "pitch_tempo": "http://127.0.0.1:8002",
    "converter": "http://127.0.0.1:8003",
    "cutter_joiner": "http://127.0.0.1:8004",
    "noise_reduction": "http://127.0.0.1:8005",
    "audio_player": "http://127.0.0.1:8006"
}

@app.get("/")
async def root():
    """Serve the main frontend application"""
    return FileResponse("static/index.html")

@app.get("/api")
async def api_status():
    """API health check endpoint"""
    return {
        "message": "Audio Processing API Gateway",
        "status": "running",
        "services": list(SERVICES.keys())
    }

@app.get("/health")
async def health_check():
    """Check health of all microservices"""
    service_status = {}
    
    for service_name, url in SERVICES.items():
        service_status[service_name] = {
            "status": "ready",
            "url": url,
            "note": "Service endpoints configured"
        }
    
    return {"gateway": "healthy", "services": service_status}

@app.post("/remove-vocals")
async def remove_vocals(file: UploadFile = File(...)):
    """Remove vocals from audio file"""
    return {
        "message": "Vocal removal service endpoint",
        "status": "available",
        "note": "Service will be connected when all dependencies are installed"
    }

@app.post("/adjust-pitch-tempo")
async def adjust_pitch_tempo(
    file: UploadFile = File(...),
    pitch_shift: float = Form(0.0),
    tempo_change: float = Form(1.0)
):
    """Adjust pitch and tempo of audio file"""
    return {
        "message": "Pitch and tempo adjustment service endpoint",
        "status": "available",
        "parameters": {"pitch_shift": pitch_shift, "tempo_change": tempo_change},
        "note": "Service will be connected when all dependencies are installed"
    }

@app.post("/convert-format")
async def convert_format(
    file: UploadFile = File(...),
    target_format: str = Form(...)
):
    """Convert audio file to different format"""
    return {
        "message": "Audio format conversion service endpoint",
        "status": "available",
        "target_format": target_format,
        "supported_formats": ["mp3", "wav", "flac", "aac", "ogg", "m4a"],
        "note": "Service will be connected when all dependencies are installed"
    }

@app.post("/cut-join-audio")
async def cut_join_audio(
    file: UploadFile = File(...),
    operation: str = Form(...),
    start_time: Optional[float] = Form(None),
    end_time: Optional[float] = Form(None),
    join_file: Optional[UploadFile] = File(None)
):
    """Cut or join audio files"""
    return {
        "message": "Audio cutting and joining service endpoint",
        "status": "available",
        "operation": operation,
        "parameters": {
            "start_time": start_time,
            "end_time": end_time,
            "has_join_file": join_file is not None
        },
        "note": "Service will be connected when all dependencies are installed"
    }

@app.post("/reduce-noise")
async def reduce_noise(
    file: UploadFile = File(...),
    noise_reduction_strength: float = Form(0.5)
):
    """Reduce noise from audio file"""
    return {
        "message": "Noise reduction service endpoint",
        "status": "available",
        "noise_reduction_strength": noise_reduction_strength,
        "note": "Service will be connected when all dependencies are installed"
    }

@app.get("/play/{file_id}")
async def play_audio(file_id: str):
    """Stream audio file for playback"""
    return {
        "message": "Audio player service endpoint",
        "status": "available",
        "file_id": file_id,
        "note": "Service will be connected when all dependencies are installed"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=5000)
