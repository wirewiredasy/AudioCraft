import os
import uuid
import numpy as np
import librosa
import soundfile as sf
from fastapi import HTTPException

class AudioSplitterProcessor:
    def __init__(self):
        self.upload_dir = "uploads"
        self.processed_dir = "processed"
        os.makedirs(self.upload_dir, exist_ok=True)
        os.makedirs(self.processed_dir, exist_ok=True)

    async def process(self, file, split_type="lr_channels", output_format="wav"):
        """Advanced audio channel splitting with multiple methods"""
        try:
            # Save uploaded file
            upload_path = f"{self.upload_dir}/{uuid.uuid4()}_{file.filename}"
            with open(upload_path, "wb") as buffer:
                content = await file.read()
                buffer.write(content)

            # Load audio file
            y, sr = librosa.load(upload_path, sr=None, mono=False)
            
            output_files = []
            processing_info = {
                "original_channels": 1 if y.ndim == 1 else y.shape[0],
                "sample_rate": int(sr),
                "split_type": split_type
            }

            if split_type == "lr_channels":
                # Left/Right channel separation
                if y.ndim == 1:
                    # Mono file - duplicate to stereo
                    left_channel = y
                    right_channel = y
                    processing_info["note"] = "Mono file duplicated to both channels"
                else:
                    left_channel = y[0]
                    right_channel = y[1] if y.shape[0] > 1 else y[0]
                
                # Save left channel
                left_filename = f"left_channel_{uuid.uuid4()}.{output_format}"
                left_path = f"{self.processed_dir}/{left_filename}"
                sf.write(left_path, left_channel, sr)
                output_files.append(f"/download/{left_filename}")
                
                # Save right channel
                right_filename = f"right_channel_{uuid.uuid4()}.{output_format}"
                right_path = f"{self.processed_dir}/{right_filename}"
                sf.write(right_path, right_channel, sr)
                output_files.append(f"/download/{right_filename}")

            elif split_type == "mid_side":
                # Mid/Side processing for stereo enhancement
                if y.ndim == 1:
                    # Convert mono to stereo first
                    y = np.array([y, y])
                
                if y.shape[0] >= 2:
                    # Mid (center) = (L + R) / 2
                    mid = (y[0] + y[1]) / 2
                    # Side (stereo info) = (L - R) / 2  
                    side = (y[0] - y[1]) / 2
                else:
                    mid = y[0]
                    side = np.zeros_like(y[0])
                
                # Save mid channel
                mid_filename = f"mid_channel_{uuid.uuid4()}.{output_format}"
                mid_path = f"{self.processed_dir}/{mid_filename}"
                sf.write(mid_path, mid, sr)
                output_files.append(f"/download/{mid_filename}")
                
                # Save side channel
                side_filename = f"side_channel_{uuid.uuid4()}.{output_format}"
                side_path = f"{self.processed_dir}/{side_filename}"
                sf.write(side_path, side, sr)
                output_files.append(f"/download/{side_filename}")

            elif split_type == "frequency_bands":
                # Split into frequency bands
                if y.ndim > 1:
                    y = np.mean(y, axis=0)  # Convert to mono for frequency splitting
                
                # Define frequency bands
                low_cutoff = 250   # Hz
                mid_cutoff = 2000  # Hz
                
                # Apply bandpass filters
                y_low = self._bandpass_filter(y, 0, low_cutoff, sr)
                y_mid = self._bandpass_filter(y, low_cutoff, mid_cutoff, sr)
                y_high = self._bandpass_filter(y, mid_cutoff, sr//2, sr)
                
                # Save frequency bands
                for band, audio, name in [
                    ("low", y_low, f"low_freq_{uuid.uuid4()}.{output_format}"),
                    ("mid", y_mid, f"mid_freq_{uuid.uuid4()}.{output_format}"),
                    ("high", y_high, f"high_freq_{uuid.uuid4()}.{output_format}")
                ]:
                    band_path = f"{self.processed_dir}/{name}"
                    sf.write(band_path, audio, sr)
                    output_files.append(f"/download/{name}")
                
                processing_info["frequency_bands"] = {
                    "low": f"0-{low_cutoff}Hz",
                    "mid": f"{low_cutoff}-{mid_cutoff}Hz", 
                    "high": f"{mid_cutoff}Hz+"
                }

            elif split_type == "vocal_instrumental":
                # Simple vocal/instrumental separation
                if y.ndim == 1:
                    y = np.array([y, y])
                
                if y.shape[0] >= 2:
                    # Instrumental (center channel removal)
                    instrumental = y[0] - y[1]
                    # Vocal approximation (center content)
                    vocal = (y[0] + y[1]) / 2 - instrumental * 0.5
                else:
                    instrumental = y[0]
                    vocal = y[0] * 0.3  # Weak approximation
                
                # Save vocals
                vocal_filename = f"vocals_{uuid.uuid4()}.{output_format}"
                vocal_path = f"{self.processed_dir}/{vocal_filename}"
                sf.write(vocal_path, vocal, sr)
                output_files.append(f"/download/{vocal_filename}")
                
                # Save instrumental
                instrumental_filename = f"instrumental_{uuid.uuid4()}.{output_format}"
                instrumental_path = f"{self.processed_dir}/{instrumental_filename}"
                sf.write(instrumental_path, instrumental, sr)
                output_files.append(f"/download/{instrumental_filename}")

            # Clean up
            os.remove(upload_path)
            
            return {
                "success": True,
                "message": f"Audio split using {split_type} method successfully",
                "output_files": output_files,
                "download_urls": output_files,
                "processing_info": processing_info,
                "split_count": len(output_files)
            }
            
        except Exception as e:
            # Clean up on error
            if 'upload_path' in locals():
                try:
                    os.remove(upload_path)
                except:
                    pass
            raise HTTPException(status_code=500, detail=f"Audio splitting failed: {str(e)}")

    def _bandpass_filter(self, data, lowcut, highcut, fs):
        """Simple frequency domain bandpass filter"""
        # FFT-based filtering
        fft_data = np.fft.fft(data)
        freqs = np.fft.fftfreq(len(data), 1/fs)
        
        # Create filter mask
        mask = np.zeros_like(freqs, dtype=bool)
        mask[(np.abs(freqs) >= lowcut) & (np.abs(freqs) <= highcut)] = True
        
        # Apply filter
        fft_data[~mask] = 0
        return np.real(np.fft.ifft(fft_data))