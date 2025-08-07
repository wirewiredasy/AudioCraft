# ODOREMOVER Audio Suite 🎵

A professional full-stack audio processing platform built with React + Next.js frontend and FastAPI microservices backend.

## Features 🔥

- **Vocal Remover**: AI-powered vocal separation using advanced algorithms
- **Pitch & Tempo**: Independent pitch and tempo adjustment
- **Format Converter**: Convert between all major audio formats
- **Audio Editor**: Cut, join, and trim audio files
- **Noise Reduction**: Advanced spectral subtraction noise removal
- **Volume Normalizer**: Professional audio level enhancement
- **Fade Effects**: Smooth fade in/out transitions
- **Metadata Editor**: Edit MP3 tags and metadata
- **Audio Reverser**: Reverse audio playback
- **3-Band Equalizer**: Professional frequency adjustment

## Tech Stack 🛠️

### Backend
- **FastAPI**: High-performance async API framework
- **Microservices**: Each tool is a separate service
- **Librosa**: Advanced audio analysis and processing
- **Pydub**: Audio manipulation and format handling
- **NumPy**: Numerical processing for audio algorithms

### Frontend
- **React**: Modern UI library
- **Next.js**: Full-stack React framework with SSR
- **Tailwind CSS**: Utility-first CSS framework
- **Axios**: HTTP client for API communication

## Project Structure 📁

```
audio-suite/
├── backend/                # FastAPI Backend
│   ├── api_gateway/        # Main API gateway
│   ├── services/           # Audio microservices
│   └── shared/             # Common utilities
├── frontend/               # React + Next.js Frontend
│   ├── components/         # Reusable components
│   ├── pages/              # Next.js pages
│   └── styles/             # Tailwind CSS
└── docker-compose.yml      # Container orchestration
```

## Quick Start 🚀

### Backend Setup
```bash
cd backend
pip install -r requirements.txt
uvicorn api_gateway.main:app --reload --host 0.0.0.0 --port 8000
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### Docker Setup
```bash
docker-compose up --build
```

## API Endpoints 📡

- `POST /vocal-remover` - Remove vocals from audio
- `POST /pitch-tempo` - Adjust pitch and tempo
- `POST /converter` - Convert audio formats
- `POST /cutter-joiner` - Cut and join audio
- `POST /noise-reduction` - Reduce background noise
- `POST /volume-normalizer` - Normalize audio volume
- `POST /fade-effect` - Add fade in/out effects
- `POST /metadata-editor` - Edit audio metadata
- `POST /audio-reverse` - Reverse audio playback
- `POST /equalizer` - Apply 3-band EQ

## Development 💻

- Backend runs on `http://localhost:8000`
- Frontend runs on `http://localhost:3000`
- API documentation available at `http://localhost:8000/docs`

## License 📄

MIT License - Feel free to use and modify for your projects.