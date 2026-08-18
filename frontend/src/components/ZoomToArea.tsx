import { useMap } from 'react-leaflet'
import { useEffect } from 'react'
import L from 'leaflet'

export function ZoomToArea({ selectedArea, geoData }: {
    selectedArea: any;
    geoData: any;
}) {
    const map = useMap()

    useEffect(() => {
        if (!selectedArea || !geoData) return
        const feature = geoData.features.find(
            (f: any) => f.properties.code === selectedArea.code)
        if (feature) {
            const layer = L.geoJSON(feature)
            // map.invalidateSize()
            map.flyToBounds(layer.getBounds(), {
                // paddingBottomRight: [0, 30]
            })
        }
    }, [selectedArea, geoData, map])
    return null
}