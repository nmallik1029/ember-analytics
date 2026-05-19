from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.portfolio import router as portfolio_router
from app.api.sectors import router as sectors_router
from app.api.instruments import router as instruments_router

app = FastAPI(title="Portfolio Builder API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(portfolio_router, prefix="/api/portfolio", tags=["portfolio"])
app.include_router(sectors_router, prefix="/api", tags=["sectors"])
app.include_router(instruments_router, prefix="/api", tags=["instruments"])


@app.get("/health")
async def health_check():
    return {"status": "ok"}
