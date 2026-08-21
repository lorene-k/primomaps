from pydantic import BaseModel


class PrixCommune(BaseModel):
    code_commune: str
    prix_median_m2: float
    nombre_ventes: int