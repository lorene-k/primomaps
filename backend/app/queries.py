from app.database import get_pool


async def get_prix_communes(type_local: str | None = None):
    pool = get_pool()
    async with pool.acquire() as conn:
        rows = await conn.fetch(
            """
            SELECT code_commune, PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY valeur_fonciere / surface_reelle_bati) AS prix_median_m2,
            COUNT(*) AS nombre_ventes
            FROM transactions
            WHERE type_local IN ('Maison', 'Appartement')
                AND ($1::text IS NULL OR type_local = $1)
                AND nature_mutation = 'Vente'
                AND surface_reelle_bati > 0
                AND valeur_fonciere / surface_reelle_bati BETWEEN 1000 AND 25000
            GROUP BY code_commune;
        """,
            type_local,
        )
    return [dict(row) for row in rows]
