import {useCallback, useEffect, useMemo, useState} from 'react'
import {Input} from "@/components/ui/input.tsx";
import {AutoCompleteLocation} from "@/features/Map/types/geocoding.type.ts";
import {useMap} from "@/features/Map/contexts/MapContainer.tsx";
import {useDebounce} from "@/hooks/useDebounce.ts";
import {useQuery} from "@tanstack/react-query";
import {getAutocompleteQueryOptions} from "@/features/Map/queries/autoComplete.query.tsx";
import Extent from "@arcgis/core/geometry/Extent";
import Search from "@/assets/search.svg?react";
import {AutoComplete} from "@/features/Map/components/widgets/Search/AutoComplete.tsx";
import {useGraphic} from "@/features/Map/hooks/useGraphic.ts";
import Point from "@arcgis/core/geometry/Point";
import PictureMarkerSymbol from "@arcgis/core/symbols/PictureMarkerSymbol";
import {markerSymbol} from "@/features/Map/constants/symbols.ts";

const SearchInput = ({isOpen}: { isOpen: boolean }) => {
    const {mapView} = useMap();
    const graphicRef = useGraphic({})
    const [location, setLocation] = useState<string>('');
    const deferredLocation = useDebounce(location, 500) as string;

    const queryOptions = useMemo(() =>
            getAutocompleteQueryOptions(deferredLocation as string),
        [deferredLocation]
    );

    const {data, isLoading, refetch} = useQuery(queryOptions);

    useEffect(() => {
        (async () => {
            if (deferredLocation) await refetch()
        })();
    }, [deferredLocation, refetch]);

    useEffect(() => {
        if (!isOpen) setLocation("");
    }, [isOpen]);

    const handleSelectItem = useCallback(async (item: AutoCompleteLocation) => {
        const [ymin, ymax, xmin, xmax] = item.boundingbox.map(parseFloat);
        const extent = Extent.fromJSON({xmax, xmin, ymax, ymin});

        await mapView.current.goTo(
            {target: extent},
            {animate: true, duration: 2000, easing: "ease-in-out"}
        );

        graphicRef.current.geometry = new Point({
            latitude: +item.lat,
            longitude: +item.lon
        });
        graphicRef.current.symbol = new PictureMarkerSymbol(markerSymbol)
    }, []);

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