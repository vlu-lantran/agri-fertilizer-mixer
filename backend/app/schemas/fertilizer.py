from pydantic import BaseModel, ConfigDict
from uuid import UUID
from decimal import Decimal
from typing import Optional, Dict

class FertilizerBase(BaseModel):
    name: str
    type: str
    n_percent: Decimal
    p_percent: Decimal
    k_percent: Decimal
    micronutrients: Optional[Dict] = None
    unit: str

class FertilizerCreate(FertilizerBase):
    pass

class FertilizerResponse(FertilizerBase):
    id: UUID
    model_config = ConfigDict(from_attributes=True)
