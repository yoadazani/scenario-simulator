import { createContext, ReactNode, RefObject, useContext, useEffect, useRef } from "react";
import Basemap from "@arcgis/core/Basemap";
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import VectorTileLayer from "@arcgis/core/layers/VectorTileLayer";

const mapUrl = import.meta.env.VITE_VECTOR_MAP_URL;

export interface MapChildProps {
  mapView: RefObject<MapView>;
}

export const MapContext = createContext<MapChildProps | null>(null);

function MapContainer({ children }: { children?: ReactNode }) {
  const mapEleRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef(
    new Map({
      basemap: new Basemap({
        title: "Base Map",
        baseLayers: [new VectorTileLayer({ url: mapUrl })],
      }),
    })
  );

  const viewRef = useRef(
    new MapView({
      map: mapRef.current,
      center: [34.93408203124999, 
        31.6209716796875],
      zoom: 7,
      constraints: {
        rotationEnabled: true,
        minZoom: 7,
        maxZoom: 20,
      },
      ui: {
        components: [],
      },
    })
  );

  useEffect(() => {
    viewRef.current.container = mapEleRef.current;
  }, [mapEleRef.current]);

  return (
    <MapContext.Provider value={{ mapView: viewRef }}>
      <div style={{ height: "100vh" }} className="map" ref={mapEleRef}>
        {children}
      </div>
    </MapContext.Provider>
  );
}

export const useMap = () => {
  const map = useContext(MapContext);
  if (!map?.mapView)
    throw new Error("useMap must be used within a MapContainer");
  return map;
};

export default MapContainer;
