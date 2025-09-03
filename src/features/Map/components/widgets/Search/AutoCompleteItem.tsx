import Marker from "@/assets/icons/marker.svg?react";
import Event from "@/assets/icons/event.svg?react";

export const AutoCompleteItem = (props: { onClick: () => Promise<void>, item: __esri.SuggestResult}) => {
    return <div
        className="
            px-3 py-2 hover:bg-gray-100 cursor-pointer transition-colors
            duration-150 border-b border-gray-100 last:border-b-0 flex items-center gap-2
        "
        onClick={props.onClick}
    >
        {props.item.sourceIndex === 0 ? <Marker className="size-5 stroke-primary"/> : <Event className="size-5 stroke-destructive"/>}
        <div className="flex flex-1 overflow-hidden flex-col text-right w-full">
            <span dir="rtl" className="font-medium text-gray-800 truncate">{props.item.text}</span>
            <span dir="rtl" className="text-xs text-gray-500">{props.item.sourceIndex === 1 ? "אירוע" : "כתובת"}</span>
        </div>
    </div>;
}