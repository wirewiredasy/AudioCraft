"""
Audio Presets & Templates API Routes for ODOREMOVER Audio Suite
"""
from typing import List, Optional
from fastapi import APIRouter, HTTPException, status, Depends
from pydantic import BaseModel

import sys
import os
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))

try:
    from shared.database import db_manager, PresetCreate, PresetResponse, AudioTool
    from auth.jwt_handler import get_current_user, get_optional_user, UserResponse
except ImportError as e:
    print(f"Presets routes import error: {e}")
    # Create dummy objects
    class DummyManager:
        async def create_preset(self, *args): return {}
        async def get_presets(self, *args): return []
    db_manager = DummyManager()
    get_current_user = lambda: {}
    get_optional_user = lambda: None
    UserResponse = dict
    PresetCreate = dict
    PresetResponse = dict
    AudioTool = str

router = APIRouter(prefix="/presets", tags=["presets"])

class PresetCreateRequest(BaseModel):
    name: str
    tool_type: AudioTool
    settings: dict
    is_public: bool = False

@router.post("/", response_model=PresetResponse)
async def create_preset(
    request: PresetCreateRequest,
    current_user: UserResponse = Depends(get_current_user)
):
    """Create a new audio preset"""
    
    preset_data = PresetCreate(
        name=request.name,
        tool_type=request.tool_type,
        settings=request.settings,
        is_public=request.is_public
    )
    
    preset = await db_manager.create_preset(str(current_user.id), preset_data)
    return preset

@router.get("/", response_model=List[PresetResponse])
async def get_presets(
    tool_type: Optional[AudioTool] = None,
    current_user: Optional[UserResponse] = Depends(get_optional_user)
):
    """Get available presets (public + user's private presets)"""
    
    user_id = str(current_user.id) if current_user else None
    presets = await db_manager.get_presets(tool_type, user_id)
    return presets

@router.get("/popular", response_model=List[PresetResponse])
async def get_popular_presets(
    tool_type: Optional[AudioTool] = None,
    limit: int = 10
):
    """Get most popular public presets"""
    
    presets = await db_manager.get_presets(tool_type, None)
    # Sort by usage_count and return top results
    sorted_presets = sorted(presets, key=lambda x: x.usage_count, reverse=True)
    return sorted_presets[:limit]

# Default presets for different genres and use cases
DEFAULT_PRESETS = {
    AudioTool.VOCAL_REMOVER: [
        {
            "name": "Rock/Pop Vocals",
            "settings": {
                "method": "center_channel_extraction",
                "sensitivity": 0.8,
                "preserve_stereo": True
            }
        },
        {
            "name": "Acoustic/Folk",
            "settings": {
                "method": "spectral_subtraction",
                "sensitivity": 0.6,
                "preserve_stereo": True
            }
        }
    ],
    AudioTool.EQUALIZER: [
        {
            "name": "Bass Boost",
            "settings": {
                "bands": {
                    "60Hz": 6,
                    "170Hz": 4,
                    "310Hz": 2,
                    "600Hz": 0,
                    "1kHz": 0,
                    "3kHz": 0,
                    "6kHz": 0,
                    "12kHz": 0,
                    "14kHz": 0,
                    "16kHz": 0
                }
            }
        },
        {
            "name": "Vocal Clarity",
            "settings": {
                "bands": {
                    "60Hz": -2,
                    "170Hz": -1,
                    "310Hz": 0,
                    "600Hz": 1,
                    "1kHz": 3,
                    "3kHz": 4,
                    "6kHz": 2,
                    "12kHz": 1,
                    "14kHz": 0,
                    "16kHz": 0
                }
            }
        }
    ],
    AudioTool.NOISE_REDUCTION: [
        {
            "name": "Studio Recording",
            "settings": {
                "noise_reduction_strength": 0.5,
                "preserve_transients": True,
                "frequency_smoothing": 3
            }
        },
        {
            "name": "Live Recording",
            "settings": {
                "noise_reduction_strength": 0.7,
                "preserve_transients": False,
                "frequency_smoothing": 5
            }
        }
    ]
}

@router.get("/defaults/{tool_type}", response_model=List[dict])
async def get_default_presets(tool_type: AudioTool):
    """Get default presets for a specific tool"""
    
    presets = DEFAULT_PRESETS.get(tool_type, [])
    return presets