export type AutoCompleteLocation = {
    place_id: string;
    osm_id: string;
    osm_type: string;
    licence: string;
    lat: string;
    lon: string;
    boundingbox: [string, string, string, string];
    class: string;
    type: string;
    display_name: string;
    display_place: string;
    display_address: string;
    address: {
        name: string;
        country: string;
        country_code: string;
    };
};

export type GeocodingLocation = {
    place_id: string;
    licence: string;
    osm_type: string;
    osm_id: string;
    boundingbox: [string, string, string, string];
    lat: string;
    lon: string;
    display_name: string;
    class: string;
    type: string;
    importance: number;
    icon?: string;
}

export type ReverseGeocodingLocation = {
    place_id: string;
    licence: string;
    osm_type: string;
    osm_id: string;
    lat: string;
    lon: string;
    display_name: string;
    address: {
        attraction?: string;
        house_number?: string;
        road?: string;
        quarter?: string;
        suburb?: string;
        city?: string;
        state_district?: string;
        state?: string;
        postcode?: string;
        country: string;
        country_code: string;
    };
    boundingbox: [string, string, string, string];
}