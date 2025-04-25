import BasemapGalleryItem from "@arcgis/core/widgets/BasemapGallery/support/BasemapGalleryItem";
import Basemap from "@arcgis/core/Basemap";

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

export default BasemapItem;