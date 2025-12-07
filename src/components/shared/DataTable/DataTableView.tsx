import type {Table as TanstackTable} from "@tanstack/table-core";
import {VisibilityState} from "@tanstack/react-table";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Columns} from "lucide-react";
import {memo} from "react";

function DataTableView<TData>(props: { table: TanstackTable<TData>, columnVisibility: VisibilityState }) {
    const {table, columnVisibility} = props

    return <DropdownMenu dir="rtl">
        <DropdownMenuTrigger asChild>
            <Button
                variant="outline"
                className="flex items-center"
            >
                <Columns className="size-4.5 text-primary"/>
                <span className="pt-0.5">עמודות</span>
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
            className="max-h-[300px] overflow-y-auto w-[250px] rounded-md shadow-md p-1"
            align="start"
            onCloseAutoFocus={(e) => e.preventDefault()}
        >
            {
                table.getAllColumns().map(column => {
                    const label = column.id !== 'select' ? column.columnDef.header as string : undefined
                    return label && <DropdownMenuCheckboxItem
                        key={column.id}
                        checked={column.getIsVisible() || columnVisibility[column.id]}
                        disabled={!column.getCanHide()}
                        onCheckedChange={() => column.toggleVisibility()}
                        onSelect={(e) => e.preventDefault()}
                        className="px-1 py-2 text-sm cursor-pointer rounded-sm flex items-center justify-between"
                    >
                        {label}
                    </DropdownMenuCheckboxItem>
                })
            }
        </DropdownMenuContent>
    </DropdownMenu>
}

export default memo(DataTableView) as typeof DataTableView