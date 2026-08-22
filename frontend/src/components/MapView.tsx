import { useState } from "react";
import type { FeatureCollection } from "geojson";
import { Map } from "./Map.tsx";
import { Panel } from "./Panel.tsx";
import { useFetch } from "../hooks/useFetch.ts";
import { MapLegend } from "./MapLegend.tsx";
import type { Area, PrixData } from "../types.ts";

export function MapView() {
    const [selectedArea, setSelectedArea] = useState<Area | null>(null);
    const [typeFilter, setTypeFilter] = useState<string | null>(null);

    const url = import.meta.env.VITE_API_URL;
    const queryUrl = typeFilter
        ? `${url}communes?type=${typeFilter}`
        : `${url}communes`;
    const {
        data: prixData,
        loading: prixLoading,
        error: prixError,
    } = useFetch<PrixData[] | null>(queryUrl);
    const {
        data: geoData,
        loading: geoLoading,
        error: geoError,
    } = useFetch<FeatureCollection>("/communes-92.geojson");

    if (geoError || prixError)
        return <div>Erreur : {geoError || prixError}</div>;

    return (
        <div className="flex min-h-0 flex-1 flex-col gap-4 lg:flex-row">
            <aside className="w-full shrink-0 lg:w-1/3 lg:max-w-sm">
                <Panel
                    area={selectedArea}
                    prixData={prixData}
                    onFilterChange={setTypeFilter}
                    typeFilterValue={typeFilter}
                    geoLoading={geoLoading}
                    prixLoading={prixLoading}
                />
            </aside>

            <main className="flex flex-1 flex-col gap-4">
                <div className="overflow-hidden rounded-md lg:h-full">
                    <Map
                        onAreaClick={setSelectedArea}
                        selectedArea={selectedArea}
                        typeFilter={typeFilter}
                        prixData={prixData}
                        geoData={geoData}
                    />
                </div>
                <MapLegend />
            </main>
        </div>
    );
}
