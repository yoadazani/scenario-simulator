import {Search} from "lucide-react";
import {Input} from "@/components/ui/input.tsx";
import {Table} from "@tanstack/react-table";
import {memo} from "react";

const DataTableGlobalFilter = <TData, >({table}: { table: Table<TData> }) => {
    
    return <div className="relative w-64 max-w-sm">
        <div className="absolute inset-y-0 end-0 flex items-center pe-3 pointer-events-none">
            <Search className="h-4 w-4 text-gray-500"/>
        </div>
        <Input
            placeholder="חפש..."
            className="pe-10 bg-white border-gray-300 shadow-sm hover:border-primary focus-visible:ring-primary/30 rounded-lg"
            dir="rtl"
            defaultValue={table.getState().globalFilter.globalFilter || ""}
            onChange={e => table.setGlobalFilter({
                globalFilter: e.target.value
            })}
        />
    </div>;
}

export default memo(DataTableGlobalFilter) as typeof DataTableGlobalFilter