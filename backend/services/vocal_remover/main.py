from fastapi import FastAPI, File, UploadFile
from .processor import VocalRemoverProcessor

app = FastAPI(title="Vocal Remover Service")
processor = VocalRemoverProcessor()

@app.get("/health")
async def health():
    return {"status": "healthy", "service": "vocal_remover"}

@app.post("/process")
async def process_vocal_removal(file: UploadFile = File(...)):
    """Remove vocals from audio using AI separation"""
    return await processor.process(file)