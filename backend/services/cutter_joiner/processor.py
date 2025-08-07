import os
import uuid
from pydub import AudioSegment
from fastapi import HTTPException

class CutterJoinerProcessor:
    def __init__(self):
        self.upload_dir = "uploads"
        self.processed_dir = "processed"
        os.makedirs(self.upload_dir, exist_ok=True)
        os.makedirs(self.processed_dir, exist_ok=True)

    async def process(self, file, operation="cut", start_time=0.0, end_time=None):
        """Cut or join audio files with precision timing"""
        try:
            # Save uploaded file
            upload_path = f"{self.upload_dir}/{uuid.uuid4()}_{file.filename}"
            with open(upload_path, "wb") as buffer:
                content = await file.read()
                buffer.write(content)

            # Load audio
            audio = AudioSegment.from_file(upload_path)
            
            if operation == "cut":
                # Convert seconds to milliseconds
                start_ms = int(start_time * 1000)
                end_ms = int(end_time * 1000) if end_time else len(audio)
                
                # Cut audio
                processed_audio = audio[start_ms:end_ms]
                operation_msg = f"Audio cut from {start_time}s to {end_time or len(audio)/1000}s"
                
            elif operation == "fade_in":
                # Apply fade in effect
                fade_duration = int((end_time or 2.0) * 1000)
                processed_audio = audio.fade_in(fade_duration)
                operation_msg = f"Fade in applied for {fade_duration/1000}s"
                
            elif operation == "fade_out":
                # Apply fade out effect  
                fade_duration = int((end_time or 2.0) * 1000)
                processed_audio = audio.fade_out(fade_duration)
                operation_msg = f"Fade out applied for {fade_duration/1000}s"
                
            else:
                processed_audio = audio
                operation_msg = "No operation applied"
            
            # Save processed file
            output_filename = f"{operation}_{uuid.uuid4()}.wav"
            output_path = f"{self.processed_dir}/{output_filename}"
            processed_audio.export(output_path, format="wav")
            
            # Clean up
            os.remove(upload_path)
            
            return {
                "success": True,
                "message": operation_msg,
                "output_file": f"/download/{output_filename}",
                "download_url": f"/download/{output_filename}",
                "operation_details": {
                    "operation": operation,
                    "start_time": start_time,
                    "end_time": end_time,
                    "original_duration": len(audio) / 1000,
                    "processed_duration": len(processed_audio) / 1000
                }
            }
            
        except Exception as e:
            # Clean up on error
            if 'upload_path' in locals():
                try:
                    os.remove(upload_path)
                except:
                    pass
            raise HTTPException(status_code=500, detail=f"Audio cutting/joining failed: {str(e)}")