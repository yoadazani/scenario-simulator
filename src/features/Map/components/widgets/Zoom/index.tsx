import { Minus, Plus } from "lucide-react";
import { useMap } from "@/features/Map/contexts/MapContainer";
import { useWidget } from "@/features/Map/hooks/useWidget";
import { Position } from "@/features/Map/types";
import {useRef} from "react";
import ZoomViewModel from "@arcgis/core/widgets/Zoom/ZoomViewModel";

function MapZoom({ position }: { position?: Position }) {
  const { mapView } = useMap();
  const zoomViewModel = useRef(new ZoomViewModel({
    view: mapView.current
  }))
  const { elementRef } = useWidget(position ?? "top-left");

  return (
    <div ref={elementRef} className="zoom">
      <Plus onClick={() => zoomViewModel.current.zoomIn()} className="zoom-in" />
      <Minus onClick={() => zoomViewModel.current.zoomOut()} className="zoom-out" />
    </div>
  );
}

export default MapZoom;
