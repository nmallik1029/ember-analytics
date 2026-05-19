from typing import List, Optional
from pydantic import BaseModel, Field


class HoldingInput(BaseModel):
    symbol: str
    shares: float
    cost_basis: Optional[float] = None


class GeneratePortfolioRequest(BaseModel):
    budget: float = Field(gt=0)
    experience_level: Optional[str] = None
    risk_tolerance: int = Field(ge=1, le=10)
    time_horizon: Optional[str] = None
    sectors: List[str] = []
    preferences: List[str] = []
    exclusions: List[str] = []
    existing_holdings: List[HoldingInput] = []


class Allocation(BaseModel):
    symbol: str
    name: Optional[str] = None
    asset_class: Optional[str] = None
    allocation_pct: float
    dollar_amount: float
    is_existing_holding: bool = False
    action: Optional[str] = None


class PortfolioSummary(BaseModel):
    risk_band: Optional[str] = None
    notes: List[str] = []


class GeneratePortfolioResponse(BaseModel):
    portfolio_id: str
    allocations: List[Allocation]
    summary: PortfolioSummary


class AllocationAdjustment(BaseModel):
    symbol: str
    new_pct: float


class AdjustPortfolioRequest(BaseModel):
    allocations: List[AllocationAdjustment]


class PortfolioResponse(BaseModel):
    portfolio_id: str
    allocations: List[Allocation]
    summary: PortfolioSummary
