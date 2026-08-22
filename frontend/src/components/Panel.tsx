import { LoaderCircle } from "lucide-react";
import { Filter } from "./Filter";
import type { Area, PrixData } from "../types";

export function Panel({
    area,
    onFilterChange,
    prixData,
    typeFilterValue,
    geoLoading,
    prixLoading,
}: {
    area: Area | null;
    onFilterChange: (type: string | null) => void;
    prixData: PrixData[] | null;
    typeFilterValue: string | null;
    geoLoading: boolean;
    prixLoading: boolean;
}) {
    const infoArea = area
        ? prixData?.find((item: PrixData) => item.code_commune === area.code)
        : null;

    return (
        <div>
            <Filter onFilterChange={onFilterChange} value={typeFilterValue} />
            {prixLoading || geoLoading ? (
                <div className="mt-10 flex justify-center">
                    <LoaderCircle className="animate-spin text-slate-400" />
                </div>
            ) : !infoArea || !area ? (
                <p className="text-slate-400 flex flex-col mt-10">
                    Cliquez sur une commune pour voir les infos →
                </p>
            ) : (
                <div className="mt-5 p-4 rounded-md shadow-md h-full border border-slate-400">
                    <h2 className="text-xl font-bold">{area.nom}</h2>
                    <p className="font-light mb-3">{area.code}</p>
                    <p>
                        Prix médian : {Math.round(infoArea.prix_median_m2)} €/m²
                    </p>
                    <p>Nombre de ventes : {infoArea.nombre_ventes}</p>
                </div>
            )}
        </div>
    );
}
