import MapSearch from "@/assets/map-search.svg?react";
import {useWidget} from "@/features/Map/hooks/useWidget.ts";
import SearchInput from "@/features/Map/components/widgets/Search/SearchInput.tsx";
import {useState} from "react";
import GraphicLayer from "@/features/Map/contexts/GraphicLayer.tsx";

const Search = () => {
    const {elementRef} = useWidget("top-left");
    const [open, setOpen] = useState(false)
    return <div ref={elementRef} className="flex items-center space-x-2">
        <MapSearch className="btn" onClick={() => setOpen(prev => !prev)}/>
        <GraphicLayer>
            <SearchInput isOpen={open}/>
        </GraphicLayer>
    </div>

};

export default Search;