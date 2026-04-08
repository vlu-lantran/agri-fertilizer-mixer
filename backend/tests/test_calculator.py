from decimal import Decimal
from app.schemas.calculator import CalculatorRequest, CalculatorIngredient
from app.core.calculator import calculate_mix
import uuid

def test_calculate_mix_basic():
    request = CalculatorRequest(ingredients=[
        CalculatorIngredient(
            fertilizer_id=uuid.uuid4(),
            quantity=Decimal("50"),
            n_percent=Decimal("46"),
            p_percent=Decimal("0"),
            k_percent=Decimal("0"),
            current_price_vnd=15000
        ),
        CalculatorIngredient(
            fertilizer_id=uuid.uuid4(),
            quantity=Decimal("50"),
            n_percent=Decimal("0"),
            p_percent=Decimal("0"),
            k_percent=Decimal("60"),
            current_price_vnd=20000
        )
    ])
    
    response = calculate_mix(request)
    
    assert response.total_mass == Decimal("100")
    assert response.final_n_percent == Decimal("23")  # (50 * 46%) / 100 = 23%
    assert response.final_p_percent == Decimal("0")
    assert response.final_k_percent == Decimal("30")  # (50 * 60%) / 100 = 30%
    assert response.total_cost_vnd == (50 * 15000) + (50 * 20000)
