import { Minus, Plus } from "lucide-react";
import { useMap } from "@/features/Map/contexts/MapContainer";
import { useWidget } from "@/features/Map/hooks/useWidget";
import { Position } from "@/features/Map/types";
import { useCallback } from "react";

function MapZoom({ position }: { position?: Position }) {
  const { mapView } = useMap();

  const { elementRef } = useWidget(position ?? "top-left");

  const increment = useCallback(
    () => mapView.current.goTo(mapView.current.extent.expand(0.5)),
    [mapView]
  );
  const decrement = useCallback(
    () => mapView.current.goTo(mapView.current.extent.expand(2)),
    [mapView]
  );

  return (
    <div ref={elementRef} className="zoom">
      <Plus onClick={increment} className="zoom-in" />
      <Minus onClick={decrement} className="zoom-out" />
    </div>
  );
}

export default MapZoom;
