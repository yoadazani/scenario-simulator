import {create} from "zustand";
import {immer} from "zustand/middleware/immer";
import {persist} from "zustand/middleware";
import {mapLayersSlice, MapLayersSlice} from "@/features/Map/stores/mapLayersSlice.ts";
import {MapGallerySlice, mapGallerySlice} from "@/features/Map/stores/mapGalleryStore.ts";
import {MapInteractionSlice, mapInteractionSlice} from "@/features/Map/stores/mapInteractionStore.ts";


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