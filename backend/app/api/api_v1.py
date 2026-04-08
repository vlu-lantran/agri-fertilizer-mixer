from fastapi import APIRouter
from app.api.endpoints import calculator, fertilizers, auth, formulas

api_router = APIRouter()
api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(calculator.router, prefix="/calculate", tags=["calculator"])
api_router.include_router(fertilizers.router, prefix="/fertilizers", tags=["fertilizers"])
api_router.include_router(formulas.router, prefix="/formulas", tags=["formulas"])
