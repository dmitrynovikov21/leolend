from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field


class AgentSettingsBase(BaseModel):
    system_instruction: Optional[str] = None
    model_id: str = "claude-sonnet-4-5-20250929"
    temperature: float = Field(default=0.7, ge=0.0, le=1.0)
    max_tokens: int = Field(default=4096, ge=1, le=100000)
    rag_files: list[str] = []
    is_active: bool = True


class AgentSettingsUpdate(BaseModel):
    system_instruction: Optional[str] = None
    model_id: Optional[str] = None
    temperature: Optional[float] = Field(default=None, ge=0.0, le=1.0)
    max_tokens: Optional[int] = Field(default=None, ge=1, le=100000)
    rag_files: Optional[list[str]] = None
    is_active: Optional[bool] = None


class AgentSettingsResponse(AgentSettingsBase):
    id: str
    updated_at: datetime

    class Config:
        from_attributes = True
