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

function styleCommune(feature: any, prixCommunes: Record<string, number>) {
    const code = feature.properties.code
    const prix = prixCommunes[code]
    return {
        fillColor: getColor(prix),
        fillOpacity: 0.7,
        color: 'white',
        weight: 1,
    }
}

export function Map() {
    const { data: geoData, loading, error } = useFetch<GeoJSON.FeatureCollection>('/communes-92.geojson')
    const { data: prixData, loading: prixLoading, error: prixError } = useFetch<any>('http://localhost:8000/communes')

    if (loading || prixLoading) return <div>Chargement de la carte...</div>
    if (error || prixError) return <div>Erreur : {error || prixError}</div>

    const prixCommunes = getPrixCommunes(prixData)

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
                key={prixData ? 'loaded' : 'loading'}
                data={geoData} style={(feature) => styleCommune(feature, prixCommunes)} />}
        </MapContainer>
    )
}