import { useGraphic } from "@/features/Map/hooks/useGraphic";
import { useEffect } from "react";
import Circle from "@arcgis/core/geometry/Circle";
import SimpleFillSymbol from "@arcgis/core/symbols/SimpleFillSymbol";
import Polygon from "@arcgis/core/geometry/Polygon";
import Point from "@arcgis/core/geometry/Point";

interface CircleProps {
    center: {
      latitude: number;
      longitude: number;
    };
    attributes: {
      id: number;
      name?: string;
    };
    radius: number;
    symbol: __esri.SimpleFillSymbolProperties;
  }
  

const MapCircle = (props: CircleProps) => {
  const { center, radius, attributes, symbol } = props;
  const graphicRef = useGraphic({});

  useEffect(() => {
    const circleGeometry = new Circle({
      center: new Point(center),
      radius,
    }).rings[0]

    graphicRef.current.geometry = new Polygon({
      rings: [circleGeometry],
    });
    graphicRef.current.symbol = new SimpleFillSymbol(symbol);
    graphicRef.current.attributes = attributes;
  },[center.latitude, center.longitude, radius]);
  return null;
};

export default MapCircle;
