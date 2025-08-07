"""
Common audio processing utilities for ODOREMOVER Audio Suite
"""
import os
import uuid
import numpy as np
import librosa
import soundfile as sf
from pathlib import Path

class AudioUtils:
    """Shared audio processing utilities"""
    
    @staticmethod
    def create_directories():
        """Create necessary directories for audio processing"""
        dirs = ["uploads", "processed", "temp"]
        for dir_name in dirs:
            os.makedirs(dir_name, exist_ok=True)
    
    @staticmethod
    def save_uploaded_file(file, prefix="audio"):
        """Save uploaded file and return path"""
        upload_path = f"uploads/{prefix}_{uuid.uuid4()}_{file.filename}"
        with open(upload_path, "wb") as buffer:
            content = file.read()
            buffer.write(content)
        return upload_path
    
    @staticmethod
    async def save_uploaded_file_async(file, prefix="audio"):
        """Async version of save_uploaded_file"""
        upload_path = f"uploads/{prefix}_{uuid.uuid4()}_{file.filename}"
        with open(upload_path, "wb") as buffer:
            content = await file.read()
            buffer.write(content)
        return upload_path
    
    @staticmethod
    def cleanup_file(file_path):
        """Safely remove file"""
        try:
            if os.path.exists(file_path):
                os.remove(file_path)
        except Exception:
            pass
    
    @staticmethod
    def normalize_audio(audio_data, target_level=-3.0):
        """Normalize audio to target dB level"""
        if np.max(np.abs(audio_data)) == 0:
            return audio_data
        
        # Convert target level from dB to linear
        target_linear = 10**(target_level/20)
        
        # Calculate current peak
        current_peak = np.max(np.abs(audio_data))
        
        # Calculate gain needed
        gain = target_linear / current_peak
        
        # Apply gain
        normalized = audio_data * gain
        
        # Soft limit to prevent clipping
        normalized = np.tanh(normalized * 0.95) * 0.95
        
        return normalized
    
    @staticmethod
    def get_audio_info(file_path):
        """Get basic audio file information"""
        try:
            y, sr = librosa.load(file_path, sr=None)
            duration = len(y) / sr
            
            return {
                "duration": duration,
                "sample_rate": int(sr),
                "channels": 1 if y.ndim == 1 else y.shape[0],
                "samples": len(y)
            }
        except Exception as e:
            return {"error": str(e)}
    
    @staticmethod
    def apply_fade(audio_data, fade_in_samples=0, fade_out_samples=0):
        """Apply fade in/out to audio data"""
        result = audio_data.copy()
        
        if fade_in_samples > 0:
            fade_in = np.linspace(0, 1, fade_in_samples)
            result[:fade_in_samples] *= fade_in
        
        if fade_out_samples > 0:
            fade_out = np.linspace(1, 0, fade_out_samples)
            result[-fade_out_samples:] *= fade_out
        
        return result