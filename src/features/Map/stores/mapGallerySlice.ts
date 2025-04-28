import {StateCreator} from "zustand";
import streetThumbnail from "@/assets/thumbnails/street.png";
import satelliteThumbnail from "@/assets/thumbnails/satellite.png";
import vectorThumbnail from "@/assets/thumbnails/vector.png";
import {BaseMapGalleryItem} from "@/features/Map/types/map.type.ts";
import {MapStore} from "./mapStore";

const streetUrl = import.meta.env.VITE_STREET_MAP_URL;
const satelliteUrl = import.meta.env.VITE_SATELLITE_MAP_URL;
const vectorUrl = import.meta.env.VITE_VECTOR_MAP_URL;

export type MapGalleryState = {
    activeBaseMap: BaseMapGalleryItem;
    basemaps: BaseMapGalleryItem[];
};

export type MapGalleryActions = {
    updateActiveBaseMap: (baseMap: BaseMapGalleryItem) => void;
};

export type MapGallerySlice = MapGalleryState & MapGalleryActions;

export const mapGallerySlice: StateCreator<
    MapStore,
    [["zustand/persist", unknown], ["zustand/immer", never]],
    [],
    MapGallerySlice
> = (set) => ({
    activeBaseMap: {
        id: "street",
        type: "imagery",
        title: "רחוב",
        thumbnailUrl: streetThumbnail,
        baseLayerUrl: streetUrl,
    },
    basemaps: [
        {
            id: "street",
            type: "imagery",
            title: "רחוב",
            thumbnailUrl: streetThumbnail,
            baseLayerUrl: streetUrl,
        },
        {
            id: "satellite",
            type: "imagery",
            title: "לווין",
            thumbnailUrl: satelliteThumbnail,
            baseLayerUrl: satelliteUrl,
        },
        {
            id: "vector",
            type: "vector",
            title: "וקטור",
            thumbnailUrl: vectorThumbnail,
            baseLayerUrl: vectorUrl,
        },
    ],

    updateActiveBaseMap: (baseMap: BaseMapGalleryItem) =>
        set({activeBaseMap: baseMap}),
});
