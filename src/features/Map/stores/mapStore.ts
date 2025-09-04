import {create} from "zustand";
import {immer} from "zustand/middleware/immer";
import {persist} from "zustand/middleware";
import {mapLayersSlice, MapLayersSlice} from "@/features/Map/stores/mapLayersSlice";
import {MapGallerySlice, mapGallerySlice} from "@/features/Map/stores/mapGallerySlice";
import {MapInteractionSlice, mapInteractionSlice} from "@/features/Map/stores/mapInteractionSlice";


export type MapStore = MapLayersSlice & MapGallerySlice & MapInteractionSlice

// Create store with correct middleware application
export const useMapStore = create<MapStore>()(
    persist(
        immer((...args) => {
            const layersSlice = mapLayersSlice(...args);
            const gallerySlice = mapGallerySlice(...args);
            const interactionSlice = mapInteractionSlice(...args);

            return {
                ...layersSlice,
                ...gallerySlice,
                ...interactionSlice
            };
        }),
        {
            name: "map-store",
            partialize: (state) => ({
                layers: state.layers,
                activeBaseMap: state.activeBaseMap,
                graphics: state.graphics
            })
        }
    )
);