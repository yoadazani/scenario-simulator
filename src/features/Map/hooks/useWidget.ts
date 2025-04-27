import {useEffect, useRef} from "react";
import {useMap} from "@/features/Map/contexts/MapContainer";
import {Position} from "@/features/Map/types";

export const useWidget = (
    position: Position,
) => {
    const {mapView} = useMap();
    const elementRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const {current: map} = mapView;
        const {current: element} = elementRef;
        if (element) {
            mapView.current.ui.add(element, position);
            return () => map.ui.remove(element);
        }
    }, [mapView, position]);

    return {elementRef};
};
