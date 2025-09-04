import { useRef, useEffect, useState } from 'react';
import LayerSearchSource from "@arcgis/core/widgets/Search/LayerSearchSource";
import LocatorSearchSource from "@arcgis/core/widgets/Search/LocatorSearchSource";
import Collection from "@arcgis/core/core/Collection";
import esriRequest from "@arcgis/core/request";
import { AutoCompleteLocation } from "@/features/Map/types/geocoding.type";
import { SEARCH_PLACEHOLDERS } from "@/features/Map/constants";
import Graphic from "@arcgis/core/Graphic";
import Extent from "@arcgis/core/geometry/Extent";
import Point from "@arcgis/core/geometry/Point";
import {useMap} from "@/features/Map/contexts/MapContainer";

const autoCompleteApiBaseUrl = import.meta.env.VITE_AUTOCOMPLETE_API_BASE_URL;
const geocodingApiBaseUrl = import.meta.env.VITE_GEOCODING_API_BASE_URL;
const privateKey = import.meta.env.VITE_LOCATIONIQ_PRIVATE_KEY;

export const useSearchSources = (eventsLayer: __esri.Layer | null) => {
    const {mapView} = useMap();
    const [sources, setSources] = useState<__esri.SearchViewModel["sources"]>(new Collection());

    const locationSource = useRef(new LocatorSearchSource({
        outFields: ["*"],
        name: "ערים ורחובות",
        placeholder: SEARCH_PLACEHOLDERS.geocoding,
        zoomScale: 50000,
        async getSuggestions(params: __esri.GetSuggestionsParametersParams): Promise<__esri.SearchSuggestResult[]> {
            const { suggestTerm } = params;
            const url = `${autoCompleteApiBaseUrl}?key=${privateKey}&q=${suggestTerm}&countrycodes=IL&dedupe=1&accept-language=IL&format=json`;

            try {
                const { data } = await esriRequest(url, {
                    query: {
                        q: suggestTerm,
                        limit: 6,
                        lat: mapView.current.center.latitude,
                        lon: mapView.current.center.longitude
                    },
                    responseType: "json",
                });

                if (!data) return [];
                return data.map((suggestion: AutoCompleteLocation) => ({
                    key: suggestion.place_id,
                    text: suggestion.display_name,
                    sourceIndex: 0
                }));
            } catch (error) {
                console.error('Error fetching suggestions:', error);
                return [];
            }
        },
        async getResults(query): Promise<__esri.SearchSearchResult[]> {
            const searchText = query.suggestResult?.text ?? "";
            const url = `${geocodingApiBaseUrl}?key=${privateKey}&q=${searchText}&countrycodes=IL&dedupe=1&format=json`;

            try {
                const { data } = await esriRequest(url, {
                    query,
                    responseType: "json",
                });

                if (!data || !data[0]) return [];
                const { lat, lon, boundingbox } = data[0];

                const graphic = new Graphic({
                    geometry: new Point({
                        longitude: parseFloat(lon),
                        latitude: parseFloat(lat)
                    }),
                    attributes: {
                        Match_addr: searchText,
                        StAddr: "",
                        City: "",
                    },
                });

                const extent = Extent.fromJSON({
                    xmin: parseFloat(boundingbox[2]),
                    ymin: parseFloat(boundingbox[0]),
                    xmax: parseFloat(boundingbox[3]),
                    ymax: parseFloat(boundingbox[1])
                }).toJSON();

                return [{
                    extent,
                    feature: graphic,
                    name: searchText,
                    target: graphic,
                }];
            } catch (error) {
                console.error('Error fetching geocoding results:', error);
                return [];
            }
        }
    }));

    const eventsSource = useRef(new LayerSearchSource({
        searchFields: ["name"],
        displayField: "name",
        exactMatch: false,
        outFields: ["*"],
        name: "אירועים",
        placeholder: SEARCH_PLACEHOLDERS.events,
        maxResults: 6,
        maxSuggestions: 6,
        minSuggestCharacters: 0,
        zoomScale: 50000,
    }));

    useEffect(() => {
        const newSources = new Collection([locationSource.current]);

        if (eventsLayer) {
            eventsSource.current.layer = eventsLayer;
            newSources.add(eventsSource.current);
        }

        setSources(newSources);
    }, [eventsLayer]);

    return {
        sources,
        locationSource: locationSource.current,
        eventsSource: eventsSource.current
    };
};