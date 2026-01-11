from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import articles, agent, media

app = FastAPI(
    title="LeoAgent Admin API",
    description="Backend API for Admin Panel",
    version="1.0.0"
)

# CORS for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://leo-platform-chi.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(articles.router, prefix="/api/articles", tags=["Articles"])
app.include_router(agent.router, prefix="/api/agent", tags=["Agent"])
app.include_router(media.router, prefix="/api/media", tags=["Media"])


@app.get("/")
async def root():
    return {"message": "LeoAgent Admin API", "status": "running"}


@app.get("/health")
async def health():
    return {"status": "healthy"}
