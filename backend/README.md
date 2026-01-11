# Backend - LeoAgent Admin API

FastAPI backend for Admin Panel.

## Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

## Run
```bash
uvicorn main:app --reload --port 8000
```

## Environment Variables
Copy `.env.example` to `.env` and fill in:
- `DATABASE_URL` - PostgreSQL connection string
- `GEMINI_API_KEY` - Google Gemini API key (for image generation)
