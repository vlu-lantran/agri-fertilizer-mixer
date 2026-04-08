from pydantic import BaseModel, ConfigDict
from typing import List, Optional
from uuid import UUID
from datetime import datetime
from decimal import Decimal

class FormulaIngredientCreate(BaseModel):
    fertilizer_id: UUID
    quantity: Decimal

class FormulaCreate(BaseModel):
    name: str
    target_crop: Optional[str] = None
    growth_stage: Optional[str] = None
    soil_type: Optional[str] = None
    area: Optional[Decimal] = None
    ingredients: List[FormulaIngredientCreate]

class FormulaIngredientResponse(BaseModel):
    id: UUID
    fertilizer_id: UUID
    quantity: Decimal
    locked_price_vnd: int
    model_config = ConfigDict(from_attributes=True)

class FormulaResponse(BaseModel):
    id: UUID
    user_id: UUID
    name: str
    target_crop: Optional[str]
    growth_stage: Optional[str]
    soil_type: Optional[str]
    area: Optional[Decimal]
    created_at: datetime
    ingredients: List[FormulaIngredientResponse]
    model_config = ConfigDict(from_attributes=True)
