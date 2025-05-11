import {AutoCompleteLocation} from "@/features/Map/types/geocoding.type.ts";
import {Loading} from "@/components/shared/Loading.tsx";
import {AutoCompleteItem} from "@/features/Map/components/widgets/Search/AutoCompleteItem.tsx";
import {EmptyResults} from "@/features/Map/components/widgets/Search/EmptyResults.tsx";

interface AutoCompleteProps {
    showAutocomplete: undefined | boolean,
    loading: boolean,
    data: AutoCompleteLocation[] | undefined,
    handleSelectItem: (item: AutoCompleteLocation) => void
}

export const AutoComplete = (props: AutoCompleteProps) => {
    const {loading, data, showAutocomplete, handleSelectItem} = props
    return <div className={`
                w-full absolute top-10 rounded-lg bg-white shadow-lg border border-gray-200
                max-h-72 overflow-y-auto scrollbar-none transition-all duration-300 ease-in-out z-50
                origin-top ${showAutocomplete ? "visible opacity-100 scale-y-100" : "invisible opacity-0 scale-y-0"}
            `}>

        {loading && <Loading/>}

        {(!loading && data && data.length > 0)
            ? data.map(item =>
                <AutoCompleteItem
                    key={item.place_id}
                    onClick={async () => handleSelectItem(item)}
                    item={item}
                />)
            : <EmptyResults/>
        }
    </div>
}