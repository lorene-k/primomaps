import { describe, it, expect } from "vitest";
import { getColor, getPrixCommunes } from "../src/components/Map";
import type { PrixData } from "../src/types";

describe("getColor", () => {
    it("returns grey for undefined", () => {
        expect(getColor(undefined)).toBe("#cccccc");
    });

    it("uses strict > at each threshold", () => {
        expect(getColor(12000)).toBe("#BD0026");
        expect(getColor(9000)).toBe("#E31A1C");
        expect(getColor(7000)).toBe("#FC4E2A");
        expect(getColor(5000)).toBe("#FD8D3C");
    });
});

describe("getPrixCommunes", () => {
    it("returns an empty object for null input", () => {
        expect(getPrixCommunes(null)).toEqual({});
    });

    it("returns an empty object for an empty array", () => {
        expect(getPrixCommunes([])).toEqual({});
    });

    it("maps code_commune to prix_median_m2 for each row", () => {
        const prixData: PrixData[] = [
            { code_commune: "92002", prix_median_m2: 8500, nombre_ventes: 12 },
            { code_commune: "92004", prix_median_m2: 11200, nombre_ventes: 5 },
        ];
        expect(getPrixCommunes(prixData)).toEqual({
            "92002": 8500,
            "92004": 11200,
        });
    });
});
