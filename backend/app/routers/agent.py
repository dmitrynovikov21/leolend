from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.database import get_db
from app.models.agent_settings import AgentSettings
from app.schemas.agent import AgentSettingsUpdate, AgentSettingsResponse

router = APIRouter()


async def get_or_create_settings(db: AsyncSession) -> AgentSettings:
    """Get singleton settings or create default if not exists."""
    result = await db.execute(select(AgentSettings).where(AgentSettings.id == "singleton"))
    settings = result.scalar_one_or_none()
    
    if not settings:
        settings = AgentSettings(id="singleton")
        db.add(settings)
        await db.commit()
        await db.refresh(settings)
    
    return settings


@router.get("/config", response_model=AgentSettingsResponse)
async def get_agent_config(db: AsyncSession = Depends(get_db)):
    """Get agent configuration."""
    settings = await get_or_create_settings(db)
    return settings


@router.patch("/config", response_model=AgentSettingsResponse)
async def update_agent_config(
    data: AgentSettingsUpdate, db: AsyncSession = Depends(get_db)
):
    """Update agent configuration."""
    settings = await get_or_create_settings(db)
    
    # Update fields
    update_data = data.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(settings, field, value)
    
    await db.commit()
    await db.refresh(settings)
    
    return settings
