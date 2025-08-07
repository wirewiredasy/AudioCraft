from fastapi import FastAPI, File, UploadFile, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
import os
import sys
import uuid
from pathlib import Path

# Add services to Python path
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'services'))

# Import all service processors
from vocal_remover.processor import VocalRemoverProcessor
from pitch_tempo.processor import PitchTempoProcessor
from converter.processor import ConverterProcessor
from cutter_joiner.processor import CutterJoinerProcessor
from noise_reduction.processor import NoiseReductionProcessor
from volume_normalizer.processor import VolumeNormalizerProcessor
from fade_effect.processor import FadeEffectProcessor
from metadata_editor.processor import MetadataEditorProcessor
from audio_reverse.processor import AudioReverseProcessor
from equalizer.processor import EqualizerProcessor
from audio_splitter.processor import AudioSplitterProcessor

# Create FastAPI app
app = FastAPI(
    title="ODOREMOVER Audio Suite API",
    description="Professional audio processing microservices platform",
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

# Initialize processors
vocal_processor = VocalRemoverProcessor()
pitch_processor = PitchTempoProcessor()
converter_processor = ConverterProcessor()
cutter_processor = CutterJoinerProcessor()
noise_processor = NoiseReductionProcessor()
volume_processor = VolumeNormalizerProcessor()
fade_processor = FadeEffectProcessor()
metadata_processor = MetadataEditorProcessor()
reverse_processor = AudioReverseProcessor()
equalizer_processor = EqualizerProcessor()
splitter_processor = AudioSplitterProcessor()

@app.get("/")
async def root():
    return {
        "message": "ODOREMOVER Audio Suite API",
        "version": "2.0.0",
        "services": [
            "vocal-remover", "pitch-tempo", "converter", "cutter-joiner",
            "noise-reduction", "volume-normalizer", "fade-effect",
            "metadata-editor", "audio-reverse", "equalizer", "audio-splitter"
        ]
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy", "services": "all_operational"}

# Vocal Remover Service
@app.post("/vocal-remover")
async def vocal_remover(file: UploadFile = File(...)):
    """Remove vocals from audio using AI separation"""
    return await vocal_processor.process(file)

# Pitch & Tempo Service
@app.post("/pitch-tempo")
async def pitch_tempo(
    file: UploadFile = File(...),
    pitch_shift: float = Form(0.0),
    tempo_change: float = Form(1.0)
):
    """Adjust pitch and tempo independently"""
    return await pitch_processor.process(file, pitch_shift, tempo_change)

# Format Converter Service
@app.post("/converter")
async def converter(
    file: UploadFile = File(...),
    output_format: str = Form("mp3"),
    quality: str = Form("high")
):
    """Convert audio between different formats"""
    return await converter_processor.process(file, output_format, quality)

# Cutter & Joiner Service
@app.post("/cutter-joiner")
async def cutter_joiner(
    file: UploadFile = File(...),
    operation: str = Form("cut"),
    start_time: float = Form(0.0),
    end_time: float = Form(None)
):
    """Cut or join audio files"""
    return await cutter_processor.process(file, operation, start_time, end_time)

# Noise Reduction Service
@app.post("/noise-reduction")
async def noise_reduction(
    file: UploadFile = File(...),
    reduction_strength: float = Form(0.8),
    stationary: bool = Form(True)
):
    """Reduce background noise using advanced algorithms"""
    return await noise_processor.process(file, reduction_strength, stationary)

# Volume Normalizer Service
@app.post("/volume-normalizer")
async def volume_normalizer(
    file: UploadFile = File(...),
    target_level: float = Form(-6.0),
    normalize: bool = Form(True)
):
    """Normalize and boost audio volume"""
    return await volume_processor.process(file, target_level, normalize)

# Fade Effect Service
@app.post("/fade-effect")
async def fade_effect(
    file: UploadFile = File(...),
    fade_in_duration: float = Form(2.0),
    fade_out_duration: float = Form(2.0)
):
    """Add fade in/out effects to audio"""
    return await fade_processor.process(file, fade_in_duration, fade_out_duration)

# Metadata Editor Service
@app.post("/metadata-editor")
async def metadata_editor(
    file: UploadFile = File(...),
    title: str = Form(None),
    artist: str = Form(None),
    album: str = Form(None),
    year: str = Form(None)
):
    """Edit audio metadata and MP3 tags"""
    return await metadata_processor.process(file, title, artist, album, year)

# Audio Reverse Service
@app.post("/audio-reverse")
async def audio_reverse(file: UploadFile = File(...)):
    """Reverse audio playback completely"""
    return await reverse_processor.process(file)

# Equalizer Service
@app.post("/equalizer")
async def equalizer(
    file: UploadFile = File(...),
    low_gain: float = Form(0.0),
    mid_gain: float = Form(0.0),
    high_gain: float = Form(0.0)
):
    """Apply 3-band equalizer with frequency adjustment"""
    return await equalizer_processor.process(file, low_gain, mid_gain, high_gain)

# Audio Splitter Service
@app.post("/audio-splitter")
async def audio_splitter(
    file: UploadFile = File(...),
    split_type: str = Form("lr_channels"),
    output_format: str = Form("wav")
):
    """Advanced audio channel splitting with multiple methods"""
    return await splitter_processor.process(file, split_type, output_format)

if __name__ == "__main__":
    import uvicorn
    print("🚀 Starting ODOREMOVER Audio Suite API Gateway...")
    print("📡 Backend will be available at: http://0.0.0.0:8000")
    print("🎵 All audio processing microservices ready!")
    uvicorn.run(app, host="0.0.0.0", port=8000)