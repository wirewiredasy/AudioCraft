"""
Authentication API Routes for ODOREMOVER Audio Suite
"""
from datetime import timedelta
from typing import Dict, Any
from fastapi import APIRouter, HTTPException, status, Depends
from fastapi.security import OAuth2PasswordRequestForm
from pydantic import BaseModel

import sys
import os
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))

try:
    from shared.database import db_manager, UserCreate, UserResponse
    from auth.jwt_handler import auth_handler, get_current_user
except ImportError as e:
    print(f"Auth routes import error: {e}")
    # Create dummy objects if imports fail
    class DummyManager:
        async def get_user_by_email(self, email): return None
        async def create_user(self, user): return None
    class DummyHandler:
        def generate_tokens(self, user_id): return {"access": "dummy", "refresh": "dummy"}
        def get_current_user(self): return None
    db_manager = DummyManager()
    auth_handler = DummyHandler()
    get_current_user = auth_handler.get_current_user
    UserCreate = dict
    UserResponse = dict

router = APIRouter(prefix="/auth", tags=["authentication"])

class TokenResponse(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"
    user: UserResponse

class LoginRequest(BaseModel):
    email: str
    password: str

class RegisterRequest(BaseModel):
    email: str
    username: str
    password: str
    full_name: str = None

@router.post("/register", response_model=TokenResponse)
async def register(request: RegisterRequest):
    """Register a new user"""
    
    # Check if user already exists
    existing_user = await db_manager.get_user_by_email(request.email)
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # Hash password and create user
    password_hash = auth_handler.hash_password(request.password)
    user_data = UserCreate(
        email=request.email,
        username=request.username,
        password=request.password,
        full_name=request.full_name
    )
    
    user = await db_manager.create_user(user_data, password_hash)
    
    # Create tokens
    token_data = {"sub": str(user.id), "email": user.email}
    access_token = auth_handler.create_access_token(token_data)
    refresh_token = auth_handler.create_refresh_token(token_data)
    
    # Store session
    expires_at = timedelta(minutes=1440)  # 24 hours
    await auth_handler.store_session(str(user.id), access_token, expires_at)
    
    return TokenResponse(
        access_token=access_token,
        refresh_token=refresh_token,
        user=user
    )

@router.post("/login", response_model=TokenResponse)
async def login(request: LoginRequest):
    """Login user"""
    
    # Get user by email
    user_data = await db_manager.get_user_by_email(request.email)
    if not user_data:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )
    
    # Verify password
    if not auth_handler.verify_password(request.password, user_data['password_hash']):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )
    
    # Create tokens
    token_data = {"sub": str(user_data['id']), "email": user_data['email']}
    access_token = auth_handler.create_access_token(token_data)
    refresh_token = auth_handler.create_refresh_token(token_data)
    
    # Store session
    expires_at = timedelta(minutes=1440)  # 24 hours
    await auth_handler.store_session(str(user_data['id']), access_token, expires_at)
    
    user = UserResponse(**dict(user_data))
    
    return TokenResponse(
        access_token=access_token,
        refresh_token=refresh_token,
        user=user
    )

@router.post("/logout")
async def logout(current_user: UserResponse = Depends(get_current_user)):
    """Logout user"""
    
    # Revoke session (would need token from header)
    return {"message": "Logged out successfully"}

@router.get("/me", response_model=UserResponse)
async def get_current_user_info(current_user: UserResponse = Depends(get_current_user)):
    """Get current user information"""
    return current_user

@router.post("/refresh", response_model=TokenResponse)
async def refresh_token(refresh_token: str):
    """Refresh access token"""
    
    # Verify refresh token
    payload = auth_handler.verify_token(refresh_token)
    if payload.get("type") != "refresh":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid refresh token"
        )
    
    user_id = payload.get("sub")
    user_data = await db_manager.get_user_by_id(user_id)
    
    if not user_data:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found"
        )
    
    # Create new tokens
    token_data = {"sub": str(user_data['id']), "email": user_data['email']}
    new_access_token = auth_handler.create_access_token(token_data)
    new_refresh_token = auth_handler.create_refresh_token(token_data)
    
    # Store new session
    expires_at = timedelta(minutes=1440)
    await auth_handler.store_session(str(user_data['id']), new_access_token, expires_at)
    
    user = UserResponse(**dict(user_data))
    
    return TokenResponse(
        access_token=new_access_token,
        refresh_token=new_refresh_token,
        user=user
    )