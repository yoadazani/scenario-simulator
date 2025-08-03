import {useEffect, useMemo, useRef, useState} from 'react'
import {Input} from "@/components/ui/input.tsx";
import {AutoCompleteLocation} from "@/features/Map/types/geocoding.type.ts";
import {useMap} from "@/features/Map/contexts/MapContainer.tsx";
import {useDebounce} from "@/hooks/useDebounce.ts";
import {useQuery} from "@tanstack/react-query";
import {getAutocompleteQueryOptions} from "@/features/Map/queries/autoComplete.query.tsx";
import Search from "@/assets/search.svg?react";
import SearchViewModel from "@arcgis/core/widgets/Search/SearchViewModel";
import PictureMarkerSymbol from "@arcgis/core/symbols/PictureMarkerSymbol";
import {markerSymbol} from "@/features/Map/constants/symbols.ts";
import {AutoComplete} from "@/features/Map/components/widgets/Search/AutoComplete.tsx";
import Point from "@arcgis/core/geometry/Point";
import {searchLocationPopupContent} from "@/features/Map/constants/popup_templates.ts";

const SearchInput = ({isOpen}: { isOpen: boolean }) => {
    const {mapView} = useMap();
    const [location, setLocation] = useState<string>('');
    const deferredLocation = useDebounce(location, 500) as string;

    const queryOptions = useMemo(() =>
            getAutocompleteQueryOptions(deferredLocation as string),
        [deferredLocation]
    );

    const {data, isLoading, refetch} = useQuery(queryOptions);

    const SearchViewModelRef = useRef(new SearchViewModel({
        view: mapView.current,
        defaultSymbols: {
            point: new PictureMarkerSymbol(markerSymbol)
        },
        popupEnabled: true,
        popupTemplate: {
            content: searchLocationPopupContent,
        },
    }))

    useEffect(() => {
        (async () => {
            if (deferredLocation) await refetch()
        })();
    }, [deferredLocation, refetch]);

    useEffect(() => {
        if (!isOpen) {
            setLocation("");
            SearchViewModelRef.current.clear()
        }
    }, [isOpen]);

    const handleSelectItem = async (item: AutoCompleteLocation) => {
        await SearchViewModelRef.current.search(new Point({
            latitude: parseFloat(item.lat),
            longitude: parseFloat(item.lon)
        }));
    }

    const showAutocomplete = isOpen && data && deferredLocation.trim() !== "";

    return (
        <div className="relative">
            {/* Search input */}
            <div className={`
                flex items-center space-x-2 bg-white border-background focus-within:border-blue-800 
                border rounded-lg px-2 transition-all duration-300 ease-in-out
                ${isOpen ? 'visible opacity-100 translate-x-0' : 'invisible opacity-0 -translate-x-4'}     
            `}>
                <Search/>
                <Input
                    type="text"
                    placeholder="חיפוש"
                    dir="rtl"
                    value={location}
                    className="shadow-none outline-none border-none bg-transparent focus:outline-none
                               focus-visible:border-none focus:ring-0 focus-visible:ring-0
                               focus-visible:ring-offset-0 rtl:placeholder:text-right"
                    onChange={(e) => setLocation(e.target.value)}
                />
            </div>

            <AutoComplete
                showAutocomplete={showAutocomplete}
                loading={isLoading}
                data={data}
                handleSelectItem={handleSelectItem}
            />
        </div>
    );
};

export default SearchInput;