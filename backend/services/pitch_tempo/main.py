from fastapi import FastAPI, File, UploadFile, Form
from .processor import PitchTempoProcessor

app = FastAPI(title="Pitch & Tempo Service")
processor = PitchTempoProcessor()

@app.get("/health")
async def health():
    return {"status": "healthy", "service": "pitch_tempo"}

@app.post("/process")
async def process_pitch_tempo(
    file: UploadFile = File(...),
    pitch_shift: float = Form(0.0),
    tempo_change: float = Form(1.0)
):
    """Adjust pitch and tempo independently"""
    return await processor.process(file, pitch_shift, tempo_change)