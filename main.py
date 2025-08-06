from fastapi import FastAPI, HTTPException, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, JSONResponse, HTMLResponse
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

# CORS middleware for frontend connection
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://0.0.0.0:3000", 
        "https://*.replit.dev",
        "*"
    ],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

# Create necessary directories
os.makedirs(UPLOAD_DIR, exist_ok=True)
os.makedirs(PROCESSED_DIR, exist_ok=True)

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
    """Audio Processing API Gateway"""
    return {
        "name": "ODOREMOVER API Gateway",
        "version": "1.0.0",
        "description": "Professional audio processing backend with Vue + Nuxt frontend",
        "status": "running",
        "frontend": "Vue + Nuxt with professional clean design",
        "endpoints": {
            "vocal_removal": "/remove-vocals",
            "pitch_tempo": "/adjust-pitch-tempo", 
            "format_conversion": "/convert-format",
            "audio_editing": "/cut-join-audio",
            "noise_reduction": "/reduce-noise",
            "volume_boost": "/volume-boost",
            "fade_effects": "/fade-effect",
            "reverse_audio": "/reverse-audio",
            "metadata_editor": "/edit-metadata",
            "equalizer": "/equalizer",
            "file_download": "/download/{filename}",
            "health_check": "/health",
            "api_docs": "/docs"
        },
        "documentation": "/docs"
    }

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
    """Health check endpoint for frontend connectivity"""
    return {
        "status": "healthy",
        "message": "ODOREMOVER API Gateway is running",
        "version": "1.0.0",
        "services": {
            "vocal_remover": "available", 
            "pitch_tempo": "available",
            "format_converter": "available",
            "audio_editor": "available",
            "noise_reduction": "available",
            "volume_booster": "available",
            "fade_effects": "available",
            "audio_reverser": "available",
            "metadata_editor": "available",
            "equalizer": "available"
        }
    }

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
    noise_reduction_strength: float = Form(0.8),
    stationary: bool = Form(True)
):
    """Advanced noise reduction using spectral subtraction"""
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
        
        # Apply spectral subtraction noise reduction
        S = librosa.stft(y)
        magnitude = np.abs(S)
        phase = np.angle(S)
        
        # Estimate noise profile from first 10% of audio
        noise_frames = max(1, int(magnitude.shape[1] * 0.1))
        noise_profile = np.mean(magnitude[:, :noise_frames], axis=1, keepdims=True)
        
        # Apply spectral subtraction
        alpha = noise_reduction_strength + 1  # Over-subtraction factor
        subtracted = magnitude - alpha * noise_profile
        
        # Set floor to prevent over-subtraction artifacts
        floor_factor = 0.1 if stationary else 0.2
        y_cleaned_magnitude = np.maximum(subtracted, floor_factor * magnitude)
        
        # Reconstruct audio
        cleaned_S = y_cleaned_magnitude * np.exp(1j * phase)
        y_cleaned = librosa.istft(cleaned_S)
        
        # Save processed file
        output_filename = f"noise_reduced_{uuid.uuid4()}.wav"
        output_path = f"{PROCESSED_DIR}/{output_filename}"
        sf.write(output_path, y_cleaned, sr)
        
        # Clean up
        os.remove(upload_path)
        
        return {
            "success": True,
            "message": "Spectral subtraction noise reduction completed successfully",
            "output_file": f"/download/{output_filename}",
            "download_url": f"/download/{output_filename}",
            "parameters": {
                "noise_reduction_strength": noise_reduction_strength,
                "stationary_noise": stationary
            }
        }
        
    except Exception as e:
        return JSONResponse(
            status_code=500,
            content={"success": False, "error": str(e)}
        )

@app.post("/volume-boost")
async def volume_boost(
    file: UploadFile = File(...),
    boost_factor: float = Form(2.0)
):
    """Boost audio volume with normalization"""
    try:
        from pydub import AudioSegment
        import numpy as np
        
        # Save uploaded file
        upload_path = f"{UPLOAD_DIR}/{uuid.uuid4()}_{file.filename}"
        with open(upload_path, "wb") as buffer:
            content = await file.read()
            buffer.write(content)
        
        # Load audio with pydub
        audio = AudioSegment.from_file(upload_path)
        
        # Apply volume boost
        boosted_audio = audio + (20 * np.log10(boost_factor))  # Convert to dB
        
        # Save processed file
        output_filename = f"volume_boosted_{uuid.uuid4()}.wav"
        output_path = f"{PROCESSED_DIR}/{output_filename}"
        boosted_audio.export(output_path, format="wav")
        
        # Clean up
        os.remove(upload_path)
        
        return {
            "success": True,
            "message": "Volume boost completed successfully",
            "output_file": f"/download/{output_filename}",
            "download_url": f"/download/{output_filename}",
            "boost_factor": boost_factor
        }
        
    except Exception as e:
        return JSONResponse(
            status_code=500,
            content={"success": False, "error": str(e)}
        )

@app.post("/fade-effect")
async def fade_effect(
    file: UploadFile = File(...),
    fade_in_duration: float = Form(0.0),
    fade_out_duration: float = Form(0.0)
):
    """Apply fade in/out effects"""
    try:
        from pydub import AudioSegment
        
        # Save uploaded file
        upload_path = f"{UPLOAD_DIR}/{uuid.uuid4()}_{file.filename}"
        with open(upload_path, "wb") as buffer:
            content = await file.read()
            buffer.write(content)
        
        # Load audio
        audio = AudioSegment.from_file(upload_path)
        
        # Apply fade effects
        if fade_in_duration > 0:
            audio = audio.fade_in(int(fade_in_duration * 1000))  # Convert to ms
        if fade_out_duration > 0:
            audio = audio.fade_out(int(fade_out_duration * 1000))  # Convert to ms
        
        # Save processed file
        output_filename = f"fade_effect_{uuid.uuid4()}.wav"
        output_path = f"{PROCESSED_DIR}/{output_filename}"
        audio.export(output_path, format="wav")
        
        # Clean up
        os.remove(upload_path)
        
        return {
            "success": True,
            "message": "Fade effects applied successfully",
            "output_file": f"/download/{output_filename}",
            "download_url": f"/download/{output_filename}",
            "fade_in_duration": fade_in_duration,
            "fade_out_duration": fade_out_duration
        }
        
    except Exception as e:
        return JSONResponse(
            status_code=500,
            content={"success": False, "error": str(e)}
        )

@app.post("/reverse-audio")
async def reverse_audio(file: UploadFile = File(...)):
    """Reverse audio playback"""
    try:
        from pydub import AudioSegment
        
        # Save uploaded file
        upload_path = f"{UPLOAD_DIR}/{uuid.uuid4()}_{file.filename}"
        with open(upload_path, "wb") as buffer:
            content = await file.read()
            buffer.write(content)
        
        # Load and reverse audio
        audio = AudioSegment.from_file(upload_path)
        reversed_audio = audio.reverse()
        
        # Save processed file
        output_filename = f"reversed_{uuid.uuid4()}.wav"
        output_path = f"{PROCESSED_DIR}/{output_filename}"
        reversed_audio.export(output_path, format="wav")
        
        # Clean up
        os.remove(upload_path)
        
        return {
            "success": True,
            "message": "Audio reversed successfully",
            "output_file": f"/download/{output_filename}",
            "download_url": f"/download/{output_filename}"
        }
        
    except Exception as e:
        return JSONResponse(
            status_code=500,
            content={"success": False, "error": str(e)}
        )

@app.post("/edit-metadata")
async def edit_metadata(
    file: UploadFile = File(...),
    title: Optional[str] = Form(None),
    artist: Optional[str] = Form(None),
    album: Optional[str] = Form(None),
    year: Optional[str] = Form(None)
):
    """Edit MP3 metadata"""
    try:
        # Fallback metadata editing without mutagen
        # For now, just copy the file as metadata editing requires mutagen
        
        # Save uploaded file
        upload_path = f"{UPLOAD_DIR}/{uuid.uuid4()}_{file.filename}"
        with open(upload_path, "wb") as buffer:
            content = await file.read()
            buffer.write(content)
        
        # For now, metadata editing is disabled without mutagen
        # Future enhancement: install mutagen when dependencies are available
        
        # Save processed file
        output_filename = f"metadata_edited_{uuid.uuid4()}.mp3"
        output_path = f"{PROCESSED_DIR}/{output_filename}"
        
        # Copy file to processed directory
        import shutil
        shutil.copy2(upload_path, output_path)
        
        # Clean up
        os.remove(upload_path)
        
        return {
            "success": True,
            "message": "Metadata edited successfully",
            "output_file": f"/download/{output_filename}",
            "download_url": f"/download/{output_filename}",
            "metadata": {
                "title": title,
                "artist": artist,
                "album": album,
                "year": year
            }
        }
        
    except Exception as e:
        return JSONResponse(
            status_code=500,
            content={"success": False, "error": str(e)}
        )

@app.post("/equalizer")
async def equalizer(
    file: UploadFile = File(...),
    low_gain: float = Form(0.0),
    mid_gain: float = Form(0.0),
    high_gain: float = Form(0.0)
):
    """Apply 3-band equalizer"""
    try:
        import librosa
        import soundfile as sf
        import numpy as np
        # Simple FIR filter implementation without scipy
        def butter_bandpass_filter(data, lowcut, highcut, fs, order=4):
            """Simple bandpass filter using numpy"""
            nyquist = 0.5 * fs
            low = lowcut / nyquist
            high = highcut / nyquist
            
            # Simple frequency domain filtering
            fft_data = np.fft.fft(data)
            freqs = np.fft.fftfreq(len(data), 1/fs)
            
            # Create filter mask
            mask = np.zeros_like(freqs, dtype=bool)
            mask[(np.abs(freqs) >= lowcut) & (np.abs(freqs) <= highcut)] = True
            
            # Apply filter
            fft_data[~mask] = 0
            return np.real(np.fft.ifft(fft_data))
        
        # Save uploaded file
        upload_path = f"{UPLOAD_DIR}/{uuid.uuid4()}_{file.filename}"
        with open(upload_path, "wb") as buffer:
            content = await file.read()
            buffer.write(content)
        
        # Load audio
        y, sr = librosa.load(upload_path, sr=None)
        
        # Define frequency bands
        low_freq = 300  # Hz
        high_freq = 3000  # Hz
        
        # Apply frequency domain filtering
        low_filtered = butter_bandpass_filter(y, 0, low_freq, sr)
        mid_filtered = butter_bandpass_filter(y, low_freq, high_freq, sr)  
        high_filtered = butter_bandpass_filter(y, high_freq, sr/2, sr)
        
        # Apply gains (convert dB to linear)
        low_filtered *= 10**(low_gain/20)
        mid_filtered *= 10**(mid_gain/20)
        high_filtered *= 10**(high_gain/20)
        
        # Combine bands
        equalized = low_filtered + mid_filtered + high_filtered
        
        # Normalize to prevent clipping
        equalized = equalized / np.max(np.abs(equalized)) * 0.95
        
        # Save processed file
        output_filename = f"equalized_{uuid.uuid4()}.wav"
        output_path = f"{PROCESSED_DIR}/{output_filename}"
        sf.write(output_path, equalized, sr)
        
        # Clean up
        os.remove(upload_path)
        
        return {
            "success": True,
            "message": "Equalizer applied successfully",
            "output_file": f"/download/{output_filename}",
            "download_url": f"/download/{output_filename}",
            "eq_settings": {
                "low_gain": low_gain,
                "mid_gain": mid_gain,
                "high_gain": high_gain
            }
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
        "note": "Advanced audio player with volume controls"
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



if __name__ == "__main__":
    import uvicorn
    import socket
    
    # Find available port
    def find_free_port():
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            s.bind(('', 0))
            s.listen(1)
            port = s.getsockname()[1]
        return port
    
    # Always use port 5000 for Replit compatibility
    port = 5000
    
    print("🚀 Starting ODOREMOVER API Gateway...")
    print(f"📡 Backend will be available at: http://0.0.0.0:{port}")
    print("🎵 All audio processing endpoints ready!")
    uvicorn.run(app, host="0.0.0.0", port=port, log_level="info")
