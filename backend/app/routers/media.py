import uuid
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.database import get_db
from app.models.media import MediaLibrary
from app.schemas.media import MediaGenerateRequest, MediaGenerateResponse, MediaItem
from app.config import get_settings

router = APIRouter()


@router.post("/generate", response_model=MediaGenerateResponse)
async def generate_images(
    request: MediaGenerateRequest, db: AsyncSession = Depends(get_db)
):
    """
    Generate images using Gemini AI.
    
    Note: This is a placeholder implementation.
    Full Gemini integration will be added when API key is provided.
    """
    settings = get_settings()
    
    if not settings.gemini_api_key:
        # Return placeholder response when no API key
        placeholder_images = []
        for i in range(3):
            media = MediaLibrary(
                id=str(uuid.uuid4()),
                url=f"https://placehold.co/800x600/0077FF/ffffff?text=AI+Image+{i+1}",
                prompt_used=request.prompt,
            )
            db.add(media)
            placeholder_images.append(media)
        
        await db.commit()
        
        return MediaGenerateResponse(
            images=[MediaItem.model_validate(img) for img in placeholder_images],
            message="Placeholder images generated. Add GEMINI_API_KEY for real AI generation."
        )
    
    # TODO: Implement actual Gemini image generation
    # import google.generativeai as genai
    # genai.configure(api_key=settings.gemini_api_key)
    # ...
    
    raise HTTPException(
        status_code=501,
        detail="Gemini integration not yet implemented. API key is set."
    )


@router.get("", response_model=list[MediaItem])
async def list_media(
    limit: int = 50, offset: int = 0, db: AsyncSession = Depends(get_db)
):
    """List all media items from library."""
    query = (
        select(MediaLibrary)
        .order_by(MediaLibrary.created_at.desc())
        .limit(limit)
        .offset(offset)
    )
    result = await db.execute(query)
    return result.scalars().all()


@router.delete("/{media_id}", status_code=204)
async def delete_media(media_id: str, db: AsyncSession = Depends(get_db)):
    """Delete a media item."""
    result = await db.execute(select(MediaLibrary).where(MediaLibrary.id == media_id))
    media = result.scalar_one_or_none()
    
    if not media:
        raise HTTPException(status_code=404, detail="Media not found")
    
    await db.delete(media)
    await db.commit()
