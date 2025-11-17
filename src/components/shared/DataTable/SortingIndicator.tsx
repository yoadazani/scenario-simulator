import {SortDirection} from "@tanstack/react-table";
import {memo, useMemo} from "react";
import {ArrowDown, ArrowUp, ArrowUpDown} from "lucide-react";

const iconStyle = "size-4 text-primary hover:text-primary/50 transition-colors duration-200 cursor-pointer"

const SortingIndicator = (props: {
    toggleSorting: (event: unknown) => void,
    sortedDirection: false | SortDirection
}) => {
    const {toggleSorting, sortedDirection} = props;


    const Icons = useMemo(() => ({
        desc: <ArrowDown className={iconStyle} onClick={toggleSorting}/>,
        asc: <ArrowUp className={iconStyle} onClick={toggleSorting}/>,
        false: <ArrowUpDown className={iconStyle} onClick={toggleSorting}/>
    }), [])

    return Icons[sortedDirection as keyof typeof Icons] ?? null
}

export default memo(SortingIndicator)