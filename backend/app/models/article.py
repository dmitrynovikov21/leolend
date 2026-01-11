import enum
from datetime import datetime
from sqlalchemy import String, Text, Boolean, DateTime, Enum, JSON
from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base


class ArticleCategory(str, enum.Enum):
    GUIDE = "GUIDE"
    BLOG = "BLOG"
    CASE = "CASE"
    NEWS = "NEWS"


class ArticleStatus(str, enum.Enum):
    DRAFT = "DRAFT"
    PUBLISHED = "PUBLISHED"


class Article(Base):
    __tablename__ = "articles"

    id: Mapped[str] = mapped_column(String, primary_key=True)
    slug: Mapped[str] = mapped_column(String, unique=True, nullable=False)
    title: Mapped[str] = mapped_column(String, nullable=False)
    description: Mapped[str | None] = mapped_column(String, nullable=True)
    content_json: Mapped[dict | None] = mapped_column(JSON, nullable=True)
    category: Mapped[ArticleCategory] = mapped_column(
        Enum(ArticleCategory), default=ArticleCategory.BLOG
    )
    status: Mapped[ArticleStatus] = mapped_column(
        Enum(ArticleStatus), default=ArticleStatus.DRAFT
    )
    is_featured_on_home: Mapped[bool] = mapped_column(Boolean, default=False)
    cover_image_url: Mapped[str | None] = mapped_column(String, nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    updated_at: Mapped[datetime] = mapped_column(
        DateTime, default=datetime.utcnow, onupdate=datetime.utcnow
    )
