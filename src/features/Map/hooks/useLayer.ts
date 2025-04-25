import { featureLayerContext } from "@/contexts/FeatureLayer";
import { graphicsLayerContext } from "@/contexts/GraphicLayer";
import Graphic from "@arcgis/core/Graphic";
import { useContext } from "react";

export const useLayer = () => {
  const graphicsLayer = useContext(graphicsLayerContext);
  const featureLayer = useContext(featureLayerContext);

  if (featureLayer) {
    return {
      add: (graphic: Graphic) => {
        featureLayer.featureLayer.current.addFeatures.add(graphic);
      },
      update: (graphic: Graphic) => {
        featureLayer.featureLayer.current.updateFeatures.add(graphic);
      },
      remove: (graphic: Graphic) => {
        featureLayer.featureLayer.current.deleteFeatures.add(graphic);
      },
    };
  }
  if (graphicsLayer) return graphicsLayer.graphicsLayer;
  throw new Error(
    "useLayer must be used within a graphicsLayerContext or featureLayerContext"
  );
};
