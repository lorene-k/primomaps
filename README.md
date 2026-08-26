# Primomaps

An interactive map showing the median real-estate price per square meter by commune in Hauts-de-Seine, built from official French property-transaction data (DVF).

→ [Live demo](https://primomaps.vercel.app/)

## Tech Stack

| Layer | Tech |
|---|---|
| Frontend | React 19, TypeScript, Vite, Tailwind CSS, shadcn/base-ui, Leaflet |
| Backend | FastAPI, Python 3.12, asyncpg, slowapi |
| Database | Supabase (Postgres) |

## Key features

- **Commune price map**: choropleth map of Hauts-de-Seine communes shaded by median price per square meter, computed from the DVF transaction data
- **Property type filter**: switch between Appartement, Maison, or all property types to recompute median prices per commune
- **Outlier filtering**: the backend excludes sales with a price per square meter outside a plausible range (1000–25000 €) before computing medians, so extreme outliers don't skew the map
- **Rate-limited API**: the FastAPI backend limits requests via slowapi to keep the public API usable

## Prerequisites

- Node.js and npm
- Python 3.12 and [uv](https://docs.astral.sh/uv/)
- A Supabase project (Postgres database)

## Installation

```bash
make install
```

This runs `npm install` in `frontend/` and `uv sync --frozen` in `backend/`.

### Database

Apply the Supabase migrations in `supabase/` to create the `transactions` table, then load the DVF dataset:

```bash
cd data
python load_dvf.py
```

This cleans `92.csv` and bulk-loads it into the `transactions` table.

## Configuration

**`backend/.env`**

```env
SUPABASE_URL=your-supabase-project-url
CORS_ORIGIN=http://localhost:5173
```

**`frontend/.env`**

```env
VITE_API_URL=http://localhost:8000
```

## Usage

```bash
make dev
```

Runs the frontend (Vite dev server) and backend (`fastapi dev`) concurrently.

Other useful targets: `make test`, `make format`, `make lint-check`, `make check`.
