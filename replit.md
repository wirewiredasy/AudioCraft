# Audio Processing Backend API

## Overview

This is a professional audio processing backend system built with FastAPI. The system provides a centralized API that handles multiple specialized audio processing tasks including vocal removal, pitch/tempo adjustment, format conversion, audio cutting/joining, noise reduction, and audio playback. The backend is designed as a pure API service for integration with any frontend, mobile app, or direct API usage.

## User Preferences

Preferred communication style: Simple, everyday language.
Architecture preference: Backend-only API service with FastAPI.

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

### Backend API Architecture
- **FastAPI Framework**: High-performance async API with automatic documentation
- **RESTful Services**: Clean REST API architecture for audio processing
- **Microservices Ready**: Modular design that can be expanded to microservices
- **CORS Enabled**: Cross-origin requests enabled for any frontend integration
- **OpenAPI Documentation**: Automatic API documentation at /docs endpoint

### System Dependencies
- **FFmpeg**: Required system dependency for audio processing
- **Python 3.11+**: Runtime environment with async/await support

### Recent Changes
- **Date**: August 5, 2025
- **Change**: Netflix/Disney+ Style React Frontend with Premium Glass Morphism
- **Reason**: User requested removal of CDN warnings and implementation of proper React + Vite frontend with Netflix/Disney+ styling
- **Impact**: Complete transformation to premium modern frontend with no CDN dependencies
- **Technical Achievements**:
  - **CDN WARNING FIXED**: Removed Tailwind CDN and implemented proper PostCSS + Tailwind build system
  - **NETFLIX/DISNEY+ STYLING**: Dark background with colorful gradient cards and premium glass morphism effects
  - **PROPER REACT FRONTEND**: Full React + Vite setup with all dependencies properly installed
  - **PREMIUM ANIMATIONS**: Smooth transitions, hover effects, and Netflix-style card animations
  - **PROFESSIONAL NAVIGATION**: GitHub/Linear style clean navigation with glass background
  - **STATIC FOLDER REMOVED**: Eliminated static HTML approach in favor of pure React architecture
  - **RESPONSIVE DESIGN**: Mobile-first approach with proper breakpoints and animations

### API Features
- **Vocal Removal**: AI-powered vocal separation using center channel extraction
- **Pitch & Tempo**: Independent pitch and tempo adjustment with librosa
- **Format Conversion**: Support for all major audio formats with pydub
- **Audio Editor**: Cut and join audio files with precision timing
- **Noise Reduction**: Advanced noise removal using spectral subtraction
- **File Management**: Secure upload/download system with automatic cleanup
- **Health Monitoring**: Service health checks and status endpoints
- **Auto Documentation**: OpenAPI/Swagger documentation at /docs