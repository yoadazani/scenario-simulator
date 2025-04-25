import { Tools } from "@/features/Map/types";
import Graphic from "@arcgis/core/Graphic";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

type MapInteractionState = {
  graphics: {
    point?: Graphic;
    polygon?: Graphic;
    polyline?: Graphic;
    circle?: Graphic;
    ellipse?: Graphic;
    rectangle?: Graphic;
  };
};

type MapInteractionActions = {
  updateGraphic: (type: Tools, graphic: Graphic) => void;
  removeGraphic: (type: Tools) => void;
  getGraphic: (type: Tools) => Graphic | undefined;
};

type MapInteractionStore = MapInteractionState & MapInteractionActions;

export const useMapInteraction = create<
  MapInteractionStore,
  [["zustand/persist", unknown], ["zustand/immer", never]]
>(
  persist(
    immer((set, get) => ({
      graphics: {},
      updateGraphic: (type, graphic) => {
        set((state) => {
          state.graphics[type] = graphic.toJSON();
        });
      },
      removeGraphic: (type) => {
        set((state) => {
          state.graphics[type] = undefined;
        });
      },
      getGraphic: (type) => {
        return get().graphics[type];
      }
    })),
    {
      name: "map-sketch-graphics",
      partialize: (state) => ({ graphics: state.graphics })
    }
  )
);