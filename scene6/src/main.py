from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.endpoints import contributor
from .database import Base, engine

app = FastAPI(
    title="MozDest Backend",
    description="FastAPI + Postgres + Cloudinary",
    version="0.1.0",
)
origins = [
    "http://localhost:5500",
    "http://localhost:3000",  # if you might use React
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],      # or ["*"] for testing
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Create tables on startup (use Alembic in prod)
@app.on_event("startup")
def on_startup():
    Base.metadata.create_all(bind=engine)

app.include_router(contributor.router)

@app.get("/")
def root():
    return {"message": "MozDest API – see /docs for Swagger"}