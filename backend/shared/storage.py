"""
Storage utilities for ODOREMOVER Audio Suite
Supports local storage and cloud storage integration
"""
import os
import uuid
from pathlib import Path
from typing import Optional

class StorageManager:
    """Manages file storage for audio processing"""
    
    def __init__(self, base_dir: str = "."):
        self.base_dir = Path(base_dir)
        self.upload_dir = self.base_dir / "uploads"
        self.processed_dir = self.base_dir / "processed"
        self.temp_dir = self.base_dir / "temp"
        
        # Create directories
        self.upload_dir.mkdir(exist_ok=True)
        self.processed_dir.mkdir(exist_ok=True)
        self.temp_dir.mkdir(exist_ok=True)
    
    def generate_filename(self, prefix: str, extension: str) -> str:
        """Generate unique filename with prefix"""
        return f"{prefix}_{uuid.uuid4()}.{extension.lstrip('.')}"
    
    def save_upload(self, file_content: bytes, filename: str) -> str:
        """Save uploaded file and return path"""
        upload_path = self.upload_dir / filename
        with open(upload_path, "wb") as f:
            f.write(file_content)
        return str(upload_path)
    
    def save_processed(self, file_content: bytes, filename: str) -> str:
        """Save processed file and return path"""
        processed_path = self.processed_dir / filename
        with open(processed_path, "wb") as f:
            f.write(file_content)
        return str(processed_path)
    
    def get_download_url(self, filename: str) -> str:
        """Get download URL for processed file"""
        return f"/download/{filename}"
    
    def cleanup_temp_files(self, max_age_hours: int = 24):
        """Clean up temporary files older than max_age_hours"""
        import time
        current_time = time.time()
        max_age_seconds = max_age_hours * 3600
        
        for directory in [self.upload_dir, self.temp_dir]:
            for file_path in directory.iterdir():
                if file_path.is_file():
                    file_age = current_time - file_path.stat().st_mtime
                    if file_age > max_age_seconds:
                        try:
                            file_path.unlink()
                        except Exception:
                            pass
    
    def delete_file(self, file_path: str) -> bool:
        """Safely delete file"""
        try:
            path = Path(file_path)
            if path.exists():
                path.unlink()
                return True
        except Exception:
            pass
        return False
    
    def get_file_size(self, file_path: str) -> Optional[int]:
        """Get file size in bytes"""
        try:
            return Path(file_path).stat().st_size
        except Exception:
            return None

# Cloud storage integration (placeholder for future enhancement)
class CloudStorageManager:
    """Cloud storage integration for Cloudinary, Supabase, etc."""
    
    def __init__(self, provider: str = "local"):
        self.provider = provider
        self.local_storage = StorageManager()
    
    async def upload_file(self, file_content: bytes, filename: str) -> str:
        """Upload file to cloud storage"""
        # For now, use local storage
        # Future: implement Cloudinary, Supabase, AWS S3, etc.
        return self.local_storage.save_processed(file_content, filename)
    
    async def get_file_url(self, filename: str) -> str:
        """Get public URL for file"""
        # For now, return local download URL
        # Future: return cloud URL
        return self.local_storage.get_download_url(filename)