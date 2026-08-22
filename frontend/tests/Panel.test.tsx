import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Panel } from "../src/components/Panel";
import type { PrixData } from "../src/types";

const prixData: PrixData[] = [
    { code_commune: "92002", prix_median_m2: 8532.4, nombre_ventes: 42 },
];

describe("Panel", () => {
    it("shows a loading spinner while data is loading", () => {
        const { container } = render(
            <Panel
                area={null}
                onFilterChange={() => {}}
                prixData={null}
                typeFilterValue={null}
                geoLoading={true}
                prixLoading={false}
            />,
        );
        expect(container.querySelector(".animate-spin")).toBeInTheDocument();
    });

    it("shows a placeholder when no area is selected", () => {
        render(
            <Panel
                area={null}
                onFilterChange={() => {}}
                prixData={prixData}
                typeFilterValue={null}
                geoLoading={false}
                prixLoading={false}
            />,
        );
        expect(screen.getByText(/Cliquez sur une commune/)).toBeInTheDocument();
    });

    it("shows the rounded price and sale count for the selected area", () => {
        render(
            <Panel
                area={{ code: "92002", nom: "Testville", prix: 8532 }}
                onFilterChange={() => {}}
                prixData={prixData}
                typeFilterValue={null}
                geoLoading={false}
                prixLoading={false}
            />,
        );
        expect(screen.getByText("Testville")).toBeInTheDocument();
        expect(
            screen.getByText(/Prix médian : 8532 €\/m²/),
        ).toBeInTheDocument();
        expect(screen.getByText(/Nombre de ventes : 42/)).toBeInTheDocument();
    });

    it("falls back to the placeholder if the selected area has no matching price data", () => {
        render(
            <Panel
                area={{ code: "unknown", nom: "Nowhere", prix: 0 }}
                onFilterChange={() => {}}
                prixData={prixData}
                typeFilterValue={null}
                geoLoading={false}
                prixLoading={false}
            />,
        );
        expect(screen.getByText(/Cliquez sur une commune/)).toBeInTheDocument();
    });
});
