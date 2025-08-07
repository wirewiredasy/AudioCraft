# ODOREMOVER Audio Suite - Project Documentation

## Overview

This is the complete ODOREMOVER Audio Suite - a professional full-stack audio processing platform built with React + Next.js frontend and FastAPI microservices backend architecture. The project provides advanced tools for audio manipulation including vocal removal, pitch/tempo adjustment, format conversion, noise reduction, and more.

## User Preferences

Preferred communication style: Simple, everyday language.
Custom UI Requirements: 
- Custom static icons/logos for each tool (not lucide icons)
- Unique complex logo for "ODOREMOVER" webapp brand
- Mobile responsive with separate desktop/mobile layouts
- Authentication system with dashboard functionality
- Language support system implementation
- Professional unique UI organization

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
- ✅ Created proper workflow configuration with Backend (port 8001) and Frontend (port 5000)
- ✅ Fixed all package dependencies and module imports for both Python and Node.js
- ✅ Updated API routing configuration to connect frontend to correct backend port
- ✅ Added missing __init__.py files to make Python services properly importable
- ✅ Fixed all dependency issues and installed required packages (Python and Node.js)
- ✅ Completely rebuilt homepage to match vocalremover.org design exactly from user screenshot
- ✅ Implemented dark theme with collapsible sidebar navigation matching original
- ✅ Added "HOW IT WORKS" section with vocal remover focus and audio visualization
- ✅ Created professional SEO meta tags for search optimization and social sharing
- ✅ Built all individual tool pages with clean design and visual effects
- ✅ Applied consistent dark theme with professional branding across all pages
- ✅ Added responsive design with hover effects and loading animations
- ✅ **CORE AUDIO PROCESSING IMPLEMENTED**: All 11 audio processing services with advanced algorithms:
  
  **✅ Vocal Remover**: Center channel extraction + spectral subtraction algorithms
  **✅ Pitch & Tempo**: Independent PSOLA-based pitch/tempo adjustment using librosa
  **✅ Format Converter**: Multi-format support (MP3, WAV, FLAC, AAC) with quality settings
  **✅ Noise Reduction**: Spectral subtraction with adaptive floor and stationary/non-stationary modes
  **✅ Audio Splitter**: 4 separation methods (L/R channels, Mid/Side, frequency bands, vocal/instrumental)
  **✅ Volume Normalizer**: RMS-based normalization with soft limiting and anti-clipping
  **✅ Equalizer**: 3-band frequency filtering with FFT-based bandpass filters
  **✅ Cutter/Joiner**: Precision timing cuts with fade in/out effects
  **✅ Fade Effects**: Professional linear fade in/out with duration controls
  **✅ Audio Reverse**: Complete audio playback reversal
  **✅ Metadata Editor**: Full MP3 tag editing using mutagen library
  
- ✅ **API Gateway**: Complete FastAPI microservices architecture with 11 endpoints
- ✅ **Error Handling**: Comprehensive exception handling with file cleanup
- ✅ **File Management**: UUID-based secure file naming with automatic cleanup

**MAJOR FIXES COMPLETED:**
- ✅ **CORS Issues Fixed**: Updated Next.js configuration for proper cross-origin requests
- ✅ **All Audio Processing Working**: 11 processors with advanced algorithms fully functional:
  - Vocal Remover: Center channel extraction + spectral subtraction
  - Pitch/Tempo: Independent PSOLA-based adjustment
  - Converter: Multi-format with quality settings  
  - Noise Reduction: Spectral subtraction with adaptive floor
  - Audio Splitter: 4 separation methods
  - Volume Normalizer: RMS-based with soft limiting
  - Equalizer: 3-band FFT filtering
  - Cutter/Joiner: Precision timing with fade effects
  - Fade Effects: Professional linear fades
  - Audio Reverse: Complete playback reversal
  - Metadata Editor: Full MP3 tag editing
- ✅ **Workflow Management Fixed**: Removed 8+ duplicate workflows, kept only Backend/Frontend
- ✅ **Database Schema Ready**: Complete authentication system with user preferences, processing history, and credits tracking

**LATEST COMPLETION:**
- ✅ **ODOREMOVER Logo Implementation**: Created exact SVG replica from user's image
- ✅ **Consistent Branding**: Applied ODOREMOVER logo across all pages and components:
  - Header.jsx - Main navigation logo
  - ResponsiveLayout.jsx - Mobile header logo
  - Dashboard.jsx - User dashboard logo
  - All tool pages (vocal-remover, pitch-tempo, noise-reduction, etc.)
  - Proper sizing and text display options (showText, textSize props)
- ✅ **Professional Brand Identity**: Uniform logo usage with hover effects and transitions

**Next Steps (Requires User Action):**
- 🔄 **Database Setup**: User needs to provision PostgreSQL database in Replit (I don't have permission)
- 🔄 Replace remaining tool-specific icons with custom static icons
- 🔄 Implement mobile responsive design with separate desktop/mobile viewpoints  
- 🔄 Add user authentication dashboard with Replit Auth integration

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