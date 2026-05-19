from fastapi import APIRouter

router = APIRouter()

SECTORS = [
    {"id": "tech", "label": "Tech"},
    {"id": "healthcare", "label": "Healthcare"},
    {"id": "energy", "label": "Energy"},
    {"id": "financial", "label": "Financial"},
    {"id": "consumer", "label": "Consumer"},
    {"id": "industrial", "label": "Industrial"},
    {"id": "realestate", "label": "Real Estate"},
    {"id": "telecom", "label": "Telecom"},
    {"id": "esg", "label": "ESG"},
]


@router.get("/sectors")
async def list_sectors():
    return {"sectors": SECTORS}
