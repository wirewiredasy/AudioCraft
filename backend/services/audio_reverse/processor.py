import os
import uuid
import numpy as np
import librosa
import soundfile as sf
from fastapi import HTTPException

class AudioReverseProcessor:
    def __init__(self):
        self.upload_dir = "uploads"
        self.processed_dir = "processed"
        os.makedirs(self.upload_dir, exist_ok=True)
        os.makedirs(self.processed_dir, exist_ok=True)

    async def process(self, file):
        """Reverse audio playback completely"""
        try:
            # Save uploaded file
            upload_path = f"{self.upload_dir}/{uuid.uuid4()}_{file.filename}"
            with open(upload_path, "wb") as buffer:
                content = await file.read()
                buffer.write(content)

            # Load audio
            y, sr = librosa.load(upload_path, sr=None)
            
            # Reverse the audio array
            y_reversed = np.flip(y)
            
            # Save processed file
            output_filename = f"reversed_{uuid.uuid4()}.wav"
            output_path = f"{self.processed_dir}/{output_filename}"
            sf.write(output_path, y_reversed, sr)
            
            # Clean up
            os.remove(upload_path)
            
            return {
                "success": True,
                "message": "Audio reversed successfully",
                "output_file": f"/download/{output_filename}",
                "download_url": f"/download/{output_filename}",
                "processing_info": {
                    "operation": "complete_reverse",
                    "duration": len(y) / sr,
                    "sample_rate": int(sr),
                    "channels": 1 if y.ndim == 1 else y.shape[0]
                }
            }
            
        except Exception as e:
            # Clean up on error
            if 'upload_path' in locals():
                try:
                    os.remove(upload_path)
                except:
                    pass
            raise HTTPException(status_code=500, detail=f"Audio reversal failed: {str(e)}")