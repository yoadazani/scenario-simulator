import { FeatureLayer, GraphicLayer, layerName } from "@/features/Map/types/map.type.ts";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export type MapState = {
  layers: {
    districts: GraphicLayer;
    subdistricts: GraphicLayer;
    ellipses: GraphicLayer;
    events: FeatureLayer;
  };
};

type MapActions = {
  setVisibility: (layer: layerName, visible: boolean) => void;
  setOrder: (layer: layerName, order: number) => void;
  setCluster: (layer: layerName, isCluster: boolean) => void;
};

type MapStore = MapState & MapActions;

export const useMapStore = create<
  MapStore,
  [["zustand/persist", unknown], ["zustand/immer", never]]
>(
  persist(
    immer((set) => ({
      layers: {
        districts: {
          type: "graphic",
          id: "districts",
          title: "נפות",
          visible: false,
          order: 0,
        },
        subdistricts: {
          type: "graphic",
          id: "subdistricts",
          title: "מחוזות",
          visible: false,
          order: 1,
        },
        ellipses: {
          type: "graphic",
          id: "ellipses",
          title: "אליפסות",
          visible: false,
          order: 2,
        },
        events: {
          type: "feature",
          id: "events",
          title: "אירועים",
          visible: false,
          order: 3,
          isCluster: false,
        },
      },
      setVisibility: (layer, visible) => {
        set((state) => {
          state.layers[layer].visible = visible;
        });
      },
      setCluster(layer, isCluster) {
        set((state) => {
          (state.layers[layer] as FeatureLayer).isCluster = isCluster;
        });
      },
      setOrder(layer, order) {
        set((state) => {
          state.layers[layer].order = order;
        });
      },
    })),
    {
      name: "map-layers",
      partialize: (state) => ({ layers: state.layers }),
    }
  )
);
