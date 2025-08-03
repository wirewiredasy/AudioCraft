import os
import time
import librosa
import soundfile as sf
import noisereduce as nr
import numpy as np
from typing import Dict, Any
from shared.config import PROCESSED_DIR
from shared.audio_utils import generate_unique_filename

async def process_noise_reduction(
    input_path: str,
    file_id: str,
    noise_reduction_strength: float,
    stationary: bool = True
) -> Dict[str, Any]:
    """
    Process noise reduction using noisereduce library
    """
    start_time = time.time()
    
    try:
        # Load audio file
        y, sr = librosa.load(input_path, sr=None)
        
        # Calculate noise statistics
        noise_stats = {
            "original_rms": float(np.sqrt(np.mean(y**2))),
            "original_max": float(np.max(np.abs(y))),
            "original_min": float(np.min(y)),
            "sample_rate": sr,
            "duration": len(y) / sr
        }
        
        # Apply noise reduction
        if stationary:
            # For stationary noise (constant background noise)
            reduced_noise = nr.reduce_noise(
                y=y, 
                sr=sr, 
                stationary=True,
                prop_decrease=noise_reduction_strength
            )
        else:
            # For non-stationary noise (varying noise)
            reduced_noise = nr.reduce_noise(
                y=y, 
                sr=sr, 
                stationary=False,
                prop_decrease=noise_reduction_strength
            )
        
        # Normalize the result to prevent clipping
        if np.max(np.abs(reduced_noise)) > 0:
            reduced_noise = reduced_noise / np.max(np.abs(reduced_noise)) * 0.95
        
        # Calculate post-processing statistics
        noise_stats.update({
            "processed_rms": float(np.sqrt(np.mean(reduced_noise**2))),
            "processed_max": float(np.max(np.abs(reduced_noise))),
            "processed_min": float(np.min(reduced_noise)),
            "noise_reduction_ratio": float(noise_stats["original_rms"] / np.sqrt(np.mean(reduced_noise**2)))
        })
        
        # Generate output filename
        output_filename = generate_unique_filename("noise_reduced.wav", file_id)
        output_path = os.path.join(PROCESSED_DIR, output_filename)
        
        # Save processed audio
        sf.write(output_path, reduced_noise, sr)
        
        processing_time = time.time() - start_time
        
        return {
            "success": True,
            "output_path": output_path,
            "processing_time": processing_time,
            "noise_analysis": noise_stats,
            "parameters": {
                "noise_reduction_strength": noise_reduction_strength,
                "stationary": stationary,
                "sample_rate": sr
            }
        }
        
    except Exception as e:
        return {
            "success": False,
            "error": f"Noise reduction error: {str(e)}"
        }
