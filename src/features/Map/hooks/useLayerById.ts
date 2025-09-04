import {useMap} from "@/features/Map/contexts/MapContainer";
import {useMemo} from "react";

export const useLayerById = (layerId: string) => {
    const {mapView} = useMap();
    return useMemo(() => {
        if (!mapView.current?.map) return undefined;
        return mapView.current.map.findLayerById(layerId)
    }, [layerId, mapView.current?.map?.layers.length])
}
