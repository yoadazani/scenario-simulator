import { useEffect } from "react";
import { ellipse } from "@turf/turf";
import SimpleFillSymbol from "@arcgis/core/symbols/SimpleFillSymbol";
import Polygon from "@arcgis/core/geometry/Polygon";
import { useGraphic } from "@/features/Map/hooks/useGraphic";

interface EllipseProps {
  center: {
    latitude: number;
    longitude: number;
  };
  attributes: {
    id: number;
    name?: string;
  };
  xaxsis: number;
  yaxsis: number;
  rotation?: number;
  symbol: __esri.SimpleFillSymbolProperties;
}

function MapEllipse(props: EllipseProps) {
const { center, xaxsis, yaxsis, rotation, symbol } = props;

  const graphicRef = useGraphic({});

  useEffect(() => {
    const ellipseGeometry = ellipse([center.longitude, center.latitude], xaxsis, yaxsis, {
      angle: rotation,
    }).geometry.coordinates[0];

    graphicRef.current.geometry = new Polygon({
      rings: [ellipseGeometry],
    });
    graphicRef.current.symbol = new SimpleFillSymbol(symbol);
    graphicRef.current.attributes = props.attributes;
  }, [center, xaxsis, yaxsis, rotation]);

  return null;
}

export default MapEllipse;
