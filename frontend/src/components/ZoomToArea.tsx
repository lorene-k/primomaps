import L from "leaflet";
import { useMap } from "react-leaflet";
import { useEffect } from "react";
import type { Area } from "../types";
import type { FeatureCollection, Feature } from "geojson";

export function ZoomToArea({
    selectedArea,
    geoData,
}: {
    selectedArea: Area | null;
    geoData: FeatureCollection | null;
}) {
    const map = useMap();

    useEffect(() => {
        if (!selectedArea || !geoData) return;
        const feature = geoData.features.find(
            (f: Feature) => f.properties?.code === selectedArea.code,
        );
        if (feature) {
            const layer = L.geoJSON(feature);
            // map.invalidateSize()
            map.flyToBounds(layer.getBounds(), {
                // paddingBottomRight: [0, 30]
            });
        }
    }, [selectedArea, geoData, map]);
    return null;
}
