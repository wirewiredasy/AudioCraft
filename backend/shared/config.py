"""
Configuration settings for ODOREMOVER Audio Suite
"""
import os
from pathlib import Path

class Config:
    """Application configuration"""
    
    # API Gateway Settings
    API_HOST = os.getenv("API_HOST", "0.0.0.0")
    API_PORT = int(os.getenv("API_PORT", 8000))
    
    # File Upload Settings
    MAX_FILE_SIZE = int(os.getenv("MAX_FILE_SIZE", 100 * 1024 * 1024))  # 100MB
    ALLOWED_EXTENSIONS = {
        "mp3", "wav", "flac", "aac", "ogg", "m4a", "wma"
    }
    
    # Processing Settings
    DEFAULT_SAMPLE_RATE = int(os.getenv("DEFAULT_SAMPLE_RATE", 44100))
    PROCESSING_TIMEOUT = int(os.getenv("PROCESSING_TIMEOUT", 300))  # 5 minutes
    
    # Directory Settings
    BASE_DIR = Path(os.getenv("BASE_DIR", "."))
    UPLOAD_DIR = BASE_DIR / "uploads"
    PROCESSED_DIR = BASE_DIR / "processed"
    TEMP_DIR = BASE_DIR / "temp"
    
    # Storage Settings
    STORAGE_PROVIDER = os.getenv("STORAGE_PROVIDER", "local")  # local, cloudinary, supabase
    
    # Cloudinary Settings (if used)
    CLOUDINARY_CLOUD_NAME = os.getenv("CLOUDINARY_CLOUD_NAME")
    CLOUDINARY_API_KEY = os.getenv("CLOUDINARY_API_KEY")
    CLOUDINARY_API_SECRET = os.getenv("CLOUDINARY_API_SECRET")
    
    # Supabase Settings (if used)
    SUPABASE_URL = os.getenv("SUPABASE_URL")
    SUPABASE_KEY = os.getenv("SUPABASE_KEY")
    
    # Security Settings
    CORS_ORIGINS = os.getenv("CORS_ORIGINS", "*").split(",")
    
    # Audio Processing Defaults
    DEFAULT_VOCAL_REMOVAL_METHOD = "center_channel"
    DEFAULT_NOISE_REDUCTION_STRENGTH = 0.8
    DEFAULT_VOLUME_TARGET_DB = -6.0
    DEFAULT_FADE_DURATION = 2.0
    
    # Service Ports (for microservice deployment)
    SERVICE_PORTS = {
        "vocal_remover": 8001,
        "pitch_tempo": 8002,
        "converter": 8003,
        "cutter_joiner": 8004,
        "noise_reduction": 8005,
        "volume_normalizer": 8006,
        "fade_effect": 8007,
        "metadata_editor": 8008,
        "audio_reverse": 8009,
        "equalizer": 8010
    }
    
    @classmethod
    def create_directories(cls):
        """Create necessary directories"""
        for directory in [cls.UPLOAD_DIR, cls.PROCESSED_DIR, cls.TEMP_DIR]:
            directory.mkdir(exist_ok=True)
    
    @classmethod
    def is_allowed_file(cls, filename: str) -> bool:
        """Check if file extension is allowed"""
        return '.' in filename and \
               filename.rsplit('.', 1)[1].lower() in cls.ALLOWED_EXTENSIONS
    
    @classmethod
    def get_service_url(cls, service_name: str) -> str:
        """Get service URL for microservice communication"""
        port = cls.SERVICE_PORTS.get(service_name, 8000)
        return f"http://localhost:{port}"