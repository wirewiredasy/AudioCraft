import os
import uuid
import numpy as np
import librosa
import soundfile as sf
from fastapi import HTTPException

class EqualizerProcessor:
    def __init__(self):
        self.upload_dir = "uploads"
        self.processed_dir = "processed"
        os.makedirs(self.upload_dir, exist_ok=True)
        os.makedirs(self.processed_dir, exist_ok=True)

    def butter_bandpass_filter(self, data, lowcut, highcut, fs, order=4):
        """Simple bandpass filter using numpy FFT"""
        # Simple frequency domain filtering
        fft_data = np.fft.fft(data)
        freqs = np.fft.fftfreq(len(data), 1/fs)
        
        # Create filter mask
        mask = np.zeros_like(freqs, dtype=bool)
        mask[(np.abs(freqs) >= lowcut) & (np.abs(freqs) <= highcut)] = True
        
        # Apply filter
        fft_data[~mask] = 0
        return np.real(np.fft.ifft(fft_data))

    async def process(self, file, low_gain=0.0, mid_gain=0.0, high_gain=0.0):
        """Apply 3-band equalizer with frequency adjustment"""
        try:
            # Save uploaded file
            upload_path = f"{self.upload_dir}/{uuid.uuid4()}_{file.filename}"
            with open(upload_path, "wb") as buffer:
                content = await file.read()
                buffer.write(content)

            # Load audio
            y, sr = librosa.load(upload_path, sr=None)
            
            # Define frequency bands
            low_freq = 300  # Hz
            high_freq = 3000  # Hz
            
            # Apply frequency domain filtering
            low_filtered = self.butter_bandpass_filter(y, 0, low_freq, sr)
            mid_filtered = self.butter_bandpass_filter(y, low_freq, high_freq, sr)  
            high_filtered = self.butter_bandpass_filter(y, high_freq, sr/2, sr)
            
            # Apply gains (convert dB to linear)
            low_filtered *= 10**(low_gain/20)
            mid_filtered *= 10**(mid_gain/20)
            high_filtered *= 10**(high_gain/20)
            
            # Combine all bands
            y_equalized = low_filtered + mid_filtered + high_filtered
            
            # Normalize to prevent clipping
            y_equalized = librosa.util.normalize(y_equalized)
            
            # Save processed file
            output_filename = f"equalized_{uuid.uuid4()}.wav"
            output_path = f"{self.processed_dir}/{output_filename}"
            sf.write(output_path, y_equalized, sr)
            
            # Clean up
            os.remove(upload_path)
            
            return {
                "success": True,
                "message": "3-band equalizer applied successfully",
                "output_file": f"/download/{output_filename}",
                "download_url": f"/download/{output_filename}",
                "eq_settings": {
                    "low_gain_db": low_gain,
                    "mid_gain_db": mid_gain,
                    "high_gain_db": high_gain,
                    "frequency_bands": {
                        "low": f"0-{low_freq}Hz",
                        "mid": f"{low_freq}-{high_freq}Hz",
                        "high": f"{high_freq}Hz+"
                    }
                }
            }
            
        except Exception as e:
            # Clean up on error
            if 'upload_path' in locals():
                try:
                    os.remove(upload_path)
                except:
                    pass
            raise HTTPException(status_code=500, detail=f"Equalizer processing failed: {str(e)}")