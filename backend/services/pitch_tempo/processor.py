import os
import uuid
import numpy as np
import librosa
import soundfile as sf
from fastapi import HTTPException

class PitchTempoProcessor:
    def __init__(self):
        self.upload_dir = "uploads"
        self.processed_dir = "processed"
        os.makedirs(self.upload_dir, exist_ok=True)
        os.makedirs(self.processed_dir, exist_ok=True)

    async def process(self, file, pitch_shift=0.0, tempo_change=1.0):
        """Adjust pitch and tempo independently using librosa"""
        try:
            # Save uploaded file
            upload_path = f"{self.upload_dir}/{uuid.uuid4()}_{file.filename}"
            with open(upload_path, "wb") as buffer:
                content = await file.read()
                buffer.write(content)

            # Load audio
            y, sr = librosa.load(upload_path, sr=None)
            
            # Apply tempo change first (if needed)
            if tempo_change != 1.0:
                # Time-stretch without changing pitch
                y = librosa.effects.time_stretch(y, rate=tempo_change)
            
            # Apply pitch shift (if needed)
            if pitch_shift != 0.0:
                # Pitch shift without changing tempo
                y = librosa.effects.pitch_shift(y, sr=sr, n_steps=pitch_shift)
            
            # Normalize to prevent clipping
            y = librosa.util.normalize(y)
            
            # Save processed file
            output_filename = f"pitch_tempo_{uuid.uuid4()}.wav"
            output_path = f"{self.processed_dir}/{output_filename}"
            sf.write(output_path, y, sr)
            
            # Clean up
            os.remove(upload_path)
            
            return {
                "success": True,
                "message": "Pitch and tempo adjusted successfully",
                "output_file": f"/download/{output_filename}",
                "download_url": f"/download/{output_filename}",
                "parameters": {
                    "pitch_shift_semitones": pitch_shift,
                    "tempo_multiplier": tempo_change,
                    "sample_rate": int(sr),
                    "duration": len(y) / sr
                }
            }
            
        except Exception as e:
            # Clean up on error
            if 'upload_path' in locals():
                try:
                    os.remove(upload_path)
                except:
                    pass
            raise HTTPException(status_code=500, detail=f"Pitch/tempo adjustment failed: {str(e)}")