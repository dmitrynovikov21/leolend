from datetime import datetime
from typing import Optional
from pydantic import BaseModel


class MediaGenerateRequest(BaseModel):
    prompt: str


class MediaItem(BaseModel):
    id: str
    url: str
    prompt_used: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True


class MediaGenerateResponse(BaseModel):
    images: list[MediaItem]
    message: str
