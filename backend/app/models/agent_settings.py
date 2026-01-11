from datetime import datetime
from sqlalchemy import String, Text, Float, Integer, Boolean, DateTime, JSON
from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base


class AgentSettings(Base):
    __tablename__ = "agent_settings"

    id: Mapped[str] = mapped_column(String, primary_key=True, default="singleton")
    system_instruction: Mapped[str | None] = mapped_column(Text, nullable=True)
    model_id: Mapped[str] = mapped_column(String, default="claude-sonnet-4-5-20250929")
    temperature: Mapped[float] = mapped_column(Float, default=0.7)
    max_tokens: Mapped[int] = mapped_column(Integer, default=4096)
    rag_files: Mapped[list] = mapped_column(JSON, default=list)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)
    updated_at: Mapped[datetime] = mapped_column(
        DateTime, default=datetime.utcnow, onupdate=datetime.utcnow
    )
