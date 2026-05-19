from fastapi import APIRouter, Query

router = APIRouter()

INSTRUMENTS = [
    {"symbol": "VTI", "name": "Vanguard Total Stock Market ETF"},
    {"symbol": "VXUS", "name": "Vanguard Total International Stock ETF"},
    {"symbol": "BND", "name": "Vanguard Total Bond Market ETF"},
    {"symbol": "VNQ", "name": "Vanguard Real Estate ETF"},
    {"symbol": "AAPL", "name": "Apple Inc."},
]


@router.get("/instruments/search")
async def search_instruments(q: str = Query("", min_length=0)):
    query = q.strip().lower()
    if not query:
        return {"results": []}
    results = [
        instrument
        for instrument in INSTRUMENTS
        if query in instrument["symbol"].lower()
        or query in instrument["name"].lower()
    ]
    return {"results": results}
