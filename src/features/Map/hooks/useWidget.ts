import { useEffect, useRef } from "react";
import { useMap } from "@/contexts/MapContainer";
import { Position } from "@/features/Map/types";

export const useWidget = (
  position: Position,
) => {
  const { mapView } = useMap();
  const elementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = elementRef.current;
    if (el) {
      mapView.current.ui.add(el, position);
      return () => mapView.current.ui.remove(el);
    }
  },[]);

  return { elementRef };
};
