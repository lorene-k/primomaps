import { useState } from 'react'
import { Map } from './Map.tsx'
import { Panel } from './Panel.tsx'
import { useFetch } from '../hooks/useFetch.ts'
import { MapLegend } from './MapLegend.tsx'

export function MapView() {
    const [selectedArea, setSelectedArea] = useState<any>(null)
    const [typeFilter, setTypeFilter] = useState<string | null>(null)

    const url = import.meta.env.VITE_API_URL
    const queryUrl = typeFilter
        ? `${url}/communes?type=${typeFilter}`
        : `${url}/communes`
    const { data: prixData, loading: prixLoading, error: prixError } = useFetch<any>(queryUrl)
    const { data: geoData, loading: geoLoading, error: geoError } = useFetch<GeoJSON.FeatureCollection>('/communes-92.geojson')

    // if (geoLoading || prixLoading) return <div>Chargement...</div>
    if (geoError || prixError) return <div>Erreur : {geoError || prixError}</div>

    return (
        <div className="flex-1 flex flex-col lg:flex-row gap-4 min-h-0">
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

            <main className="flex flex-col flex-1 gap-4">
                <div className="lg:h-full rounded-md overflow-hidden">
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
    )
}