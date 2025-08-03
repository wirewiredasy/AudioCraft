# Audio Processing Microservices API

## Overview

This is a comprehensive audio processing backend system built with a microservices architecture. The system provides a centralized API gateway that orchestrates multiple specialized audio processing services including vocal removal, pitch/tempo adjustment, format conversion, audio cutting/joining, noise reduction, and audio playback. Each service operates independently and can be scaled separately, making the system highly modular and maintainable.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Microservices Architecture
The system follows a microservices pattern with a central API gateway that routes requests to specialized services. Each service runs on its own port and handles specific audio processing tasks:

- **API Gateway** (Port 8000): Central entry point that orchestrates requests to other services
- **Vocal Remover Service** (Port 8001): Uses Spleeter for audio source separation
- **Pitch/Tempo Service** (Port 8002): Uses Librosa for pitch shifting and tempo adjustment
- **Format Converter Service** (Port 8003): Handles audio format conversion with quality options
- **Cutter/Joiner Service** (Port 8004): Provides audio segmentation and concatenation
- **Noise Reduction Service** (Port 8005): Uses noisereduce library for audio cleanup
- **Audio Player Service** (Port 8006): Handles audio streaming and playback metadata

### Audio Processing Pipeline
The system uses a combination of audio processing libraries:
- **Pydub** for basic audio manipulation and format handling
- **Librosa** for advanced audio analysis and transformations
- **FFmpeg** for low-level audio operations and metadata extraction
- **Spleeter** for AI-powered vocal separation
- **noisereduce** for noise removal algorithms

### File Management Strategy
The architecture implements a dual-directory approach:
- **Upload Directory** (`static/uploads`): Temporary storage for incoming files
- **Processed Directory** (`static/processed`): Permanent storage for output files
- Automatic cleanup of temporary files after processing
- Support for both local file serving and cloud storage URLs

### Configuration Management
Environment-based configuration using `.env` files with sensible defaults:
- Service port assignments
- File size limits (100MB default)
- Processing timeouts (5 minutes default)
- Supported audio formats and extensions
- Cloud storage credentials

### Error Handling and Validation
Comprehensive validation layer including:
- File format validation against whitelist of audio types
- File size constraints
- Processing parameter validation
- Graceful error handling with detailed error messages
- Health check endpoints for service monitoring

## External Dependencies

### Audio Processing Libraries
- **pydub**: Audio manipulation and format conversion
- **librosa**: Advanced audio analysis and effects processing
- **soundfile**: High-quality audio I/O operations
- **noisereduce**: Noise reduction algorithms
- **mutagen**: Audio metadata extraction
- **ffmpeg-python**: FFmpeg integration for audio operations

### AI/ML Services
- **Spleeter**: TensorFlow-based audio source separation for vocal removal

### Cloud Storage Integration
- **Cloudinary**: Optional cloud storage for processed audio files
- **Supabase**: Optional database and storage backend

### Web Framework
- **FastAPI**: Async web framework with automatic OpenAPI documentation
- **httpx**: Async HTTP client for inter-service communication
- **uvicorn**: ASGI server for running FastAPI applications

### System Dependencies
- **FFmpeg**: Required system dependency for audio processing
- **Python 3.8+**: Runtime environment with async/await support