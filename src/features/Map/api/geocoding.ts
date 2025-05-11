import {tryCatch} from "@/lib/utils.ts";
import axios from "axios";
import {
    AutoCompleteLocation,
    GeocodingLocation,
    ReverseGeocodingLocation
} from "@/features/Map/types/geocoding.type.ts";

const privateKey = import.meta.env.VITE_LOCATIONIQ_PRIVATE_KEY;
const autoCompleteApiBaseUrl = import.meta.env.VITE_AUTOCOMPLETE_API_BASE_URL;
const geocodingApiBaseUrl = import.meta.env.VITE_GEOCODING_API_BASE_URL;
const reverseGeocodingApiBaseUrl = import.meta.env.VITE_REVERSE_GEOCODING_API_BASE_URL;

export const autocomplete = async (query?: string) => {
    if (!query) return [];
    const [err, result] = await tryCatch(axios.get(`${autoCompleteApiBaseUrl}?key=${privateKey}&q=${query}&countrycodes=IL&dedupe=1&format=json`));
    if (err) {
        if (err.message.includes("404")) return [];
        throw err
    }
    return result.data as AutoCompleteLocation[];
}

export const geocoding = async (query: string) => {
    const [err, result] = await tryCatch(axios.get(`${geocodingApiBaseUrl}?key=${privateKey}&q=${query}&countrycodes=IL&dedupe=1&format=json`));
    if (err) throw err;
    return result.data as GeocodingLocation[];
}

export const reverseGeocoding = async (lat: number, lon: number) => {
    const [err, result] = await tryCatch(axios.get(`${reverseGeocodingApiBaseUrl}?key=${privateKey}&lat=${lat}&lon=${lon}&format=json`));
    if (err) throw err;
    return result.data as ReverseGeocodingLocation;
}