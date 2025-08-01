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
import * as reactiveUtils from "@arcgis/core/core/reactiveUtils.js"


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
            actions: [{
                type: "button",
                id: "copy-coordinates",
                title: "העתק קואורדינטות",
                className: "esri-icon-duplicate"
            }],
            title: "{name}",
            content: `
                <div dir="rtl" class="bg-white rounded-lg shadow-md w-full overflow-hidden">
                    <div class="p-4 border-b border-gray-100">
                        <div class="flex items-center gap-3">
                            <div class="bg-blue-100 p-2 rounded-full flex-shrink-0">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 fill-blue-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <div class="text-right">
                                <p class="text-sm font-medium text-gray-500">כתובת</p>
                                <p class="text-lg font-semibold text-gray-900">{LongLabel}</p>
                            </div>
                        </div>
                    </div>
        
                    <div class="p-4 bg-gray-50">
                        <p class="text-sm font-medium text-gray-600 mb-2">קואורדינטות</p>
                        <div class="grid grid-cols-2 gap-2">
                            <div class="bg-white p-2 rounded border border-gray-200">
                                <p class="text-xs text-gray-500">קו רוחב</p>
                                <p class="font-mono text-sm font-medium">{InputX}</p>
                            </div>
                            <div class="bg-white p-2 rounded border border-gray-200">
                                <p class="text-xs text-gray-500">קו אורך</p>
                                <p class="font-mono text-sm font-medium">{InputY}</p>
                            </div>
                        </div>
                    </div>
                </div>
            `,
        }
    }))

    useEffect(() => {
        (async () => {
            if (deferredLocation) await refetch()
        })();
    }, [deferredLocation, refetch]);

    useEffect(() => {
        if (!isOpen) setLocation("");
    }, [isOpen]);

    useEffect(() => {
        reactiveUtils.on(
            () => mapView.current.popup,
            "trigger-action",
            async (event) => {
                if (event.action.id === "copy-coordinates") {
                    const feature = mapView.current.popup!.selectedFeature;
                    if (feature) {
                        const x = feature.attributes.InputX;
                        const y = feature.attributes.InputY;
                        const coordsText = `${x}, ${y}`;

                        try {
                            await navigator.clipboard.writeText(coordsText)
                            mapView.current.popup!.title = "הועתק בהצלחה!";
                            setTimeout(() => {
                                mapView.current.popup!.title = feature.attributes.LongLabel;
                            }, 1000);
                        } catch (err) {
                            console.log(err);
                            mapView.current.popup!.title = "שגיאה בהעתקת הקואורדינטות";
                        }

                    }
                }
            }
        );
    }, []);

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