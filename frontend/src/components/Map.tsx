import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import { ZoomToArea } from "./ZoomToArea.tsx";
import type { FeatureCollection, Feature } from "geojson";
import type { Area } from "../types.ts";
import type { PrixData } from "../types.ts";
import { getPrixCommunes, getColor } from "../utils.ts";

function setAreaStyle(
    feature: Feature | undefined,
    prixCommunes: Record<string, number>,
    selectedArea: Area | null,
) {
    const code = feature?.properties?.code;
    const prix = prixCommunes[code];
    const isSelected = selectedArea && selectedArea.code === code;
    return {
        fillColor: getColor(prix),
        fillOpacity: selectedArea ? (isSelected ? 0.9 : 0.5) : 0.7,
        color: "white",
        weight: isSelected ? 3 : 1,
    };
}

export function Map({
    onAreaClick,
    selectedArea,
    typeFilter,
    prixData,
    geoData,
}: {
    onAreaClick: (area: Area) => void;
    selectedArea: Area | null;
    typeFilter: string | null;
    prixData: PrixData[] | null;
    geoData: FeatureCollection | null;
}) {
    const prixCommunes = getPrixCommunes(prixData);

    function onEachArea(feature: Feature, layer: L.Layer) {
        layer.on({
            click: () => {
                const code = feature.properties?.code;
                const nom = feature.properties?.nom;
                const prix = prixCommunes[code];
                onAreaClick({ code, nom, prix });
            },
            mouseover: () =>
                (layer as L.Path).setStyle({ weight: 3, color: "#fff" }),
            mouseout: () => (layer as L.Path).setStyle({ weight: 1 }),
        });
    }

    return (
        <MapContainer
            center={[48.82, 2.24]}
            zoom={12}
            style={{ height: "100vh", width: "100%" }}
            minZoom={11}
            maxBounds={[
                [48.7, 2.1],
                [49.0, 2.4],
            ]}
            maxBoundsViscosity={1.0}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {geoData && (
                <GeoJSON
                    key={`${typeFilter ?? "all"}-${selectedArea ? selectedArea.code : "none"}`}
                    data={geoData}
                    style={(feature) =>
                        setAreaStyle(feature, prixCommunes, selectedArea)
                    }
                    onEachFeature={onEachArea}
                />
            )}

            <ZoomToArea selectedArea={selectedArea} geoData={geoData} />
        </MapContainer>
    );
}
