import os
import uuid
import numpy as np
from pydub import AudioSegment
from fastapi import HTTPException

class FadeEffectProcessor:
    def __init__(self):
        self.upload_dir = "uploads"
        self.processed_dir = "processed"
        os.makedirs(self.upload_dir, exist_ok=True)
        os.makedirs(self.processed_dir, exist_ok=True)

    async def process(self, file, fade_in_duration=2.0, fade_out_duration=2.0):
        """Add professional fade in/out effects to audio"""
        try:
            # Save uploaded file
            upload_path = f"{self.upload_dir}/{uuid.uuid4()}_{file.filename}"
            with open(upload_path, "wb") as buffer:
                content = await file.read()
                buffer.write(content)

            # Load audio
            audio = AudioSegment.from_file(upload_path)
            
            # Convert durations to milliseconds
            fade_in_ms = int(fade_in_duration * 1000)
            fade_out_ms = int(fade_out_duration * 1000)
            
            # Apply fade effects
            if fade_in_duration > 0:
                audio = audio.fade_in(min(fade_in_ms, len(audio) // 2))
            
            if fade_out_duration > 0:
                audio = audio.fade_out(min(fade_out_ms, len(audio) // 2))
            
            # Save processed file
            output_filename = f"fade_effect_{uuid.uuid4()}.wav"
            output_path = f"{self.processed_dir}/{output_filename}"
            audio.export(output_path, format="wav")
            
            # Clean up
            os.remove(upload_path)
            
            return {
                "success": True,
                "message": "Fade effects applied successfully",
                "output_file": f"/download/{output_filename}",
                "download_url": f"/download/{output_filename}",
                "fade_settings": {
                    "fade_in_duration": fade_in_duration,
                    "fade_out_duration": fade_out_duration,
                    "total_duration": len(audio) / 1000,
                    "fade_type": "linear"
                }
            }
            
        except Exception as e:
            # Clean up on error
            if 'upload_path' in locals():
                try:
                    os.remove(upload_path)
                except:
                    pass
            raise HTTPException(status_code=500, detail=f"Fade effect processing failed: {str(e)}")