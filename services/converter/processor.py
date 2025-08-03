import os
import time
from typing import Dict, Any, Optional
from pydub import AudioSegment
from shared.config import PROCESSED_DIR
from shared.audio_utils import generate_unique_filename, get_audio_info

async def process_format_conversion(
    input_path: str,
    file_id: str,
    target_format: str,
    quality: str = "high",
    bitrate: Optional[int] = None
) -> Dict[str, Any]:
    """
    Process audio format conversion using pydub
    """
    start_time = time.time()
    
    try:
        # Load audio file
        audio = AudioSegment.from_file(input_path)
        
        # Set quality parameters
        export_params = {}
        
        if target_format.lower() == "mp3":
            if not bitrate:
                bitrate = {"low": 128, "medium": 192, "high": 320}[quality]
            export_params["bitrate"] = f"{bitrate}k"
            export_params["parameters"] = ["-q:a", "0"]
            
        elif target_format.lower() == "aac":
            if not bitrate:
                bitrate = {"low": 128, "medium": 192, "high": 256}[quality]
            export_params["bitrate"] = f"{bitrate}k"
            export_params["codec"] = "aac"
            
        elif target_format.lower() == "ogg":
            if not bitrate:
                bitrate = {"low": 128, "medium": 192, "high": 256}[quality]
            export_params["bitrate"] = f"{bitrate}k"
            export_params["codec"] = "libvorbis"
            
        elif target_format.lower() == "flac":
            # FLAC is lossless, no bitrate needed
            export_params["parameters"] = ["-compression_level", "8"]
            
        elif target_format.lower() == "wav":
            # WAV is uncompressed
            pass
            
        # Generate output filename
        base_name = os.path.splitext(os.path.basename(input_path))[0]
        output_filename = generate_unique_filename(f"{base_name}.{target_format}", file_id)
        output_path = os.path.join(PROCESSED_DIR, output_filename)
        
        # Export audio in target format
        audio.export(output_path, format=target_format, **export_params)
        
        # Get metadata of the converted file
        metadata = get_audio_info(output_path)
        
        processing_time = time.time() - start_time
        
        return {
            "success": True,
            "output_path": output_path,
            "processing_time": processing_time,
            "metadata": metadata,
            "conversion_params": {
                "target_format": target_format,
                "quality": quality,
                "bitrate": bitrate
            }
        }
        
    except Exception as e:
        return {
            "success": False,
            "error": f"Format conversion error: {str(e)}"
        }
