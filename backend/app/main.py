from fastapi import FastAPI
from contextlib import asynccontextmanager
from app.database import init_db, close_db
from app.queries import get_prix_communes
from app.models import PrixCommune
from fastapi.middleware.cors import CORSMiddleware
import os


origins = os.getenv("CORS_ORIGIN")


@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_db()
    yield
    await close_db()


app = FastAPI(lifespan=lifespan)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[origins],
    allow_methods=["*"],
    allow_headers=["*"],
)


# @app.get('/')
# def root():
#     return {"message": "Hello from backend!"}

@app.get("/health")
def health():
    return {"status": "ok"}


@app.get('/communes', response_model=list[PrixCommune])
async def communes(type: str | None = None):
    rows = await get_prix_communes(type)
    return rows