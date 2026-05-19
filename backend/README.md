# Portfolio Builder API

Educational sample API for the Portfolio Builder Platform.

## Run locally

```bash
python -m venv .venv
.venv\\Scripts\\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

## Endpoints

- `POST /api/portfolio/generate`
- `GET /api/portfolio/{id}`
- `PATCH /api/portfolio/{id}/adjust`
- `POST /api/portfolio/{id}/save`
- `GET /api/sectors`
- `GET /api/instruments/search?q=`
