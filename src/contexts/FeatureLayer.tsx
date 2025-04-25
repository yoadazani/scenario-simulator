import { useParentLayer } from "@/features/Map/hooks/useParentLayer";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import FeatureReductionCluster from "@arcgis/core/layers/support/FeatureReductionCluster";
import FeatureReductionSelection from "@arcgis/core/layers/support/FeatureReductionSelection";
import {
  ReactNode,
  useRef,
  createContext,
  useEffect,
  useContext,
  RefObject,
} from "react";
import SimpleMarkerSymbol from "@arcgis/core/symbols/SimpleMarkerSymbol";
import Graphic from "@arcgis/core/Graphic";
import PictureMarkerSymbol from "@arcgis/core/symbols/PictureMarkerSymbol";
import { labelSymbol, markerSymbol } from "@/features/Map/constants/symbols";
import TextSymbol from "@arcgis/core/symbols/TextSymbol";

interface FeatureChildProps {
  featureLayer: RefObject<{
    addFeatures: Set<Graphic>;
    updateFeatures: Set<Graphic>;
    deleteFeatures: Set<Graphic>;
  }>;
}

export const featureLayerContext = createContext<FeatureChildProps | null>(null);

const FeaturesLayer = ({
  children,
  visible = true,
  title = null,
  id,
  order,
  isCluster = false,
}: {
  children?: ReactNode;
  visible?: boolean;
  title?: string | null;
  id?: string;
  order?: number;
  isCluster?: boolean;
}) => {
  const parentLayer = useParentLayer();
  const featureLayer = useRef({
    addFeatures: new Set<Graphic>(),
    updateFeatures: new Set<Graphic>(),
    deleteFeatures: new Set<Graphic>(),
  });
  const featureReducationCluster = useRef<FeatureReductionCluster>(
    new FeatureReductionCluster({
      clusterRadius: 100,
      clusterMinSize: 24,
      clusterMaxSize: 24,
      labelingInfo: [
        {
          deconflictionStrategy: "none",
          labelExpressionInfo: {
            expression: "$feature.cluster_count",
          },
          labelPlacement: "center-center",
          symbol: new TextSymbol({
            ...labelSymbol,
            color: "white",
            haloColor: "white",
          }),
        },
      ],
      symbol: new SimpleMarkerSymbol({
        color: [255, 0, 0, 0.8],
        size: 24,
        outline: {
          color: [255, 0, 0, 0.8],
          width: 0.5,
        },
      }),
    })
  )

  const featureReducationSelection = useRef<FeatureReductionSelection>(
    new FeatureReductionSelection()
  )

  const featuresLayer = useRef(
    new FeatureLayer({
      id,
      title,
      source: [],
      fields: [
        { name: "id", type: "oid" },
        { name: "name", type: "string" },
      ],
      objectIdField: "id",
      geometryType: "point",
      outFields: ["*"],
      spatialReference: { wkid: 4326 },
      popupTemplate: { title: "name" },
      labelingInfo: [
        {
          labelExpressionInfo: {
            expression: "$feature.name",
          },
          labelPlacement: "below-center",
          minScale: 10000,
          symbol: new TextSymbol(labelSymbol),
        },
      ],
      renderer: {
        type: "simple",
        symbol: new PictureMarkerSymbol(markerSymbol),
      },
    })
  );

  useEffect(() => {
    if (isCluster) {
      featuresLayer.current.featureReduction = featureReducationCluster.current;
    } else {
      featuresLayer.current.featureReduction = featureReducationSelection.current;
    }
  }, [isCluster]);

  useEffect(() => {
    if (order) {
      parentLayer.reorder(featuresLayer.current, order);
    }
  }, [order]);

  useEffect(() => {
    featuresLayer.current.visible = visible;
  }, [visible]);

  useEffect(() => {
    parentLayer.add(featuresLayer.current);
    const interval = setInterval(() => {
      featuresLayer.current.applyEdits({
        addFeatures: [...featureLayer.current.addFeatures],
        updateFeatures: [...featureLayer.current.updateFeatures],
        deleteFeatures: [...featureLayer.current.deleteFeatures],
      });
      featureLayer.current = {
        addFeatures: new Set<Graphic>(),
        updateFeatures: new Set<Graphic>(),
        deleteFeatures: new Set<Graphic>(),
      };
    }, 100);

    return () => {
      parentLayer.remove(featuresLayer.current);
      clearInterval(interval);
    };
  }, [featuresLayer.current.id]);

  return (
    <featureLayerContext.Provider
      value={{ featureLayer }}
    >
      {children}
    </featureLayerContext.Provider>
  );
};

export default FeaturesLayer;

export const useFeatureLayer = () => {
  const featureLayer = useContext(featureLayerContext);
  if (!featureLayer)
    throw new Error("useFeatureLayer must be used within a FeatureLayer");
  return {
    add: (graphic: Graphic) => {
      featureLayer.featureLayer.current.addFeatures.add(graphic);
    },
    update: (graphic: Graphic) => {
      featureLayer.featureLayer.current.updateFeatures.add(graphic);
    },
    delete: (graphic: Graphic) => {
      featureLayer.featureLayer.current.deleteFeatures.add(graphic);
    },
  };
};
