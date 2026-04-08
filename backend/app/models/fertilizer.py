import uuid
from sqlalchemy import Column, String, Numeric, Enum, ForeignKey, Integer, DateTime, func
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.orm import relationship
from app.db.session import Base
import enum

class UnitEnum(enum.Enum):
    kg = "kg"
    liter = "liter"

class Fertilizer(Base):
    __tablename__ = "fertilizers"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String, nullable=False)
    type = Column(String, nullable=False)
    n_percent = Column(Numeric(5, 2), nullable=False, default=0)
    p_percent = Column(Numeric(5, 2), nullable=False, default=0)
    k_percent = Column(Numeric(5, 2), nullable=False, default=0)
    micronutrients = Column(JSONB, nullable=True)
    unit = Column(Enum(UnitEnum), nullable=False)

    price_history = relationship("PriceHistory", back_populates="fertilizer")

class PriceHistory(Base):
    __tablename__ = "price_history"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    fertilizer_id = Column(UUID(as_uuid=True), ForeignKey("fertilizers.id"), nullable=False)
    price_vnd = Column(Integer, nullable=False)
    effective_date = Column(DateTime(timezone=True), server_default=func.now())

    fertilizer = relationship("Fertilizer", back_populates="price_history")
