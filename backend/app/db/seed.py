import asyncio
import sys
import os
from decimal import Decimal

sys.path.insert(0, os.path.realpath(os.path.join(os.path.dirname(__file__), '../..')))

from app.db.session import AsyncSessionLocal
from app.models.fertilizer import Fertilizer, PriceHistory, UnitEnum

INITIAL_DATA = [
    {
        "name": "Urê (Urea) Phú Mỹ", "type": "Single", "n_percent": 46, "p_percent": 0, "k_percent": 0, "price": 12600
    },
    {
        "name": "DAP Hồng Hà (Trung Quốc)", "type": "Compound", "n_percent": 18, "p_percent": 46, "k_percent": 0, "price": 25600
    },
    {
        "name": "Kali (MOP) Cà Mau", "type": "Single", "n_percent": 0, "p_percent": 0, "k_percent": 60, "price": 10400
    },
    {
        "name": "Super Lân Lâm Thao", "type": "Single", "n_percent": 0, "p_percent": 16, "k_percent": 0, "price": 5000
    },
    {
        "name": "NPK 20-20-15 Đầu Trâu", "type": "Blend", "n_percent": 20, "p_percent": 20, "k_percent": 15, "price": 19600
    },
    {
        "name": "NPK 16-16-8 Việt Nhật", "type": "Blend", "n_percent": 16, "p_percent": 16, "k_percent": 8, "price": 16000
    }
]

async def seed_data():
    async with AsyncSessionLocal() as db:
        for item in INITIAL_DATA:
            fert = Fertilizer(
                name=item["name"],
                type=item["type"],
                n_percent=Decimal(str(item["n_percent"])),
                p_percent=Decimal(str(item["p_percent"])),
                k_percent=Decimal(str(item["k_percent"])),
                unit=UnitEnum.kg
            )
            db.add(fert)
            await db.flush() # flush to get the generated id
            
            price = PriceHistory(
                fertilizer_id=fert.id,
                price_vnd=item["price"]
            )
            db.add(price)
        await db.commit()
        print("Database seeded with initial fertilizers and their VND prices.")

if __name__ == "__main__":
    asyncio.run(seed_data())
