from decimal import Decimal
from app.schemas.calculator import CalculatorRequest, CalculatorResponse

def calculate_mix(request: CalculatorRequest) -> CalculatorResponse:
    total_mass = Decimal(0)
    total_n_mass = Decimal(0)
    total_p_mass = Decimal(0)
    total_k_mass = Decimal(0)
    total_cost = 0

    for ingredient in request.ingredients:
        qty = ingredient.quantity
        total_mass += qty
        total_n_mass += qty * (ingredient.n_percent / Decimal(100))
        total_p_mass += qty * (ingredient.p_percent / Decimal(100))
        total_k_mass += qty * (ingredient.k_percent / Decimal(100))
        total_cost += int(qty * ingredient.current_price_vnd)

    if total_mass == Decimal(0):
        return CalculatorResponse(
            total_mass=Decimal(0),
            final_n_percent=Decimal(0),
            final_p_percent=Decimal(0),
            final_k_percent=Decimal(0),
            total_cost_vnd=0
        )

    return CalculatorResponse(
        total_mass=total_mass,
        final_n_percent=(total_n_mass / total_mass) * Decimal(100),
        final_p_percent=(total_p_mass / total_mass) * Decimal(100),
        final_k_percent=(total_k_mass / total_mass) * Decimal(100),
        total_cost_vnd=total_cost
    )
