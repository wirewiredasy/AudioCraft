import os
import uuid
import numpy as np
import librosa
import soundfile as sf
from fastapi import HTTPException

class NoiseReductionProcessor:
    def __init__(self):
        self.upload_dir = "uploads"
        self.processed_dir = "processed"
        os.makedirs(self.upload_dir, exist_ok=True)
        os.makedirs(self.processed_dir, exist_ok=True)

    async def process(self, file, reduction_strength=0.8, stationary=True):
        """Advanced noise reduction using spectral subtraction"""
        try:
            # Save uploaded file
            upload_path = f"{self.upload_dir}/{uuid.uuid4()}_{file.filename}"
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
            alpha = reduction_strength + 1  # Over-subtraction factor
            subtracted = magnitude - alpha * noise_profile
            
            # Set floor to prevent over-subtraction artifacts
            floor_factor = 0.1 if stationary else 0.2
            y_cleaned_magnitude = np.maximum(subtracted, floor_factor * magnitude)
            
            # Reconstruct audio
            cleaned_S = y_cleaned_magnitude * np.exp(1j * phase)
            y_cleaned = librosa.istft(cleaned_S)
            
            # Normalize
            y_cleaned = librosa.util.normalize(y_cleaned)
            
            # Save processed file
            output_filename = f"noise_reduced_{uuid.uuid4()}.wav"
            output_path = f"{self.processed_dir}/{output_filename}"
            sf.write(output_path, y_cleaned, sr)
            
            # Clean up
            os.remove(upload_path)
            
            return {
                "success": True,
                "message": "Spectral subtraction noise reduction completed successfully",
                "output_file": f"/download/{output_filename}",
                "download_url": f"/download/{output_filename}",
                "parameters": {
                    "reduction_strength": reduction_strength,
                    "stationary_noise": stationary,
                    "noise_floor": f"{floor_factor*100}%"
                }
            }
            
        except Exception as e:
            # Clean up on error
            if 'upload_path' in locals():
                try:
                    os.remove(upload_path)
                except:
                    pass
            raise HTTPException(status_code=500, detail=f"Noise reduction failed: {str(e)}")