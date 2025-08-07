import os
import uuid
import shutil
from mutagen.mp3 import MP3
from mutagen.id3 import ID3, TIT2, TPE1, TALB, TDRC
from mutagen import File
from fastapi import HTTPException

class MetadataEditorProcessor:
    def __init__(self):
        self.upload_dir = "uploads"
        self.processed_dir = "processed"
        os.makedirs(self.upload_dir, exist_ok=True)
        os.makedirs(self.processed_dir, exist_ok=True)

    async def process(self, file, title=None, artist=None, album=None, year=None):
        """Edit MP3 metadata and tags using mutagen"""
        try:
            # Save uploaded file
            upload_path = f"{self.upload_dir}/{uuid.uuid4()}_{file.filename}"
            with open(upload_path, "wb") as buffer:
                content = await file.read()
                buffer.write(content)

            output_filename = f"metadata_edited_{uuid.uuid4()}.mp3"
            output_path = f"{self.processed_dir}/{output_filename}"
            
            # Copy file first
            shutil.copy2(upload_path, output_path)
            
            # Edit metadata using mutagen
            try:
                audiofile = File(output_path)
                
                if audiofile is None:
                    raise Exception("Unable to read audio file for metadata editing")
                
                # For MP3 files, ensure ID3 tags exist
                if isinstance(audiofile, MP3):
                    if audiofile.tags is None:
                        audiofile.add_tags()
                
                # Update metadata fields
                changes_made = []
                
                if title:
                    audiofile.tags['TIT2'] = TIT2(encoding=3, text=title)
                    changes_made.append(f"Title: {title}")
                
                if artist:
                    audiofile.tags['TPE1'] = TPE1(encoding=3, text=artist)
                    changes_made.append(f"Artist: {artist}")
                
                if album:
                    audiofile.tags['TALB'] = TALB(encoding=3, text=album)
                    changes_made.append(f"Album: {album}")
                
                if year:
                    audiofile.tags['TDRC'] = TDRC(encoding=3, text=str(year))
                    changes_made.append(f"Year: {year}")
                
                # Save changes
                audiofile.save()
                
                metadata_msg = f"Metadata updated: {', '.join(changes_made)}" if changes_made else "No metadata changes applied"
                
            except Exception as meta_error:
                # If metadata editing fails, still return the file
                metadata_msg = f"File copied successfully, but metadata editing failed: {str(meta_error)}"
                changes_made = ["Metadata editing failed"]
            
            # Clean up
            os.remove(upload_path)
            
            return {
                "success": True,
                "message": metadata_msg,
                "output_file": f"/download/{output_filename}",
                "download_url": f"/download/{output_filename}",
                "metadata_changes": {
                    "title": title,
                    "artist": artist,
                    "album": album,
                    "year": year,
                    "changes_applied": changes_made
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