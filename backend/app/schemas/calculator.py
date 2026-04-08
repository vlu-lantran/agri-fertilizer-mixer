from pydantic import BaseModel
from typing import List
from uuid import UUID
from decimal import Decimal

class CalculatorIngredient(BaseModel):
    fertilizer_id: UUID
    quantity: Decimal
    n_percent: Decimal
    p_percent: Decimal
    k_percent: Decimal
    current_price_vnd: int

class CalculatorRequest(BaseModel):
    ingredients: List[CalculatorIngredient]

class CalculatorResponse(BaseModel):
    total_mass: Decimal
    final_n_percent: Decimal
    final_p_percent: Decimal
    final_k_percent: Decimal
    total_cost_vnd: int
