import cloudinary
import cloudinary.uploader
import os
from typing import Optional
from .config import CLOUDINARY_URL

# Configure Cloudinary if URL is provided
if CLOUDINARY_URL:
    cloudinary.config(cloudinary_url=CLOUDINARY_URL)

def upload_to_cloudinary(local_path: str, public_id: Optional[str] = None) -> Optional[str]:
    """
    Upload file to Cloudinary and return the secure URL
    """
    try:
        if not CLOUDINARY_URL:
            return None
            
        upload_options = {
            "resource_type": "auto",
            "folder": "audio_processing"
        }
        
        if public_id:
            upload_options["public_id"] = public_id
            
        response = cloudinary.uploader.upload(local_path, **upload_options)
        return response.get("secure_url")
        
    except Exception as e:
        print(f"Cloudinary upload failed: {str(e)}")
        return None

def delete_from_cloudinary(public_id: str) -> bool:
    """
    Delete file from Cloudinary
    """
    try:
        if not CLOUDINARY_URL:
            return False
            
        response = cloudinary.uploader.destroy(public_id, resource_type="video")
        return response.get("result") == "ok"
        
    except Exception as e:
        print(f"Cloudinary delete failed: {str(e)}")
        return False

def get_file_url(file_path: str) -> str:
    """
    Get file URL - either from Cloudinary or local static URL
    """
    # Try to upload to Cloudinary first
    cloud_url = upload_to_cloudinary(file_path)
    
    if cloud_url:
        return cloud_url
    else:
        # Fallback to local static URL
        filename = os.path.basename(file_path)
        return f"/static/processed/{filename}"
