import {ChangeEvent, useCallback, useEffect, useRef, useState} from 'react'
import {Input} from "@/components/ui/input";
import {useMap} from "@/features/Map/contexts/MapContainer";
import {PopupContentTemplate} from "@/features/Map/constants/popup_templates";
import {useLayerById} from "@/features/Map/hooks/useLayerById";
import {markerSymbol} from "@/features/Map/constants/symbols";

import AutoComplete from "@/features/Map/components/widgets/Search/AutoComplete";
import ClearBtn from "@/features/Map/components/widgets/Search/ClearBtn";
import SelectSearchSource from "@/features/Map/components/widgets/Search/SelectSearchSource";

import Search from "@/assets/icons/search.svg?react";
import SearchViewModel from "@arcgis/core/widgets/Search/SearchViewModel";
import PictureMarkerSymbol from "@arcgis/core/symbols/PictureMarkerSymbol";
import {SEARCH_PLACEHOLDERS} from "@/features/Map/constants";
import {useSearchSources} from "@/features/Map/hooks/useSearchSources";
import {useSearchSuggestions} from "@/features/Map/hooks/useSearchSuggestion";

const SearchInput = ({isOpen}: { isOpen: boolean }) => {
    const {mapView} = useMap();
    const inputRef = useRef<HTMLInputElement>(null);
    const eventsLayer = useLayerById("events")
    const [selectedSource, setSelectedSource] = useState<number>(-1)
    const [selectSourcesOpen, setSelectSourcesOpen] = useState(false)

    const {sources, eventsSource, locationSource} = useSearchSources(eventsLayer!)
    const { suggestions, updateSuggestions, clearSuggestions } = useSearchSuggestions()

    const SearchViewModelRef = useRef(new SearchViewModel({
        view: mapView.current,
        popupEnabled: true,
        searchAllEnabled: true,
        suggestionDelay: 1000,
        activeSourceIndex: selectedSource,
        includeDefaultSources: false,
        allPlaceholder: SEARCH_PLACEHOLDERS.all,
        defaultSymbols: {
            point: new PictureMarkerSymbol(markerSymbol),
        },
        popupTemplate: {
            content: ({graphic}: { graphic: __esri.Graphic }) => {
                const geometry = graphic.geometry as __esri.Point;
                const {Match_addr, StAddr, City} = graphic.attributes
                return PopupContentTemplate(geometry, `${Match_addr} ${StAddr} ${City}`)
            },
        },
        sources: [
            locationSource,
            eventsSource
        ],
    }))

    const handleClear = useCallback(() => SearchViewModelRef.current.clear(), [])

    const handleSelectItem = useCallback(async (item: __esri.SuggestResult) =>
        await SearchViewModelRef.current.search(item.text), [])

    const handleChange = useCallback(async (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        SearchViewModelRef.current.searchTerm = value;
        await updateSuggestions(SearchViewModelRef.current, value );
    }, [])

    const handleSelectActiveSource = useCallback((sourceIndex: number) => {
        setSelectedSource(sourceIndex)
        SearchViewModelRef.current.activeSourceIndex = sourceIndex
    }, [])

    const handleSelectResult = useCallback(async (event: __esri.SearchViewModelSelectResultEvent) => {
        const {result} = event;
        if (result.feature.layer) {
            const {feature} = result
            feature.symbol = new PictureMarkerSymbol(markerSymbol)
            SearchViewModelRef.current.view?.graphics.add(feature)
        }
    }, [])

    const handleSearchClear = useCallback(() => {
        if (inputRef.current) {
            inputRef.current.value = "";
        }
        clearSuggestions();
    }, [clearSuggestions]);

    useEffect(() => {
        const selectResultHandler = SearchViewModelRef.current.on("select-result", handleSelectResult)
        const searchClearHandler = SearchViewModelRef.current.on("search-clear", handleSearchClear)
        return () => {
            selectResultHandler.remove()
            searchClearHandler.remove()
        }
    }, [handleSelectResult, handleSearchClear]);
    

    useEffect(() => {
        if (!isOpen) {
            handleClear()
            return;
        }
        setTimeout(() => {
            if (inputRef.current) {
                inputRef.current.focus();
            }
        }, 50);
    }, [handleClear, isOpen]);

    const showAutocomplete = isOpen && !selectSourcesOpen && SearchViewModelRef.current.searchTerm.trim() !== ''

    return (
        <div className="relative">
            <div className={`
                flex items-center space-x-2 bg-white border-background focus-within:border-primary 
                border rounded-lg px-2 transition-all duration-300 ease-in-out
                ${isOpen ? 'visible opacity-100 translate-x-0' : 'invisible opacity-0 -translate-x-4 hidden'}     
            `}>
                <Search/>
                <Input
                    ref={inputRef}
                    type="text"
                    placeholder={SearchViewModelRef.current.placeholder}
                    dir="rtl"
                    className="shadow-none outline-none border-none bg-transparent focus:outline-none
                               focus-visible:border-none focus:ring-0 focus-visible:ring-0
                               focus-visible:ring-offset-0 rtl:placeholder:text-right"
                    onChange={handleChange}
                />

                <ClearBtn handleClear={handleClear}/>
                <SelectSearchSource
                    sources={sources}
                    activeSourceIndex={selectedSource}
                    handleSelect={handleSelectActiveSource}
                    setSelectSourcesOpen={setSelectSourcesOpen}
                />
            </div>
            <AutoComplete
                showAutocomplete={showAutocomplete}
                data={suggestions}
                handleSelectItem={handleSelectItem}
            />
        </div>
    );
};

export default SearchInput;
