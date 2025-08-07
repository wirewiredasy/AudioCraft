"""
Database Configuration and Models for ODOREMOVER Audio Suite
"""
import os
from datetime import datetime, timedelta
from typing import Optional, List
from enum import Enum
import uuid
from pydantic import BaseModel, EmailStr
import asyncpg
import json

# Database connection configuration
DATABASE_URL = os.getenv("DATABASE_URL")

class ProcessingStatus(str, Enum):
    PENDING = "pending"
    PROCESSING = "processing"
    COMPLETED = "completed"
    FAILED = "failed"
    CANCELLED = "cancelled"

class AudioTool(str, Enum):
    VOCAL_REMOVER = "vocal_remover"
    PITCH_TEMPO = "pitch_tempo"
    CONVERTER = "converter"
    SPLITTER = "splitter"
    KARAOKE = "karaoke"
    NOISE_REDUCTION = "noise_reduction"
    VOLUME_NORMALIZER = "volume_normalizer"
    EQUALIZER = "equalizer"
    RECORDER = "recorder"
    CUTTER_JOINER = "cutter_joiner"
    METADATA_EDITOR = "metadata_editor"
    AUDIO_REVERSE = "audio_reverse"
    FADE_EFFECT = "fade_effect"

# Pydantic Models
class UserCreate(BaseModel):
    email: EmailStr
    username: str
    password: str
    full_name: Optional[str] = None

class UserResponse(BaseModel):
    id: str
    email: str
    username: str
    full_name: Optional[str]
    created_at: datetime
    is_premium: bool
    processing_quota: int

class AudioJobCreate(BaseModel):
    tool_type: AudioTool
    settings: dict
    batch_files: List[str] = []
    preset_id: Optional[str] = None

class AudioJobResponse(BaseModel):
    id: str
    user_id: str
    tool_type: AudioTool
    status: ProcessingStatus
    settings: dict
    input_files: List[str]
    output_files: List[str] = []
    progress: float = 0.0
    error_message: Optional[str] = None
    created_at: datetime
    completed_at: Optional[datetime] = None
    processing_time: Optional[float] = None

class PresetCreate(BaseModel):
    name: str
    tool_type: AudioTool
    settings: dict
    is_public: bool = False

class PresetResponse(BaseModel):
    id: str
    name: str
    tool_type: AudioTool
    settings: dict
    user_id: Optional[str]
    is_public: bool
    usage_count: int
    created_at: datetime

class DatabaseManager:
    def __init__(self):
        self.pool = None
    
    async def connect(self):
        """Initialize database connection pool"""
        self.pool = await asyncpg.create_pool(DATABASE_URL, min_size=5, max_size=20)
        await self.create_tables()
    
    async def disconnect(self):
        """Close database connection pool"""
        if self.pool:
            await self.pool.close()
    
    async def create_tables(self):
        """Create all necessary tables"""
        if not self.pool:
            return
        async with self.pool.acquire() as conn:
            # Users table
            await conn.execute('''
                CREATE TABLE IF NOT EXISTS users (
                    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                    email VARCHAR UNIQUE NOT NULL,
                    username VARCHAR UNIQUE NOT NULL,
                    password_hash VARCHAR NOT NULL,
                    full_name VARCHAR,
                    is_premium BOOLEAN DEFAULT FALSE,
                    processing_quota INTEGER DEFAULT 100,
                    created_at TIMESTAMP DEFAULT NOW(),
                    updated_at TIMESTAMP DEFAULT NOW()
                )
            ''')
            
            # Audio processing jobs table
            await conn.execute('''
                CREATE TABLE IF NOT EXISTS audio_jobs (
                    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
                    tool_type VARCHAR NOT NULL,
                    status VARCHAR DEFAULT 'pending',
                    settings JSONB NOT NULL,
                    input_files JSONB NOT NULL DEFAULT '[]',
                    output_files JSONB DEFAULT '[]',
                    progress FLOAT DEFAULT 0.0,
                    error_message TEXT,
                    created_at TIMESTAMP DEFAULT NOW(),
                    completed_at TIMESTAMP,
                    processing_time FLOAT
                )
            ''')
            
            # Audio presets table
            await conn.execute('''
                CREATE TABLE IF NOT EXISTS audio_presets (
                    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                    name VARCHAR NOT NULL,
                    tool_type VARCHAR NOT NULL,
                    settings JSONB NOT NULL,
                    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
                    is_public BOOLEAN DEFAULT FALSE,
                    usage_count INTEGER DEFAULT 0,
                    created_at TIMESTAMP DEFAULT NOW()
                )
            ''')
            
            # User sessions table for JWT management
            await conn.execute('''
                CREATE TABLE IF NOT EXISTS user_sessions (
                    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
                    token_hash VARCHAR NOT NULL,
                    expires_at TIMESTAMP NOT NULL,
                    created_at TIMESTAMP DEFAULT NOW(),
                    is_active BOOLEAN DEFAULT TRUE
                )
            ''')
            
            # Processing queue table
            await conn.execute('''
                CREATE TABLE IF NOT EXISTS processing_queue (
                    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                    job_id UUID REFERENCES audio_jobs(id) ON DELETE CASCADE,
                    priority INTEGER DEFAULT 5,
                    scheduled_at TIMESTAMP DEFAULT NOW(),
                    started_at TIMESTAMP,
                    retry_count INTEGER DEFAULT 0,
                    max_retries INTEGER DEFAULT 3
                )
            ''')

    # User management methods
    async def create_user(self, user_data: UserCreate, password_hash: str) -> UserResponse:
        """Create a new user"""
        if not self.pool:
            raise Exception("Database not connected")
        async with self.pool.acquire() as conn:
            row = await conn.fetchrow('''
                INSERT INTO users (email, username, password_hash, full_name)
                VALUES ($1, $2, $3, $4)
                RETURNING id, email, username, full_name, created_at, is_premium, processing_quota
            ''', user_data.email, user_data.username, password_hash, user_data.full_name)
            
            return UserResponse(**dict(row))
    
    async def get_user_by_email(self, email: str):
        """Get user by email"""
        if not self.pool:
            return None
        async with self.pool.acquire() as conn:
            return await conn.fetchrow('SELECT * FROM users WHERE email = $1', email)
    
    async def get_user_by_id(self, user_id: str):
        """Get user by ID"""
        if not self.pool:
            return None
        async with self.pool.acquire() as conn:
            return await conn.fetchrow('SELECT * FROM users WHERE id = $1', uuid.UUID(user_id))

    # Job management methods
    async def create_job(self, user_id: str, job_data: AudioJobCreate) -> AudioJobResponse:
        """Create a new audio processing job"""
        if not self.pool:
            raise Exception("Database not connected")
        async with self.pool.acquire() as conn:
            row = await conn.fetchrow('''
                INSERT INTO audio_jobs (user_id, tool_type, settings, input_files)
                VALUES ($1, $2, $3, $4)
                RETURNING id, user_id, tool_type, status, settings, input_files, 
                         output_files, progress, error_message, created_at, completed_at, processing_time
            ''', uuid.UUID(user_id), job_data.tool_type.value, 
                json.dumps(job_data.settings), json.dumps(job_data.batch_files))
            
            # Add to processing queue
            await conn.execute('''
                INSERT INTO processing_queue (job_id) VALUES ($1)
            ''', row['id'])
            
            return AudioJobResponse(**dict(row))
    
    async def update_job_progress(self, job_id: str, progress: float, status: Optional[ProcessingStatus] = None):
        """Update job progress"""
        if not self.pool:
            return
        async with self.pool.acquire() as conn:
            query = 'UPDATE audio_jobs SET progress = $1'
            params = [progress]
            
            if status:
                query += ', status = $' + str(len(params) + 1)
                params.append(status.value)
                
                if status in [ProcessingStatus.COMPLETED, ProcessingStatus.FAILED]:
                    query += ', completed_at = NOW()'
            
            query += ' WHERE id = $' + str(len(params) + 1)
            params.append(uuid.UUID(job_id))
            
            await conn.execute(query, *params)
    
    async def get_user_jobs(self, user_id: str, limit: int = 50) -> List[AudioJobResponse]:
        """Get user's processing jobs"""
        if not self.pool:
            return []
        async with self.pool.acquire() as conn:
            rows = await conn.fetch('''
                SELECT * FROM audio_jobs 
                WHERE user_id = $1 
                ORDER BY created_at DESC 
                LIMIT $2
            ''', uuid.UUID(user_id), limit)
            
            return [AudioJobResponse(**dict(row)) for row in rows]

    # Preset management methods
    async def create_preset(self, user_id: str, preset_data: PresetCreate) -> PresetResponse:
        """Create a new audio preset"""
        if not self.pool:
            raise Exception("Database not connected")
        async with self.pool.acquire() as conn:
            row = await conn.fetchrow('''
                INSERT INTO audio_presets (name, tool_type, settings, user_id, is_public)
                VALUES ($1, $2, $3, $4, $5)
                RETURNING id, name, tool_type, settings, user_id, is_public, usage_count, created_at
            ''', preset_data.name, preset_data.tool_type.value, 
                json.dumps(preset_data.settings), uuid.UUID(user_id), preset_data.is_public)
            
            return PresetResponse(**dict(row))
    
    async def get_presets(self, tool_type: Optional[AudioTool] = None, user_id: Optional[str] = None) -> List[PresetResponse]:
        """Get available presets"""
        if not self.pool:
            return []
        async with self.pool.acquire() as conn:
            query = '''
                SELECT * FROM audio_presets 
                WHERE (is_public = TRUE OR user_id = $1)
            '''
            params = [uuid.UUID(user_id) if user_id else None]
            
            if tool_type:
                query += ' AND tool_type = $' + str(len(params) + 1)
                params.append(tool_type.value)
                
            query += ' ORDER BY usage_count DESC, created_at DESC'
            
            rows = await conn.fetch(query, *params)
            return [PresetResponse(**dict(row)) for row in rows]

# Global database manager instance
db_manager = DatabaseManager()

async def get_database():
    """Dependency to get database manager"""
    return db_manager