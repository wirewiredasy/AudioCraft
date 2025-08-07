import os
import uuid
from pydub import AudioSegment
from fastapi import HTTPException

class ConverterProcessor:
    def __init__(self):
        self.upload_dir = "uploads"
        self.processed_dir = "processed"
        os.makedirs(self.upload_dir, exist_ok=True)
        os.makedirs(self.processed_dir, exist_ok=True)

    async def process(self, file, output_format="mp3", quality="high"):
        """Convert audio between different formats"""
        try:
            # Save uploaded file
            upload_path = f"{self.upload_dir}/{uuid.uuid4()}_{file.filename}"
            with open(upload_path, "wb") as buffer:
                content = await file.read()
                buffer.write(content)

            # Load audio with pydub
            audio = AudioSegment.from_file(upload_path)
            
            # Quality settings
            export_params = {}
            if output_format == "mp3":
                if quality == "high":
                    export_params = {"bitrate": "320k"}
                elif quality == "medium":
                    export_params = {"bitrate": "192k"}
                else:
                    export_params = {"bitrate": "128k"}
            elif output_format == "wav":
                export_params = {"parameters": ["-acodec", "pcm_s16le"]}
            
            # Save processed file
            output_filename = f"converted_{uuid.uuid4()}.{output_format}"
            output_path = f"{self.processed_dir}/{output_filename}"
            audio.export(output_path, format=output_format, **export_params)
            
            # Clean up
            os.remove(upload_path)
            
            return {
                "success": True,
                "message": f"Audio converted to {output_format.upper()} successfully",
                "output_file": f"/download/{output_filename}",
                "download_url": f"/download/{output_filename}",
                "conversion_details": {
                    "output_format": output_format,
                    "quality": quality,
                    "duration_ms": len(audio),
                    "channels": audio.channels,
                    "sample_rate": audio.frame_rate
                }
            }
            
        except Exception as e:
            # Clean up on error
            if 'upload_path' in locals():
                try:
                    os.remove(upload_path)
                except:
                    pass
            raise HTTPException(status_code=500, detail=f"Audio conversion failed: {str(e)}")