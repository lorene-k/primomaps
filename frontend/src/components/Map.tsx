import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet'
import { useFetch } from '../hooks/useFetch'

function getColor(prix: number | undefined): string {
    if (prix === undefined) return '#cccccc'  // gris = pas de données
    if (prix > 12000) return '#800026'
    if (prix > 9000) return '#BD0026'
    if (prix > 7000) return '#E31A1C'
    if (prix > 5000) return '#FC4E2A'
    return '#FD8D3C'
}

function getPrixCommunes(prixData: any) {
    const prixCommunes: Record<string, number> = {}
    if (prixData) {
        for (const row of prixData) {
            prixCommunes[row.code_commune] = row.prix_median_m2
        }
    }
    return prixCommunes
}

function setAreaStyle(feature: any, prixCommunes: Record<string, number>, selectedArea: any) {
    const code = feature.properties.code
    const prix = prixCommunes[code]
    const isSelected = selectedArea && selectedArea.code === code
    return {
        fillColor: getColor(prix),
        fillOpacity: selectedArea ? (isSelected ? 0.9 : 0.5) : 0.7,
        color: 'white',
        weight: 1,
    }
}

export function Map({ onAreaClick, selectedArea, typeFilter, prixData, geoData }: {
    onAreaClick: (area: any) => void;
    selectedArea: any;
    typeFilter: string | null;
    prixData: any;
    geoData: GeoJSON.FeatureCollection | null;
}) {

    const prixCommunes = getPrixCommunes(prixData)

    function onEachArea(feature: any, layer: any) {
        layer.on({
            click: () => {
                const code = feature.properties.code
                const nom = feature.properties.nom
                const prix = prixCommunes[code]
                onAreaClick({ code, nom, prix })
            },
            mouseover: () => layer.setStyle({ weight: 3, color: '#fff' }),
            mouseout: () => layer.setStyle({ weight: 1 }),
        })
    }

    return (
        <MapContainer
            center={[48.82, 2.24]}
            zoom={12}
            style={{ height: '100vh', width: '100%' }}
            minZoom={11}
            maxBounds={[[48.70, 2.10], [49.00, 2.40]]}
            maxBoundsViscosity={1.0}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {geoData && <GeoJSON
                key={`${typeFilter ?? 'all'}-${selectedArea ? selectedArea.code : 'none'}`}
                data={geoData}
                style={(feature) => setAreaStyle(feature, prixCommunes, selectedArea)}
                onEachFeature={onEachArea}
            />}
        </MapContainer>
    )
}
