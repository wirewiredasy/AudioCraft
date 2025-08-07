import os
import uuid
import shutil
from fastapi import HTTPException

class MetadataEditorProcessor:
    def __init__(self):
        self.upload_dir = "uploads"
        self.processed_dir = "processed"
        os.makedirs(self.upload_dir, exist_ok=True)
        os.makedirs(self.processed_dir, exist_ok=True)

    async def process(self, file, title=None, artist=None, album=None, year=None):
        """Edit MP3 metadata and tags"""
        try:
            # Save uploaded file
            upload_path = f"{self.upload_dir}/{uuid.uuid4()}_{file.filename}"
            with open(upload_path, "wb") as buffer:
                content = await file.read()
                buffer.write(content)

            # For now, metadata editing requires mutagen library
            # This is a placeholder implementation that copies the file
            # Future enhancement: install mutagen when dependencies are available
            
            output_filename = f"metadata_edited_{uuid.uuid4()}.mp3"
            output_path = f"{self.processed_dir}/{output_filename}"
            
            # Copy file as metadata editing is disabled without mutagen
            shutil.copy2(upload_path, output_path)
            
            # Clean up
            os.remove(upload_path)
            
            return {
                "success": True,
                "message": "File processed (metadata editing requires mutagen library)",
                "output_file": f"/download/{output_filename}",
                "download_url": f"/download/{output_filename}",
                "metadata_changes": {
                    "title": title,
                    "artist": artist,
                    "album": album,
                    "year": year,
                    "note": "Metadata editing will be enabled when mutagen is available"
                }
            }
            
        except Exception as e:
            # Clean up on error
            if 'upload_path' in locals():
                try:
                    os.remove(upload_path)
                except:
                    pass
            raise HTTPException(status_code=500, detail=f"Metadata editing failed: {str(e)}")