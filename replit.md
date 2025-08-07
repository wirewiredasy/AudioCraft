# ODOREMOVER Audio Suite - Project Documentation

## Overview

This is the complete ODOREMOVER Audio Suite - a professional full-stack audio processing platform built with React + Next.js frontend and FastAPI microservices backend architecture. The project provides advanced tools for audio manipulation including vocal removal, pitch/tempo adjustment, format conversion, noise reduction, and more.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Technology Stack**: React + Next.js 14 with TypeScript support
- **UI Framework**: Tailwind CSS with custom glassmorphism design system
- **Component Structure**: Modular components in `/components` directory
- **Routing**: Next.js file-based routing with dynamic tool pages
- **State Management**: Local React state with context API
- **HTTP Client**: Axios for API communication

### Backend Architecture
- **Server Framework**: FastAPI with async/await support
- **Architecture Pattern**: Microservices with API Gateway
- **API Gateway**: Central routing hub at `backend/api_gateway/main.py`
- **Microservices**: Each tool runs as separate service in `backend/services/`
- **Request Processing**: FastAPI multipart form handling
- **Error Handling**: HTTP exception handling with detailed responses

### Audio Processing
- **Core Libraries**: Librosa for advanced audio analysis, Pydub for manipulation
- **Processing Methods**: 
  - Vocal removal using center channel extraction + spectral subtraction
  - Pitch/tempo adjustment with independent control
  - Format conversion with quality options
  - Noise reduction using spectral subtraction
  - Volume normalization with RMS analysis
- **File Support**: MP3, WAV, FLAC, AAC, OGG, M4A, WMA
- **Quality Control**: Professional normalization and anti-clipping

### Data Layer
- **File Storage**: Local filesystem with organized upload/processed directories
- **Temporary Files**: Automatic cleanup system
- **File Management**: UUID-based naming for security
- **Download System**: Static file serving through FastAPI

## External Dependencies

### Backend Dependencies
- `fastapi==0.104.1` - Modern web framework
- `uvicorn[standard]==0.24.0` - ASGI server
- `librosa==0.10.1` - Audio analysis library
- `soundfile==0.12.1` - Audio file I/O
- `pydub==0.25.1` - Audio manipulation
- `numpy==1.24.3` - Numerical computing
- `python-multipart==0.0.6` - File upload handling

### Frontend Dependencies
- `next@^14.0.3` - React framework
- `react@^18.2.0` - UI library
- `tailwindcss@^3.3.6` - CSS framework
- `axios@^1.6.2` - HTTP client
- `lucide-react@^0.294.0` - Icon library
- `react-hot-toast@^2.4.1` - Toast notifications
- `react-dropzone@^14.2.3` - File upload component

### Development Tools
- PostCSS and Autoprefixer for CSS processing
- ESLint for code quality
- Docker support for containerization

## Project Structure

```
├── backend/                # FastAPI Backend
│   ├── api_gateway/        # Central API gateway
│   ├── services/           # Audio microservices
│   │   ├── vocal_remover/
│   │   ├── pitch_tempo/
│   │   ├── converter/
│   │   └── [8 more tools]
│   ├── shared/             # Common utilities
│   └── requirements.txt
├── frontend/               # React + Next.js Frontend
│   ├── components/         # Reusable components
│   ├── pages/              # Next.js pages
│   ├── styles/             # Tailwind CSS
│   └── package.json
└── docker-compose.yml      # Container orchestration
```

## Recent Changes

**Date: August 7, 2025**
- ✅ Successfully completed migration from Replit Agent to standard Replit environment
- ✅ Fixed all dependency issues and installed required packages (Python and Node.js)
- ✅ Recreated homepage UI to match exact design specification with dark/light theme toggle
- ✅ Implemented modern layout with animated waveform background and professional styling
- ✅ Added responsive tool cards with pricing, ratings, and descriptions
- ✅ Enhanced navigation with theme switching functionality
- ✅ Verified all workflows running correctly (Backend API on 8000, Frontend on 3000)
- ✅ Migration completed successfully - project ready for development

## Development Workflow

1. **Backend**: Runs on `http://localhost:8000` with API documentation at `/docs`
2. **Frontend**: Runs on `http://localhost:3000` with hot reload
3. **File Processing**: Upload → Process → Download workflow
4. **API Communication**: Frontend calls backend endpoints with FormData

## Deployment

- Docker Compose setup for both services
- Production-ready with Nginx reverse proxy
- Environment variable configuration
- Health checks and restart policies

---

*Last updated: August 7, 2025*