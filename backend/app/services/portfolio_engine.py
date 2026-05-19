from typing import List
from app.schemas import Allocation, PortfolioSummary


def generate_sample_allocations(budget: float) -> List[Allocation]:
    mix = [
        ("VTI", "US Equity", 0.45),
        ("VXUS", "International Equity", 0.20),
        ("BND", "Bond", 0.25),
        ("VNQ", "REIT", 0.05),
        ("CASH", "Cash", 0.05),
    ]
    allocations: List[Allocation] = []
    for symbol, asset_class, pct in mix:
        allocations.append(
            Allocation(
                symbol=symbol,
                name=symbol,
                asset_class=asset_class,
                allocation_pct=round(pct * 100, 2),
                dollar_amount=round(budget * pct, 2),
            )
        )
    return allocations


def generate_summary() -> PortfolioSummary:
    return PortfolioSummary(
        risk_band="moderate",
        notes=["Educational example only", "No execution"]
    )
