import os
import uuid
import numpy as np
import librosa
import soundfile as sf
from fastapi import HTTPException

class VolumeNormalizerProcessor:
    def __init__(self):
        self.upload_dir = "uploads"
        self.processed_dir = "processed"
        os.makedirs(self.upload_dir, exist_ok=True)
        os.makedirs(self.processed_dir, exist_ok=True)

    async def process(self, file, target_level=-6.0, normalize=True):
        """Normalize and boost audio volume professionally"""
        try:
            # Save uploaded file
            upload_path = f"{self.upload_dir}/{uuid.uuid4()}_{file.filename}"
            with open(upload_path, "wb") as buffer:
                content = await file.read()
                buffer.write(content)

            # Load audio
            y, sr = librosa.load(upload_path, sr=None)
            
            if normalize:
                # RMS-based normalization
                rms = np.sqrt(np.mean(y**2))
                if rms > 0:
                    # Target RMS level (convert dB to linear)
                    target_rms = 10**(target_level/20)
                    gain = target_rms / rms
                    y_normalized = y * gain
                else:
                    y_normalized = y
            else:
                # Simple amplitude boost
                boost_factor = 10**(target_level/20)
                y_normalized = y * boost_factor
            
            # Apply soft limiter to prevent clipping
            y_normalized = np.tanh(y_normalized * 0.95) * 0.95
            
            # Final safety normalization
            if np.max(np.abs(y_normalized)) > 0.95:
                y_normalized = y_normalized / np.max(np.abs(y_normalized)) * 0.95
            
            # Save processed file
            output_filename = f"volume_normalized_{uuid.uuid4()}.wav"
            output_path = f"{self.processed_dir}/{output_filename}"
            sf.write(output_path, y_normalized, sr)
            
            # Calculate statistics
            original_peak = np.max(np.abs(y))
            normalized_peak = np.max(np.abs(y_normalized))
            gain_applied = 20 * np.log10(normalized_peak / original_peak) if original_peak > 0 else 0
            
            # Clean up
            os.remove(upload_path)
            
            return {
                "success": True,
                "message": "Audio volume normalized successfully",
                "output_file": f"/download/{output_filename}",
                "download_url": f"/download/{output_filename}",
                "processing_stats": {
                    "target_level_db": target_level,
                    "gain_applied_db": round(gain_applied, 2),
                    "original_peak": round(original_peak, 4),
                    "normalized_peak": round(normalized_peak, 4),
                    "normalization_method": "RMS" if normalize else "Simple Boost"
                }
            }
            
        except Exception as e:
            # Clean up on error
            if 'upload_path' in locals():
                try:
                    os.remove(upload_path)
                except:
                    pass
            raise HTTPException(status_code=500, detail=f"Volume normalization failed: {str(e)}")