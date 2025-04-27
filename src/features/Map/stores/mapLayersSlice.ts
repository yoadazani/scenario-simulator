import {
    FeatureLayer,
    GraphicLayer,
    layerName,
} from "@/features/Map/types/map.type.ts";
import {StateCreator} from "zustand";
import {MapStore} from "./mapStore";

export type MapLayersState = {
    layers: {
        districts: GraphicLayer;
        subdistricts: GraphicLayer;
        ellipses: GraphicLayer;
        events: FeatureLayer;
    };
};

export type MapLayersActions = {
    setVisibility: (layer: layerName, visible: boolean) => void;
    setOrder: (layer: layerName, order: number) => void;
    setCluster: (layer: layerName, isCluster: boolean) => void;
};

export type MapLayersSlice = MapLayersState & MapLayersActions;

export const mapLayersSlice: StateCreator<
    MapStore,
    [["zustand/persist", unknown], ["zustand/immer", never]],
    [],
    MapLayersSlice
> = (set) => ({
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
});
