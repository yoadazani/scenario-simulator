import { useCallback } from 'react';
import { useDebounce } from "@/hooks/useDebounce.ts";
import SearchViewModel from "@arcgis/core/widgets/Search/SearchViewModel";

export const useSearchSuggestions = () => {
    const [suggestions, setSuggestions] = useDebounce<__esri.SuggestResult[]>([], 300);

    const updateSuggestions = useCallback(async (searchViewModel: SearchViewModel | null, searchTerm: string) => {
        if (!searchViewModel || !searchTerm.trim()) {
            setSuggestions([]);
            return;
        }

        try {
            const suggestResponse = await searchViewModel.suggest(searchTerm);
            const suggestionResults = suggestResponse?.results;
            const suggestionResult = suggestionResults?.map(result => result.results).flat() as __esri.SuggestResult[];
            setSuggestions(suggestionResult ?? []);
        } catch (error) {
            console.error('Error fetching suggestions:', error);
            setSuggestions([]);
        }
    }, [setSuggestions]);

    const clearSuggestions = useCallback(() => {
        setSuggestions([]);
    }, [setSuggestions]);

    return {
        suggestions,
        updateSuggestions,
        clearSuggestions
    };
};