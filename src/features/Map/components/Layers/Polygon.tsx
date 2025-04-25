import { useEffect } from "react";
import Polygon from "@arcgis/core/geometry/Polygon";
import SimpleFillSymbol from "@arcgis/core/symbols/SimpleFillSymbol";
import { useGraphic } from "@/features/Map/hooks/useGraphic";
import TextSymbol from "@arcgis/core/symbols/TextSymbol";

interface PolygonProps {
  rings: number[][];
  label?: string;
  symbol: __esri.SimpleFillSymbolProperties;
  labelSymbol?: __esri.TextSymbolProperties;
  attributes: {
    id: number;
    name?: string;
  };
}

function MapPolygon(props: PolygonProps) {
  const { rings, symbol, label, labelSymbol, attributes } = props;
  const graphicRef = useGraphic({});
  const labelGraphicRef = useGraphic({});

  useEffect(() => {
    const polygonGeometry = new Polygon({
      rings: [rings],
    });

    graphicRef.current.geometry = polygonGeometry;
    graphicRef.current.symbol = new SimpleFillSymbol(symbol);
    graphicRef.current.attributes = attributes;

    if (label) {
      const centroid = polygonGeometry.centroid;
      const textSymbol = new TextSymbol({
        text: label,
        ...(labelSymbol ?? {
          font: {
            size: 12,
            family: "Arial",
            weight: "normal",
            style: "normal",
          },
          color: [0, 0, 0, 255],
        }),
      });

      labelGraphicRef.current.geometry = centroid;
      labelGraphicRef.current.symbol = textSymbol;
    }
  }, [rings]);

  return null;
}

export default MapPolygon;
