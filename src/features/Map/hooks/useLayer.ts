import { featureLayerContext } from "@/features/Map/contexts/FeatureLayer";
import { graphicsLayerContext } from "@/features/Map/contexts/GraphicLayer";
import Graphic from "@arcgis/core/Graphic";
import { useContext } from "react";

export const useLayer = () => {
  const graphicsLayer = useContext(graphicsLayerContext);
  const featuresLayer = useContext(featureLayerContext);

  if (featuresLayer) {
    return {
      add: (graphic: Graphic) => {
        featuresLayer.featureLayer.current.addFeatures.add(graphic);
      },
      update: (graphic: Graphic) => {
        featuresLayer.featureLayer.current.updateFeatures.add(graphic);
      },
      remove: (graphic: Graphic) => {
        featuresLayer.featureLayer.current.deleteFeatures.add(graphic);
      },
    };
  }
  if (graphicsLayer) return graphicsLayer.graphicsLayer;
  throw new Error(
    "useLayer must be used within a graphicsLayerContext or featureLayerContext"
  );
};
