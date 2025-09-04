import {AutoCompleteItem} from "@/features/Map/components/widgets/Search/AutoCompleteItem";
import {EmptyResults} from "@/features/Map/components/widgets/Search/EmptyResults";
import {memo} from "react";

interface AutoCompleteProps {
    showAutocomplete: nullish | boolean,
    data: __esri.SuggestResult[] | undefined,
    handleSelectItem: (item: __esri.SuggestResult) => void
}

const AutoComplete = (props: AutoCompleteProps) => {
    const {data, showAutocomplete, handleSelectItem} = props
    return <div className={`
                w-full absolute top-10 rounded-lg bg-white shadow-lg border border-gray-200
                max-h-72 overflow-y-auto scrollbar-none transition-all duration-300 ease-in-out z-50
                origin-top ${showAutocomplete ? "visible opacity-100 scale-y-100" : "invisible opacity-0 scale-y-0"}
            `}>

        {(data && data.length > 0)
            ? data?.map(item => {
                    return <AutoCompleteItem
                        key={item.key}
                        onClick={async () => handleSelectItem(item)}
                        item={item}
                    />

                }
            )
            : <EmptyResults/>
        }
    </div>
}

export default memo(AutoComplete);