import {ReactNode} from "react";
import {cn} from "@/utils";

const DataTableCell = ({children, className}: {children: ReactNode, className?: string}) => (
    <div className={cn(`text-center p-2 font-semibold truncate`, className)}>
        {children}
    </div>
);

export default DataTableCell;