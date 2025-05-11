import {AutoCompleteLocation} from "@/features/Map/types/geocoding.type.ts";
import Marker from "@/assets/marker.svg?react";

export const AutoCompleteItem = (props: { onClick: () => Promise<void>, item: AutoCompleteLocation }) => {
    return <div
        className="
            px-3 py-2 hover:bg-gray-100 cursor-pointer transition-colors
            duration-150 border-b border-gray-100 last:border-b-0 flex items-center gap-2
        "
        onClick={props.onClick}
    >
        <Marker className="size-5 stroke-blue-800"/>
        <div className="flex flex-1 overflow-hidden flex-col text-right w-full">
            <span dir="rtl" className="font-medium text-gray-800">{props.item.display_place}</span>
            <span dir="rtl" className="text-xs text-gray-500 truncate">{props.item.display_address}</span>
        </div>
    </div>;
}