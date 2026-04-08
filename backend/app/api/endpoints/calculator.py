from fastapi import APIRouter
from app.schemas.calculator import CalculatorRequest, CalculatorResponse
from app.core.calculator import calculate_mix

router = APIRouter()

@router.post("/", response_model=CalculatorResponse)
def calculate(request: CalculatorRequest):
    return calculate_mix(request)
