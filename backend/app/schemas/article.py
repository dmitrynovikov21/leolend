from datetime import datetime
from typing import Optional, Any
from pydantic import BaseModel, Field
from enum import Enum


class ArticleCategory(str, Enum):
    GUIDE = "GUIDE"
    BLOG = "BLOG"
    CASE = "CASE"
    NEWS = "NEWS"


class ArticleStatus(str, Enum):
    DRAFT = "DRAFT"
    PUBLISHED = "PUBLISHED"


class ArticleBase(BaseModel):
    title: str
    description: Optional[str] = None
    content_json: Optional[dict[str, Any]] = None
    category: ArticleCategory = ArticleCategory.BLOG
    status: ArticleStatus = ArticleStatus.DRAFT
    is_featured_on_home: bool = False
    cover_image_url: Optional[str] = None


class ArticleCreate(ArticleBase):
    slug: Optional[str] = None  # Auto-generate if not provided


class ArticleUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    content_json: Optional[dict[str, Any]] = None
    category: Optional[ArticleCategory] = None
    status: Optional[ArticleStatus] = None
    is_featured_on_home: Optional[bool] = None
    cover_image_url: Optional[str] = None
    slug: Optional[str] = None


class ArticleResponse(ArticleBase):
    id: str
    slug: str
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class ArticleListResponse(BaseModel):
    articles: list[ArticleResponse]
    total: int
