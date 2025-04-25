import { useEffect, useMemo, useRef, useState } from "react";
import BasemapGalleryViewModel from "@arcgis/core/widgets/BasemapGallery/BasemapGalleryViewModel";
import BasemapGalleryItem from "@arcgis/core/widgets/BasemapGallery/support/BasemapGalleryItem";
import { useWidget } from "@/features/Map/hooks/useWidget";
import { useMap } from "@/contexts/MapContainer";
import Basemap from "@arcgis/core/Basemap";
import TileLayer from "@arcgis/core/layers/TileLayer";
import MapGallery from "@/assets/map-gallery.svg?react";
import { Position } from "@/features/Map/types";
import { useMapGalleryStore } from "@/features/Map/stores/mapGalleryStore";
import VectorTileLayer from "@arcgis/core/layers/VectorTileLayer";
import { useShallow } from "zustand/shallow";


const createBaseLayer = (
    type: "vector" | "imagery",
    baseLayerUrl: string
) => {
    return type === "vector"
        ? new VectorTileLayer({ url: baseLayerUrl })
        : new TileLayer({ url: baseLayerUrl });
};

const BasemapItem = ({ 
    item, 
    onSelect 
}: { 
    item: BasemapGalleryItem; 
    onSelect: (basemap: Basemap) => void;
}) => (
    <div className="size-10 text-center" key={item.basemap.id}>
        <img
            className="btn draw-btn"
            style={{ padding: 0 }}
            onClick={() => onSelect(item.basemap)}
            src={`${item.basemap.thumbnailUrl}`}
            alt={item.basemap.title}
        />
        <span className="text-zinc-500 text-xs font-semibold">
            {item.basemap.title}
        </span>
    </div>
);

const BaseMapGallery = ({ position }: { position?: Position }) => {
    const [isOpen, setIsOpen] = useState(false);
    const { elementRef } = useWidget(position ?? "top-left");
    const { mapView } = useMap();
    const { basemaps, activeBaseMap, updateActiveBaseMap } = useMapGalleryStore(
        useShallow((state) => ({
            basemaps: state.basemaps,
            activeBaseMap: state.activeBaseMap,
            updateActiveBaseMap: state.updateActiveBaseMap,
        }))
    );

    const initialActiveBasemap = useMemo(() => new Basemap({
        id: activeBaseMap.id,
        title: activeBaseMap.title,
        thumbnailUrl: activeBaseMap.thumbnailUrl ?? "",
        baseLayers: [
            createBaseLayer(activeBaseMap.type, activeBaseMap.baseLayerUrl),
        ],
    }), [activeBaseMap]);

    const basemapGalleryRef = useRef<BasemapGalleryViewModel>(
        new BasemapGalleryViewModel({
            view: mapView.current,
            source: [],
            activeBasemap: initialActiveBasemap,
        })
    );

    const basemapItems = useMemo(() => {
        return basemaps.map((basemap) => {
            const baseLayer = createBaseLayer(basemap.type, basemap.baseLayerUrl);

            return new BasemapGalleryItem({
                view: mapView.current,
                basemap: new Basemap({
                    id: basemap.id,
                    title: basemap.title,
                    thumbnailUrl: basemap.thumbnailUrl ?? "",
                    baseLayers: [baseLayer],
                }),
            });
        });
    }, [basemaps, mapView]);

    useEffect(() => {
        const { items } = basemapGalleryRef.current;
        items.addMany(basemapItems);
        return () => {
            items.removeMany(basemapItems);
        };
    }, [basemapItems]);

    const handleActiveBasemapChange = (currentBasemap: Basemap) => {
        const { current: gallery } = basemapGalleryRef;
        
        if (gallery.basemapEquals(currentBasemap, gallery.activeBasemap)) {
            return;
        }
        
        gallery.activeBasemap = currentBasemap;
        
        const newActiveBasemap = basemaps.find(
            (basemap) => basemap.id === currentBasemap.id
        );
        
        if (newActiveBasemap) {
            updateActiveBaseMap(newActiveBasemap);
        }
    };

    const toggleGallery = () => setIsOpen(!isOpen);

    return (
        <div ref={elementRef} className="flex gap-x-2">
            <MapGallery
                className={`btn ${isOpen ? "active" : ""}`}
                onClick={toggleGallery}
            />
            <div 
                className={`absolute left-full ml-2 tools-container ${isOpen ? "open" : ""}`}
            >
                {basemapItems.map((item) => (
                    <BasemapItem 
                        key={item.basemap.id}
                        item={item} 
                        onSelect={handleActiveBasemapChange} 
                    />
                ))}
            </div>
        </div>
    );
};

export default BaseMapGallery;