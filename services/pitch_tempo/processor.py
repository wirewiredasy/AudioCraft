import os
import time
import asyncio
import librosa
import soundfile as sf
import numpy as np
from typing import Dict, Any
from shared.config import PROCESSED_DIR
from shared.audio_utils import generate_unique_filename

async def process_pitch_tempo_adjustment(
    input_path: str, 
    file_id: str, 
    pitch_shift: float, 
    tempo_change: float
) -> Dict[str, Any]:
    """
    Process pitch and tempo adjustment using Librosa
    """
    start_time = time.time()
    
    try:
        # Load audio file
        y, sr = librosa.load(input_path, sr=None)
        
        # Apply tempo change first
        if tempo_change != 1.0:
            y = librosa.effects.time_stretch(y, rate=tempo_change)
        
        # Apply pitch shift
        if pitch_shift != 0.0:
            y = librosa.effects.pitch_shift(y, sr=sr, n_steps=pitch_shift)
        
        # Normalize audio to prevent clipping
        if np.max(np.abs(y)) > 0:
            y = y / np.max(np.abs(y)) * 0.95
        
        # Generate output filename
        output_filename = generate_unique_filename("adjusted_audio.wav", file_id)
        output_path = os.path.join(PROCESSED_DIR, output_filename)
        
        # Save processed audio
        sf.write(output_path, y, sr)
        
        processing_time = time.time() - start_time
        
        return {
            "success": True,
            "output_path": output_path,
            "processing_time": processing_time,
            "parameters": {
                "pitch_shift": pitch_shift,
                "tempo_change": tempo_change,
                "sample_rate": sr,
                "duration": len(y) / sr
            }
        }
        
    except Exception as e:
        return {
            "success": False,
            "error": f"Pitch/tempo adjustment error: {str(e)}"
        }
