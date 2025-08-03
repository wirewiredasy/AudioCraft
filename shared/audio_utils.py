import os
import time
from typing import Optional
from fastapi import UploadFile
from pydub import AudioSegment
from mutagen import File as MutagenFile
from .config import ALLOWED_AUDIO_FORMATS, ALLOWED_EXTENSIONS, MAX_FILE_SIZE, UPLOAD_DIR, PROCESSED_DIR

def validate_audio_file(file: UploadFile) -> bool:
    """
    Validate uploaded audio file
    """
    # Check file size
    if hasattr(file, 'size') and file.size > MAX_FILE_SIZE:
        return False
    
    # Check content type
    if file.content_type not in ALLOWED_AUDIO_FORMATS:
        return False
    
    # Check file extension
    if file.filename:
        ext = os.path.splitext(file.filename)[1].lower()
        if ext not in ALLOWED_EXTENSIONS:
            return False
    
    return True

def load_audio(file_path: str) -> Optional[AudioSegment]:
    """
    Load audio file using pydub
    """
    try:
        audio = AudioSegment.from_file(file_path)
        return audio
    except Exception as e:
        print(f"Failed to load audio: {str(e)}")
        return None

def save_audio(audio: AudioSegment, output_path: str, format: str = "wav") -> bool:
    """
    Save audio file using pydub
    """
    try:
        audio.export(output_path, format=format)
        return True
    except Exception as e:
        print(f"Failed to save audio: {str(e)}")
        return False

def get_audio_info(file_path: str) -> dict:
    """
    Get audio file information
    """
    info = {
        "duration": 0,
        "sample_rate": 0,
        "channels": 0,
        "format": "",
        "bitrate": 0
    }
    
    try:
        # Get basic info using pydub
        audio = AudioSegment.from_file(file_path)
        info["duration"] = len(audio) / 1000.0  # Convert to seconds
        info["sample_rate"] = audio.frame_rate
        info["channels"] = audio.channels
        
        # Get detailed info using mutagen
        mutagen_file = MutagenFile(file_path)
        if mutagen_file:
            if hasattr(mutagen_file.info, 'bitrate'):
                info["bitrate"] = mutagen_file.info.bitrate
                
        # Determine format from file extension
        ext = os.path.splitext(file_path)[1].lower()
        info["format"] = ext.replace(".", "")
        
    except Exception as e:
        print(f"Failed to get audio info: {str(e)}")
    
    return info

def convert_audio_format(input_path: str, output_path: str, target_format: str) -> bool:
    """
    Convert audio file to different format
    """
    try:
        audio = AudioSegment.from_file(input_path)
        audio.export(output_path, format=target_format)
        return True
    except Exception as e:
        print(f"Failed to convert audio format: {str(e)}")
        return False

def normalize_audio(audio: AudioSegment, target_dBFS: float = -20.0) -> AudioSegment:
    """
    Normalize audio to target dBFS
    """
    try:
        change_in_dBFS = target_dBFS - audio.dBFS
        return audio.apply_gain(change_in_dBFS)
    except:
        return audio

def cleanup_old_files(max_age_hours: int = 24):
    """
    Clean up old files from upload and processed directories
    """
    current_time = time.time()
    max_age_seconds = max_age_hours * 3600
    
    directories = [UPLOAD_DIR, PROCESSED_DIR]
    
    for directory in directories:
        if not os.path.exists(directory):
            continue
            
        for filename in os.listdir(directory):
            file_path = os.path.join(directory, filename)
            
            if os.path.isfile(file_path):
                file_age = current_time - os.path.getctime(file_path)
                
                if file_age > max_age_seconds:
                    try:
                        os.remove(file_path)
                        print(f"Cleaned up old file: {file_path}")
                    except Exception as e:
                        print(f"Failed to cleanup file {file_path}: {str(e)}")

def generate_unique_filename(original_filename: str, suffix: str = "") -> str:
    """
    Generate unique filename with timestamp
    """
    timestamp = str(int(time.time()))
    name, ext = os.path.splitext(original_filename)
    
    if suffix:
        return f"{name}_{suffix}_{timestamp}{ext}"
    else:
        return f"{name}_{timestamp}{ext}"
