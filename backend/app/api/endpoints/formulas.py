from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.orm import selectinload
from typing import List
from uuid import UUID

from app.db.session import get_db
from app.models.formula import Formula, FormulaIngredient
from app.models.fertilizer import PriceHistory
from app.models.user import User
from app.schemas.formula import FormulaCreate, FormulaResponse
from app.api.deps import get_current_user

router = APIRouter()

@router.post("/", response_model=FormulaResponse)
async def create_formula(
    formula_in: FormulaCreate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    db_formula = Formula(
        user_id=current_user.id,
        name=formula_in.name,
        target_crop=formula_in.target_crop,
        growth_stage=formula_in.growth_stage,
        soil_type=formula_in.soil_type,
        area=formula_in.area
    )
    db.add(db_formula)
    await db.flush()

    for ingredient in formula_in.ingredients:
        price_query = select(PriceHistory).where(
            PriceHistory.fertilizer_id == ingredient.fertilizer_id
        ).order_by(PriceHistory.effective_date.desc())
        
        price_result = await db.execute(price_query)
        latest_price = price_result.scalars().first()
        
        if not latest_price:
            raise HTTPException(status_code=400, detail=f"No price history found for fertilizer {ingredient.fertilizer_id}")

        db_ingredient = FormulaIngredient(
            formula_id=db_formula.id,
            fertilizer_id=ingredient.fertilizer_id,
            quantity=ingredient.quantity,
            locked_price_vnd=latest_price.price_vnd
        )
        db.add(db_ingredient)

    await db.commit()
    
    query = select(Formula).options(selectinload(Formula.ingredients)).where(Formula.id == db_formula.id)
    result = await db.execute(query)
    return result.scalars().first()

@router.get("/", response_model=List[FormulaResponse])
async def read_formulas(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    query = select(Formula).options(selectinload(Formula.ingredients)).where(Formula.user_id == current_user.id)
    result = await db.execute(query)
    return result.scalars().all()

@router.get("/{formula_id}", response_model=FormulaResponse)
async def read_formula(
    formula_id: UUID,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    query = select(Formula).options(selectinload(Formula.ingredients)).where(
        Formula.id == formula_id,
        Formula.user_id == current_user.id
    )
    result = await db.execute(query)
    formula = result.scalars().first()
    if not formula:
        raise HTTPException(status_code=404, detail="Formula not found")
    return formula
