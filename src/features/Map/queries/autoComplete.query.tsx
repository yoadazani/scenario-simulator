import {queryOptions} from "@tanstack/react-query";
import {autocomplete} from "@/features/Map/api/geocoding.ts";

export const getAutocompleteQueryOptions = (search?: string) => {
    return queryOptions({
        queryKey: ["autocomplete", search ?? ""],
        queryFn: () => autocomplete(search),
        enabled: !!search && search.trim() !== ""
    });
};