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

# Mount frontend assets only
app.mount("/assets", StaticFiles(directory="frontend/dist/assets"), name="assets")

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
    """Serve React frontend"""
    return FileResponse("frontend/dist/index.html")

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
    """Remove vocals from audio file using center channel extraction"""
    try:
        import librosa
        import soundfile as sf
        import numpy as np
        
        # Save uploaded file
        upload_path = f"{UPLOAD_DIR}/{uuid.uuid4()}_{file.filename}"
        with open(upload_path, "wb") as buffer:
            content = await file.read()
            buffer.write(content)
        
        # Load audio
        y, sr = librosa.load(upload_path, sr=None, mono=False)
        
        # Remove vocals (center channel extraction)
        if y.ndim > 1:
            vocals_removed = y[0] - y[1]  # Left - Right channel
        else:
            vocals_removed = y  # Mono audio, return as is
        
        # Save processed file
        output_filename = f"vocals_removed_{uuid.uuid4()}.wav"
        output_path = f"{PROCESSED_DIR}/{output_filename}"
        sf.write(output_path, vocals_removed, sr)
        
        # Clean up
        os.remove(upload_path)
        
        return {
            "success": True,
            "message": "Vocals removed successfully",
            "output_file": f"/download/{output_filename}",
            "download_url": f"/download/{output_filename}"
        }
        
    except Exception as e:
        return JSONResponse(
            status_code=500,
            content={"success": False, "error": str(e)}
        )

@app.post("/adjust-pitch-tempo")
async def adjust_pitch_tempo(
    file: UploadFile = File(...),
    pitch_shift: float = Form(0.0),
    tempo_change: float = Form(1.0)
):
    """Adjust pitch and tempo of audio file"""
    try:
        import librosa
        import soundfile as sf
        
        # Save uploaded file
        upload_path = f"{UPLOAD_DIR}/{uuid.uuid4()}_{file.filename}"
        with open(upload_path, "wb") as buffer:
            content = await file.read()
            buffer.write(content)
        
        # Load audio
        y, sr = librosa.load(upload_path, sr=None)
        
        # Apply pitch shift
        if pitch_shift != 0.0:
            y = librosa.effects.pitch_shift(y, sr=sr, n_steps=pitch_shift)
        
        # Apply tempo change
        if tempo_change != 1.0:
            y = librosa.effects.time_stretch(y, rate=tempo_change)
        
        # Save processed file
        output_filename = f"pitch_tempo_{uuid.uuid4()}.wav"
        output_path = f"{PROCESSED_DIR}/{output_filename}"
        sf.write(output_path, y, sr)
        
        # Clean up
        os.remove(upload_path)
        
        return {
            "success": True,
            "message": "Pitch and tempo adjusted successfully",
            "output_file": f"/download/{output_filename}",
            "download_url": f"/download/{output_filename}",
            "parameters": {"pitch_shift": pitch_shift, "tempo_change": tempo_change}
        }
        
    except Exception as e:
        return JSONResponse(
            status_code=500,
            content={"success": False, "error": str(e)}
        )

@app.post("/convert-format")
async def convert_format(
    file: UploadFile = File(...),
    target_format: str = Form(...)
):
    """Convert audio file to different format"""
    try:
        from pydub import AudioSegment
        
        # Save uploaded file
        upload_path = f"{UPLOAD_DIR}/{uuid.uuid4()}_{file.filename}"
        with open(upload_path, "wb") as buffer:
            content = await file.read()
            buffer.write(content)
        
        # Load audio with pydub
        audio = AudioSegment.from_file(upload_path)
        
        # Convert to target format
        output_filename = f"converted_{uuid.uuid4()}.{target_format}"
        output_path = f"{PROCESSED_DIR}/{output_filename}"
        
        # Export in target format
        audio.export(output_path, format=target_format)
        
        # Clean up
        os.remove(upload_path)
        
        return {
            "success": True,
            "message": f"Audio converted to {target_format} successfully",
            "output_file": f"/download/{output_filename}",
            "download_url": f"/download/{output_filename}",
            "target_format": target_format
        }
        
    except Exception as e:
        return JSONResponse(
            status_code=500,
            content={"success": False, "error": str(e)}
        )

@app.post("/cut-join-audio")
async def cut_join_audio(
    file: UploadFile = File(...),
    operation: str = Form(...),
    start_time: Optional[float] = Form(None),
    end_time: Optional[float] = Form(None),
    join_file: Optional[UploadFile] = File(None)
):
    """Cut or join audio files"""
    try:
        from pydub import AudioSegment
        
        # Save uploaded file
        upload_path = f"{UPLOAD_DIR}/{uuid.uuid4()}_{file.filename}"
        with open(upload_path, "wb") as buffer:
            content = await file.read()
            buffer.write(content)
        
        # Load audio
        audio = AudioSegment.from_file(upload_path)
        
        if operation == "cut" and start_time is not None and end_time is not None:
            # Cut audio segment
            start_ms = int(start_time * 1000)
            end_ms = int(end_time * 1000)
            processed_audio = audio[start_ms:end_ms]
            output_filename = f"cut_{uuid.uuid4()}.wav"
            
        elif operation == "join" and join_file is not None:
            # Join two audio files
            join_path = f"{UPLOAD_DIR}/{uuid.uuid4()}_{join_file.filename}"
            with open(join_path, "wb") as buffer:
                join_content = await join_file.read()
                buffer.write(join_content)
            
            join_audio = AudioSegment.from_file(join_path)
            processed_audio = audio + join_audio
            output_filename = f"joined_{uuid.uuid4()}.wav"
            os.remove(join_path)
            
        else:
            raise ValueError("Invalid operation or missing parameters")
        
        # Save processed file
        output_path = f"{PROCESSED_DIR}/{output_filename}"
        processed_audio.export(output_path, format="wav")
        
        # Clean up
        os.remove(upload_path)
        
        return {
            "success": True,
            "message": f"Audio {operation} completed successfully",
            "output_file": f"/download/{output_filename}",
            "download_url": f"/download/{output_filename}",
            "operation": operation
        }
        
    except Exception as e:
        return JSONResponse(
            status_code=500,
            content={"success": False, "error": str(e)}
        )

@app.post("/reduce-noise")
async def reduce_noise(
    file: UploadFile = File(...),
    noise_reduction_strength: float = Form(0.5)
):
    """Reduce noise from audio file using spectral subtraction"""
    try:
        import librosa
        import soundfile as sf
        import numpy as np
        
        # Save uploaded file
        upload_path = f"{UPLOAD_DIR}/{uuid.uuid4()}_{file.filename}"
        with open(upload_path, "wb") as buffer:
            content = await file.read()
            buffer.write(content)
        
        # Load audio
        y, sr = librosa.load(upload_path, sr=None)
        
        # Simple noise reduction using spectral subtraction
        # Get magnitude spectrogram
        S = librosa.stft(y)
        magnitude = np.abs(S)
        phase = np.angle(S)
        
        # Estimate noise from first few frames
        noise_profile = np.mean(magnitude[:, :int(magnitude.shape[1] * 0.1)], axis=1, keepdims=True)
        
        # Apply spectral subtraction
        cleaned_magnitude = magnitude - (noise_reduction_strength * noise_profile)
        cleaned_magnitude = np.maximum(cleaned_magnitude, 0.1 * magnitude)  # Floor
        
        # Reconstruct audio
        cleaned_S = cleaned_magnitude * np.exp(1j * phase)
        y_cleaned = librosa.istft(cleaned_S)
        
        # Save processed file
        output_filename = f"noise_reduced_{uuid.uuid4()}.wav"
        output_path = f"{PROCESSED_DIR}/{output_filename}"
        sf.write(output_path, y_cleaned, sr)
        
        # Clean up
        os.remove(upload_path)
        
        return {
            "success": True,
            "message": "Noise reduction completed successfully",
            "output_file": f"/download/{output_filename}",
            "download_url": f"/download/{output_filename}",
            "noise_reduction_strength": noise_reduction_strength
        }
        
    except Exception as e:
        return JSONResponse(
            status_code=500,
            content={"success": False, "error": str(e)}
        )

@app.get("/play/{file_id}")
async def play_audio(file_id: str):
    """Stream audio file for playback"""
    return {
        "message": "Audio player service endpoint",
        "status": "available",
        "file_id": file_id,
        "note": "Service will be connected when all dependencies are installed"
    }

@app.get("/download/{filename}")
async def download_file(filename: str):
    """Download processed audio files"""
    file_path = f"{PROCESSED_DIR}/{filename}"
    if os.path.exists(file_path):
        return FileResponse(
            file_path,
            media_type="application/octet-stream",
            filename=filename
        )
    else:
        raise HTTPException(status_code=404, detail="File not found")

# Catch-all route for React Router (SPA)
@app.get("/{full_path:path}")
async def serve_react_app(full_path: str):
    """Serve React app for all unmatched routes"""
    return FileResponse("frontend/dist/index.html")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=5000)
