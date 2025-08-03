import ffmpeg
import os
from typing import Optional, Dict, Any

def get_audio_metadata(file_path: str) -> Dict[str, Any]:
    """
    Get comprehensive audio metadata using ffmpeg
    """
    try:
        probe = ffmpeg.probe(file_path)
        audio_stream = next((stream for stream in probe['streams'] if stream['codec_type'] == 'audio'), None)
        
        if not audio_stream:
            return {}
        
        metadata = {
            'duration': float(probe.get('format', {}).get('duration', 0)),
            'bit_rate': int(probe.get('format', {}).get('bit_rate', 0)),
            'codec': audio_stream.get('codec_name', ''),
            'sample_rate': int(audio_stream.get('sample_rate', 0)),
            'channels': int(audio_stream.get('channels', 0)),
            'channel_layout': audio_stream.get('channel_layout', ''),
            'format': probe.get('format', {}).get('format_name', '')
        }
        
        return metadata
        
    except Exception as e:
        print(f"Failed to get metadata: {str(e)}")
        return {}

def convert_with_ffmpeg(input_path: str, output_path: str, **kwargs) -> bool:
    """
    Convert audio file using ffmpeg with custom parameters
    """
    try:
        stream = ffmpeg.input(input_path)
        stream = ffmpeg.output(stream, output_path, **kwargs)
        ffmpeg.run(stream, overwrite_output=True, quiet=True)
        return True
        
    except Exception as e:
        print(f"FFmpeg conversion failed: {str(e)}")
        return False

def extract_audio_segment(input_path: str, output_path: str, start_time: float, duration: float) -> bool:
    """
    Extract audio segment using ffmpeg
    """
    try:
        stream = ffmpeg.input(input_path, ss=start_time, t=duration)
        stream = ffmpeg.output(stream, output_path)
        ffmpeg.run(stream, overwrite_output=True, quiet=True)
        return True
        
    except Exception as e:
        print(f"FFmpeg segment extraction failed: {str(e)}")
        return False

def concatenate_audio_files(file_list: list, output_path: str) -> bool:
    """
    Concatenate multiple audio files using ffmpeg
    """
    try:
        inputs = [ffmpeg.input(file_path) for file_path in file_list]
        joined = ffmpeg.concat(*inputs, v=0, a=1)
        output = ffmpeg.output(joined, output_path)
        ffmpeg.run(output, overwrite_output=True, quiet=True)
        return True
        
    except Exception as e:
        print(f"FFmpeg concatenation failed: {str(e)}")
        return False

def apply_audio_filter(input_path: str, output_path: str, filter_string: str) -> bool:
    """
    Apply audio filter using ffmpeg
    """
    try:
        stream = ffmpeg.input(input_path)
        stream = ffmpeg.filter(stream, 'af', filter_string)
        stream = ffmpeg.output(stream, output_path)
        ffmpeg.run(stream, overwrite_output=True, quiet=True)
        return True
        
    except Exception as e:
        print(f"FFmpeg filter application failed: {str(e)}")
        return False

def normalize_volume(input_path: str, output_path: str, target_lufs: float = -23.0) -> bool:
    """
    Normalize audio volume using ffmpeg loudnorm filter
    """
    try:
        filter_string = f"loudnorm=I={target_lufs}:TP=-1.5:LRA=11"
        return apply_audio_filter(input_path, output_path, filter_string)
        
    except Exception as e:
        print(f"Volume normalization failed: {str(e)}")
        return False
