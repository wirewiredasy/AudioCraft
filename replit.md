# Audio Processing Backend API

## Overview

This is a comprehensive audio processing backend system built with FastAPI. The system provides a centralized API that handles multiple specialized audio processing tasks including vocal removal, pitch/tempo adjustment, format conversion, audio cutting/joining, noise reduction, and audio playback. The backend is designed for easy integration with any frontend or direct API usage.

## User Preferences

Preferred communication style: Simple, everyday language.
Architecture preference: Full-stack application with modern React frontend and FastAPI backend.

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

### Modern Frontend Architecture
- **React.js Framework**: Modern React 18 with hooks and functional components
- **Material-UI Design**: Professional UI components with custom theming
- **Vite Build Tool**: Fast development server and optimized production builds
- **Tailwind CSS**: Utility-first CSS framework for responsive design
- **Audio Libraries**: Integrated Tone.js, Howler.js, Pizzicato.js, and Wavesurfer.js
- **React Router**: Client-side routing for single-page application experience

### Backend API Architecture
- **FastAPI Framework**: High-performance async API with automatic documentation
- **RESTful Services**: Clean REST API architecture for audio processing
- **Microservices Ready**: Modular design that can be expanded to microservices
- **CORS Enabled**: Cross-origin requests enabled for frontend integration

### System Dependencies
- **FFmpeg**: Required system dependency for audio processing
- **Python 3.11+**: Runtime environment with async/await support

### Recent Changes
- **Date**: August 3, 2025
- **Change**: Successfully migrated project from Replit Agent to Replit environment
- **Reason**: Migration required for Replit compatibility, security, and proper deployment
- **Impact**: Full-stack application now runs cleanly on single port 5000 with integrated frontend/backend
- **Migration Details**:
  - Combined React frontend and FastAPI backend into single application
  - Fixed port configuration to use Replit-required port 5000
  - Built and integrated frontend assets with backend static file serving
  - Verified all API endpoints are working correctly
  - Maintained client/server separation with proper security practices
- **Technologies Added**:
  - React.js with modern hooks and functional components
  - Material-UI for professional design components
  - Vite for fast development and optimized builds
  - Tailwind CSS for utility-first styling
  - Audio processing libraries: Tone.js, Howler.js, Pizzicato.js, Wavesurfer.js
  - React Router for navigation
  - Axios for API communication
  - React Dropzone for file uploads

### Frontend Features
- **Homepage**: Professional landing page showcasing all audio tools
- **Vocal Remover**: AI-powered vocal separation with progress tracking
- **Pitch & Tempo**: Independent pitch and tempo adjustment with real-time controls
- **Format Converter**: Support for all major audio formats with quality options
- **Audio Editor**: Cut and join audio files with visual waveform editing
- **Noise Reduction**: Advanced noise removal with adjustable strength settings
- **Audio Visualization**: Real-time waveform display using Wavesurfer.js
- **Responsive Design**: Mobile-friendly interface with glass-morphism effects
- **Professional UI**: Dark theme with gradient backgrounds and smooth animations