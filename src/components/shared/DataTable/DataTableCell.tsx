import {ReactNode} from "react";
import {cn} from "@/utils";

const DataTableCell = ({children, className}: {children: ReactNode, className?: string}) => (
    <div className={cn(`text-center font-semibold truncate`, className)}>
        {children}
    </div>
);

export default DataTableCell;