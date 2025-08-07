"""
JWT Authentication Handler for ODOREMOVER Audio Suite
"""
import os
from datetime import datetime, timedelta
from typing import Optional, Dict, Any
import uuid
from passlib.context import CryptContext
from jose import JWTError, jwt
from fastapi import HTTPException, status, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

from ..shared.database import db_manager, UserResponse

# Configuration
SECRET_KEY = os.getenv("JWT_SECRET_KEY", "your-secret-key-change-in-production")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 1440  # 24 hours
REFRESH_TOKEN_EXPIRE_DAYS = 30

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Bearer token scheme
security = HTTPBearer()

class AuthHandler:
    def __init__(self):
        self.pwd_context = pwd_context
        
    def hash_password(self, password: str) -> str:
        """Hash a password"""
        return self.pwd_context.hash(password)
    
    def verify_password(self, plain_password: str, hashed_password: str) -> bool:
        """Verify a password against its hash"""
        return self.pwd_context.verify(plain_password, hashed_password)
    
    def create_access_token(self, data: Dict[Any, Any], expires_delta: Optional[timedelta] = None) -> str:
        """Create JWT access token"""
        to_encode = data.copy()
        
        if expires_delta:
            expire = datetime.utcnow() + expires_delta
        else:
            expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
            
        to_encode.update({"exp": expire, "type": "access"})
        encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
        return encoded_jwt
    
    def create_refresh_token(self, data: Dict[Any, Any]) -> str:
        """Create JWT refresh token"""
        to_encode = data.copy()
        expire = datetime.utcnow() + timedelta(days=REFRESH_TOKEN_EXPIRE_DAYS)
        to_encode.update({"exp": expire, "type": "refresh"})
        encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
        return encoded_jwt
    
    def verify_token(self, token: str) -> Dict[Any, Any]:
        """Verify and decode JWT token"""
        try:
            payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
            return payload
        except JWTError:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid token",
                headers={"WWW-Authenticate": "Bearer"},
            )
    
    async def store_session(self, user_id: str, token: str, expires_at: datetime):
        """Store user session in database"""
        if not db_manager.pool:
            return
        async with db_manager.pool.acquire() as conn:
            token_hash = self.hash_password(token)
            await conn.execute('''
                INSERT INTO user_sessions (user_id, token_hash, expires_at)
                VALUES ($1, $2, $3)
            ''', uuid.UUID(user_id), token_hash, expires_at)
    
    async def revoke_session(self, user_id: str, token: str):
        """Revoke user session"""
        if not db_manager.pool:
            return
        async with db_manager.pool.acquire() as conn:
            token_hash = self.hash_password(token)
            await conn.execute('''
                UPDATE user_sessions 
                SET is_active = FALSE 
                WHERE user_id = $1 AND token_hash = $2
            ''', uuid.UUID(user_id), token_hash)
    
    async def is_session_active(self, user_id: str, token: str) -> bool:
        """Check if session is active"""
        if not db_manager.pool:
            return False
        async with db_manager.pool.acquire() as conn:
            token_hash = self.hash_password(token)
            row = await conn.fetchrow('''
                SELECT is_active, expires_at 
                FROM user_sessions 
                WHERE user_id = $1 AND token_hash = $2
            ''', uuid.UUID(user_id), token_hash)
            
            if not row or not row['is_active']:
                return False
                
            return row['expires_at'] > datetime.utcnow()

# Global auth handler instance
auth_handler = AuthHandler()

async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)) -> UserResponse:
    """Get current authenticated user"""
    token = credentials.credentials
    payload = auth_handler.verify_token(token)
    
    user_id = payload.get("sub")
    token_type = payload.get("type")
    
    if not user_id or token_type != "access":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token type",
        )
    
    # Check if session is active
    if not await auth_handler.is_session_active(user_id, token):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Session expired",
        )
    
    # Get user from database
    user_data = await db_manager.get_user_by_id(user_id)
    if not user_data:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found",
        )
    
    return UserResponse(**dict(user_data))

async def get_optional_user(credentials: Optional[HTTPAuthorizationCredentials] = Depends(security)) -> Optional[UserResponse]:
    """Get current user if authenticated, otherwise None"""
    if not credentials:
        return None
    
    try:
        return await get_current_user(credentials)
    except HTTPException:
        return None