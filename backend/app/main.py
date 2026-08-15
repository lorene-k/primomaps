from fastapi import FastAPI
from contextlib import asynccontextmanager
from app.database import init_db, close_db
from app.queries import get_prix_communes
from app.models import PrixCommune

@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_db()
    yield
    await close_db()


app = FastAPI(lifespan=lifespan)


@app.get('/')
def root():
    return {"message": "Hello from backend!"}


@app.get('/communes')
async def communes():
    rows = await get_prix_communes()
    return rows