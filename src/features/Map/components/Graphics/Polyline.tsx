import { useEffect } from "react";
import Polyline from "@arcgis/core/geometry/Polyline";
import SimpleLineSymbol from "@arcgis/core/symbols/SimpleLineSymbol";
import { useGraphic } from "@/features/Map/hooks/useGraphic";

interface PolylineProps {
  paths: number[][];
  symbol: __esri.SimpleLineSymbolProperties;
}

function MapPolyline(props: PolylineProps) {
  const { paths, symbol } = props;

  const graphicRef = useGraphic({});

  useEffect(() => {
    graphicRef.current.geometry = new Polyline({
      paths: [paths],
    });

    graphicRef.current.symbol = new SimpleLineSymbol(symbol);
  }, [paths, symbol]);

  return null;
}

export default MapPolyline;
