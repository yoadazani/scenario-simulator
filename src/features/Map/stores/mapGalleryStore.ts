import { create } from "zustand";
import streetTumbnail from "@/assets/thumbnails/street.png";
import satelliteThumbnail from "@/assets/thumbnails/satellite.png";
import vectorThumbnail from "@/assets/thumbnails/vector.png";
import { BaseMapGalleryItem } from "@/features/Map/types/map.type.ts";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";

const streetUrl = import.meta.env.VITE_STREET_MAP_URL;
const satelliteUrl = import.meta.env.VITE_SATELLITE_MAP_URL;
const vectorUrl = import.meta.env.VITE_VECTOR_MAP_URL;

type MapGalleryState = {
  activeBaseMap: BaseMapGalleryItem;
  basemaps: BaseMapGalleryItem[];
};

type MapGalleryActions = {
  updateActiveBaseMap: (baseMap: BaseMapGalleryItem) => void;
};

type MapGalleryStore = MapGalleryState & MapGalleryActions;

export const useMapGalleryStore = create<
  MapGalleryStore,
  [["zustand/persist", unknown], ["zustand/immer", never]]
>(
  persist(
    immer((set) => ({
      activeBaseMap: {
        id: "street",
        type: "imagery",
        title: "רחוב",
        thumbnailUrl: streetTumbnail,
        baseLayerUrl: streetUrl,
      },
      basemaps: [
        {
          id: "street",
          type: "imagery",
          title: "רחוב",
          thumbnailUrl: streetTumbnail,
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
        set({ activeBaseMap: baseMap }),
    })),
    {
      name: "active-basemap",
      partialize: (state) => ({ activeBaseMap: state.activeBaseMap }),
    }
  )
);
