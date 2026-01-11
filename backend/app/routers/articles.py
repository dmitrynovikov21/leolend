import uuid
import re
from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func

from app.database import get_db
from app.models.article import Article, ArticleCategory, ArticleStatus
from app.schemas.article import (
    ArticleCreate,
    ArticleUpdate,
    ArticleResponse,
    ArticleListResponse,
)

router = APIRouter()

MAX_FEATURED_ARTICLES = 3


def generate_slug(title: str) -> str:
    """Generate URL-friendly slug from title."""
    slug = title.lower()
    slug = re.sub(r'[^\w\s-]', '', slug)
    slug = re.sub(r'[-\s]+', '-', slug).strip('-')
    return slug


@router.get("", response_model=ArticleListResponse)
async def list_articles(
    category: Optional[ArticleCategory] = None,
    status: Optional[ArticleStatus] = None,
    limit: int = Query(default=50, le=100),
    offset: int = 0,
    db: AsyncSession = Depends(get_db),
):
    """List all articles with optional filtering."""
    query = select(Article)
    
    if category:
        query = query.where(Article.category == category)
    if status:
        query = query.where(Article.status == status)
    
    query = query.order_by(Article.created_at.desc()).limit(limit).offset(offset)
    
    result = await db.execute(query)
    articles = result.scalars().all()
    
    # Get total count
    count_query = select(func.count(Article.id))
    if category:
        count_query = count_query.where(Article.category == category)
    if status:
        count_query = count_query.where(Article.status == status)
    
    count_result = await db.execute(count_query)
    total = count_result.scalar() or 0
    
    return ArticleListResponse(articles=articles, total=total)


@router.get("/featured", response_model=list[ArticleResponse])
async def get_featured_articles(db: AsyncSession = Depends(get_db)):
    """Get featured articles for landing page (max 3)."""
    query = (
        select(Article)
        .where(Article.is_featured_on_home == True)
        .where(Article.status == ArticleStatus.PUBLISHED)
        .order_by(Article.created_at.desc())
        .limit(MAX_FEATURED_ARTICLES)
    )
    result = await db.execute(query)
    return result.scalars().all()


@router.get("/{article_id}", response_model=ArticleResponse)
async def get_article(article_id: str, db: AsyncSession = Depends(get_db)):
    """Get single article by ID."""
    result = await db.execute(select(Article).where(Article.id == article_id))
    article = result.scalar_one_or_none()
    
    if not article:
        raise HTTPException(status_code=404, detail="Article not found")
    
    return article


@router.post("", response_model=ArticleResponse, status_code=201)
async def create_article(data: ArticleCreate, db: AsyncSession = Depends(get_db)):
    """Create a new article."""
    # Auto-generate slug if not provided
    slug = data.slug or generate_slug(data.title)
    
    # Check slug uniqueness
    existing = await db.execute(select(Article).where(Article.slug == slug))
    if existing.scalar_one_or_none():
        slug = f"{slug}-{uuid.uuid4().hex[:6]}"
    
    # Validate featured limit
    if data.is_featured_on_home:
        count_query = select(func.count(Article.id)).where(Article.is_featured_on_home == True)
        count_result = await db.execute(count_query)
        count = count_result.scalar() or 0
        
        if count >= MAX_FEATURED_ARTICLES:
            raise HTTPException(
                status_code=400,
                detail=f"Maximum {MAX_FEATURED_ARTICLES} featured articles allowed. Uncheck another article first."
            )
    
    article = Article(
        id=str(uuid.uuid4()),
        slug=slug,
        title=data.title,
        description=data.description,
        content_json=data.content_json,
        category=data.category,
        status=data.status,
        is_featured_on_home=data.is_featured_on_home,
        cover_image_url=data.cover_image_url,
    )
    
    db.add(article)
    await db.commit()
    await db.refresh(article)
    
    return article


@router.patch("/{article_id}", response_model=ArticleResponse)
async def update_article(
    article_id: str, data: ArticleUpdate, db: AsyncSession = Depends(get_db)
):
    """Update an existing article."""
    result = await db.execute(select(Article).where(Article.id == article_id))
    article = result.scalar_one_or_none()
    
    if not article:
        raise HTTPException(status_code=404, detail="Article not found")
    
    # Validate featured limit if enabling
    if data.is_featured_on_home is True and not article.is_featured_on_home:
        count_query = select(func.count(Article.id)).where(Article.is_featured_on_home == True)
        count_result = await db.execute(count_query)
        count = count_result.scalar() or 0
        
        if count >= MAX_FEATURED_ARTICLES:
            raise HTTPException(
                status_code=400,
                detail=f"Maximum {MAX_FEATURED_ARTICLES} featured articles allowed. Uncheck another article first."
            )
    
    # Update fields
    update_data = data.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(article, field, value)
    
    await db.commit()
    await db.refresh(article)
    
    return article


@router.delete("/{article_id}", status_code=204)
async def delete_article(article_id: str, db: AsyncSession = Depends(get_db)):
    """Delete an article."""
    result = await db.execute(select(Article).where(Article.id == article_id))
    article = result.scalar_one_or_none()
    
    if not article:
        raise HTTPException(status_code=404, detail="Article not found")
    
    await db.delete(article)
    await db.commit()
