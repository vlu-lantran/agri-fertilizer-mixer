import uuid
from sqlalchemy import Column, String, Numeric, ForeignKey, Integer, DateTime, func
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from app.db.session import Base

class Formula(Base):
    __tablename__ = "formulas"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    name = Column(String, nullable=False)
    target_crop = Column(String, nullable=True)
    growth_stage = Column(String, nullable=True)
    soil_type = Column(String, nullable=True)
    area = Column(Numeric(10, 2), nullable=True)  # Store total area in square meters
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    ingredients = relationship("FormulaIngredient", back_populates="formula")

class FormulaIngredient(Base):
    __tablename__ = "formula_ingredients"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    formula_id = Column(UUID(as_uuid=True), ForeignKey("formulas.id"), nullable=False)
    fertilizer_id = Column(UUID(as_uuid=True), ForeignKey("fertilizers.id"), nullable=False)
    quantity = Column(Numeric(10, 2), nullable=False)
    locked_price_vnd = Column(Integer, nullable=False)

    formula = relationship("Formula", back_populates="ingredients")
