import type { PrixData } from "./types.ts";

export function getColor(prix: number | undefined): string {
    if (prix === undefined) return "#cccccc"; // gris = pas de données
    if (prix > 12000) return "#800026";
    if (prix > 9000) return "#BD0026";
    if (prix > 7000) return "#E31A1C";
    if (prix > 5000) return "#FC4E2A";
    return "#FD8D3C";
}

export function getPrixCommunes(
    prixData: PrixData[] | null,
): Record<string, number> {
    const prixCommunes: Record<string, number> = {};
    if (prixData) {
        for (const row of prixData) {
            prixCommunes[row.code_commune] = row.prix_median_m2;
        }
    }
    return prixCommunes;
}
