from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import close_db, init_db
from app.models import PrixCommune
from app.queries import get_prix_communes
from app.config import settings


@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_db()
    yield
    await close_db()


app = FastAPI(lifespan=lifespan)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.cors_origin],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {"message": "Hello from backend"}


@app.get("/health")
def health():
    return {"status": "ok"}


@app.get("/communes", response_model=list[PrixCommune])
async def communes(type: str | None = None):
    rows = await get_prix_communes(type)
    return rows
