import { useGraphic } from "@/features/Map/hooks/useGraphic";
import { useEffect } from "react";
import SimpleFillSymbol from "@arcgis/core/symbols/SimpleFillSymbol";
import Polygon from "@arcgis/core/geometry/Polygon";
import { METERS_PER_DEGREE } from "@/features/Map/constants";

interface RectangleProps {
  center: { latitude: number; longitude: number };
  attributes: { id: number; name?: string };
  radius: number;
  rotation?: number;
  symbol: __esri.SimpleFillSymbolProperties;
}

const MapRectangle = ({ center, radius, rotation = 0, attributes, symbol }: RectangleProps) => {
  const graphicRef = useGraphic({});

  useEffect(() => {
    const radiusDegrees = radius / METERS_PER_DEGREE;
    
    const { longitude, latitude } = center;

    const bottomLeft = [longitude - radiusDegrees, latitude - radiusDegrees];
    const bottomRight = [longitude + radiusDegrees, latitude - radiusDegrees];
    const topRight = [longitude + radiusDegrees, latitude + radiusDegrees];
    const topLeft = [longitude - radiusDegrees, latitude + radiusDegrees];
    
    let corners = [bottomLeft, bottomRight, topRight, topLeft];

    if (rotation) {
      const rad = (rotation * Math.PI) / 180;
      corners = corners.map(([x, y]) => {
        const dx = x - longitude;
        const dy = y - latitude;
        return [
          longitude + (dx * Math.cos(rad) - dy * Math.sin(rad)),
          latitude + (dx * Math.sin(rad) + dy * Math.cos(rad))
        ];
      });
    }
    
    graphicRef.current.geometry = new Polygon({ rings: [corners.concat([corners[0]])] });
    graphicRef.current.symbol = new SimpleFillSymbol(symbol);
    graphicRef.current.attributes = attributes;
  }, [center.latitude, center.longitude, radius, rotation]);

  return null;
};

export default MapRectangle;