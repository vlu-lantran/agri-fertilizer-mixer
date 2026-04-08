from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import List
from app.db.session import get_db
from app.models.fertilizer import Fertilizer
from app.schemas.fertilizer import FertilizerResponse, FertilizerCreate

router = APIRouter()

@router.get("/", response_model=List[FertilizerResponse])
async def read_fertilizers(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Fertilizer))
    return result.scalars().all()

@router.post("/", response_model=FertilizerResponse)
async def create_fertilizer(fertilizer: FertilizerCreate, db: AsyncSession = Depends(get_db)):
    db_fertilizer = Fertilizer(**fertilizer.model_dump())
    db.add(db_fertilizer)
    await db.commit()
    await db.refresh(db_fertilizer)
    return db_fertilizer
