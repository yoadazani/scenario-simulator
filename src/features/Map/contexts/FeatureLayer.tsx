import {useParentLayer} from "@/features/Map/hooks/useParentLayer.ts";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import FeatureReductionCluster from "@arcgis/core/layers/support/FeatureReductionCluster";
import FeatureReductionSelection from "@arcgis/core/layers/support/FeatureReductionSelection";
import {createContext, ReactNode, RefObject, useEffect, useRef,} from "react";
import SimpleMarkerSymbol from "@arcgis/core/symbols/SimpleMarkerSymbol";
import Graphic from "@arcgis/core/Graphic";
import PictureMarkerSymbol from "@arcgis/core/symbols/PictureMarkerSymbol";
import {labelSymbol, markerSymbol} from "@/features/Map/constants/symbols.ts";
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
  const featureReductionCluster = useRef<FeatureReductionCluster>(
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

  const featureReductionSelection = useRef<FeatureReductionSelection>(
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
      featuresLayer.current.featureReduction = featureReductionCluster.current;
    } else {
      featuresLayer.current.featureReduction = featureReductionSelection.current;
    }
  }, [isCluster]);

  useEffect(() => {
    if (order) {
      parentLayer.reorder(featuresLayer.current, order);
    }
  }, [order, parentLayer]);

  useEffect(() => {
    featuresLayer.current.visible = visible;
  }, [visible]);

  useEffect(() => {
    const { current: layer } = featuresLayer;

    parentLayer.add(layer);

    const interval = setInterval(async () => {

      await layer.applyEdits({
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
      parentLayer.remove(layer);
      clearInterval(interval);
    };
  }, [featuresLayer.current.id, parentLayer]);

  return (
    <featureLayerContext.Provider
      value={{ featureLayer }}
    >
      {children}
    </featureLayerContext.Provider>
  );
};

export default FeaturesLayer;