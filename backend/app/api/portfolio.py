import uuid
from fastapi import APIRouter, HTTPException

from app.schemas import (
    GeneratePortfolioRequest,
    GeneratePortfolioResponse,
    AdjustPortfolioRequest,
    PortfolioResponse,
)
from app.services.portfolio_engine import generate_sample_allocations, generate_summary

router = APIRouter()

PORTFOLIOS: dict[str, PortfolioResponse] = {}


@router.post("/generate", response_model=GeneratePortfolioResponse)
async def generate_portfolio(payload: GeneratePortfolioRequest):
    portfolio_id = str(uuid.uuid4())
    allocations = generate_sample_allocations(payload.budget)
    summary = generate_summary()

    response = PortfolioResponse(
        portfolio_id=portfolio_id,
        allocations=allocations,
        summary=summary,
    )
    PORTFOLIOS[portfolio_id] = response
    return GeneratePortfolioResponse(
        portfolio_id=portfolio_id,
        allocations=allocations,
        summary=summary,
    )


@router.get("/{portfolio_id}", response_model=PortfolioResponse)
async def get_portfolio(portfolio_id: str):
    portfolio = PORTFOLIOS.get(portfolio_id)
    if not portfolio:
        raise HTTPException(status_code=404, detail="Portfolio not found")
    return portfolio


@router.patch("/{portfolio_id}/adjust", response_model=PortfolioResponse)
async def adjust_portfolio(portfolio_id: str, payload: AdjustPortfolioRequest):
    portfolio = PORTFOLIOS.get(portfolio_id)
    if not portfolio:
        raise HTTPException(status_code=404, detail="Portfolio not found")

    updated = {item.symbol: item.new_pct for item in payload.allocations}
    adjusted_allocations = []
    for allocation in portfolio.allocations:
        pct = updated.get(allocation.symbol, allocation.allocation_pct)
        adjusted_allocations.append(
            allocation.model_copy(update={"allocation_pct": pct})
        )

    new_portfolio = portfolio.model_copy(update={"allocations": adjusted_allocations})
    PORTFOLIOS[portfolio_id] = new_portfolio
    return new_portfolio


@router.post("/{portfolio_id}/save", response_model=PortfolioResponse)
async def save_portfolio(portfolio_id: str):
    portfolio = PORTFOLIOS.get(portfolio_id)
    if not portfolio:
        raise HTTPException(status_code=404, detail="Portfolio not found")
    return portfolio
