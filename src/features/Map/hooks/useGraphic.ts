import { useEffect, useRef } from "react";
import Graphic from "@arcgis/core/Graphic";
import { useLayer } from "./useLayer";

export const useGraphic = (properties: __esri.GraphicProperties) => {
  const layer = useLayer();
  const graphicRef = useRef(new Graphic(properties));

  useEffect(() => {
    layer.add(graphicRef.current);
    return () => {
      layer.remove(graphicRef.current);
    };
  }, [layer]);

  return graphicRef;
};
