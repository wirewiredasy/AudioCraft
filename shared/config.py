import os
from dotenv import load_dotenv

load_dotenv()

# Directory configuration
UPLOAD_DIR = os.getenv("UPLOAD_DIR", "static/uploads")
PROCESSED_DIR = os.getenv("PROCESSED_DIR", "static/processed")

# Port configuration
GATEWAY_PORT = int(os.getenv("GATEWAY_PORT", "8000"))

# Service ports
VOCAL_REMOVER_PORT = int(os.getenv("VOCAL_REMOVER_PORT", "8001"))
PITCH_TEMPO_PORT = int(os.getenv("PITCH_TEMPO_PORT", "8002"))
CONVERTER_PORT = int(os.getenv("CONVERTER_PORT", "8003"))
CUTTER_JOINER_PORT = int(os.getenv("CUTTER_JOINER_PORT", "8004"))
NOISE_REDUCTION_PORT = int(os.getenv("NOISE_REDUCTION_PORT", "8005"))
AUDIO_PLAYER_PORT = int(os.getenv("AUDIO_PLAYER_PORT", "8006"))

# Cloud storage configuration
CLOUDINARY_URL = os.getenv("CLOUDINARY_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
SUPABASE_URL = os.getenv("SUPABASE_URL")

# File constraints
MAX_FILE_SIZE = int(os.getenv("MAX_FILE_SIZE", "100")) * 1024 * 1024  # 100MB default
ALLOWED_AUDIO_FORMATS = [
    "audio/mpeg", "audio/wav", "audio/x-wav", "audio/flac", 
    "audio/mp4", "audio/aac", "audio/ogg", "audio/webm"
]

ALLOWED_EXTENSIONS = [".mp3", ".wav", ".flac", ".m4a", ".aac", ".ogg", ".webm"]

# Processing timeouts
PROCESSING_TIMEOUT = int(os.getenv("PROCESSING_TIMEOUT", "300"))  # 5 minutes
