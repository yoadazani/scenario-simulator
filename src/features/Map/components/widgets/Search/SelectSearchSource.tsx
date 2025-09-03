import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {ChevronDown} from "lucide-react";
import {Dispatch, memo, SetStateAction} from "react";

interface SelectSearchSourceProps {
    sources: __esri.SearchViewModel["sources"]
    activeSourceIndex: number;
    handleSelect: (sourceIndex: number) => void;
    setSelectSourcesOpen: Dispatch<SetStateAction<boolean>>;
}

const SelectSearchSource = (props: SelectSearchSourceProps) => {
    const {sources, activeSourceIndex, handleSelect, setSelectSourcesOpen} = props;
    return <DropdownMenu dir="rtl" onOpenChange={setSelectSourcesOpen}>
        <DropdownMenuTrigger className="data-[state=open]:text-primary ">
            <ChevronDown className="size-5"/>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[290px] absolute -right-5 top-1.5">
            <DropdownMenuLabel className="flex items-center gap-x-2 text-zinc-400">
                <p>בחר מקור חיפוש</p>
            </DropdownMenuLabel>
            <DropdownMenuSeparator/>
            <DropdownMenuCheckboxItem
                className="cursor-pointer"
                checked={activeSourceIndex === -1}
                onCheckedChange={() => handleSelect(-1)}
            >
                הכל
            </DropdownMenuCheckboxItem>
            {sources.map((source, index) => (
                <DropdownMenuCheckboxItem
                    className="cursor-pointer"
                    key={source.uid}
                    checked={activeSourceIndex === index}
                    onCheckedChange={() => handleSelect(index)}
                >
                    {source.name}
                </DropdownMenuCheckboxItem>
            ))}
        </DropdownMenuContent>
    </DropdownMenu>
};

export default memo(SelectSearchSource);