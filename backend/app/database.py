import asyncpg
from dotenv import load_dotenv

from app.config import settings

load_dotenv()

db_url = settings.supabase_url
_pool = None


def get_pool():
    return _pool


async def init_db():
    global _pool
    if db_url is None:
        raise RuntimeError("SUPABASE_URL manquant dans le .env")
    _pool = await asyncpg.create_pool(dsn=db_url)


async def close_db():
    if _pool:
        await _pool.close()
