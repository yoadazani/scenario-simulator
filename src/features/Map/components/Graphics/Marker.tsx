import { useEffect } from "react";
import Point from "@arcgis/core/geometry/Point";
import PictureMarkerSymbol from "@arcgis/core/symbols/PictureMarkerSymbol";
import { useGraphic } from "@/features/Map/hooks/useGraphic";

export interface MarkerProps {
  point: {
    latitude: number;
    longitude: number;
  };
  attributes: {
    id: number;
    name?: string;
  };
  symbol?: __esri.PictureMarkerSymbolProperties;
  width?: string;
  height?: string;
}

function MapMarker(props: MarkerProps) {
  const {
    point,
    attributes,
    symbol,
    width = "30px",
    height = "30px",
  } = props;
  const graphic = useGraphic({ attributes });

  useEffect(() => {
    graphic.current.geometry = new Point(point);
    graphic.current.symbol = new PictureMarkerSymbol(symbol);
  }, [symbol, point, width, height]);
  return null;
}

export default MapMarker;
