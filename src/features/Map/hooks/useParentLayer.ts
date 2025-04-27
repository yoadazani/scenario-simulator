import { useContext } from "react";
import { useMap } from "@/features/Map/contexts/MapContainer";
import { groupLayerContext } from "@/features/Map/contexts/GroupLayer";

export const useParentLayer = () => {
  const layer = useContext(groupLayerContext);
  const { mapView } = useMap();
  if (layer) return layer.groupLayer;
  if (mapView) return mapView.current.map;
  throw new Error("useParentLayer must be used within a groupLayerContext or mapView context");
};
