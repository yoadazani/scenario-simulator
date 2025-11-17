import {Table as TanstackTable} from "@tanstack/table-core";
import {Button} from "@/components/ui/button.tsx";
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {Badge} from "@/components/ui/badge.tsx";
import {ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight} from "lucide-react";
import { useMemo} from "react";
import {TABLE_PAGE_SIZES} from "@/constants";

function DataTablePagination<TData>(props: { table: TanstackTable<TData> }) {
    const {table} = props

    const pageSizeOptions = useMemo(() => TABLE_PAGE_SIZES, [])

    return <div className="flex justify-between items-center mt-4">
        <div className="flex items-center flex-row gap-2">
            <Button
                variant="outline"
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
            >
                <ChevronsRight/>
            </Button>
            <Button
                variant="outline"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
            >
                <ChevronRight/>
            </Button>
            <Badge
                variant="default"
                className="p-2"
            >
                {" "} עמוד {table.getState().pagination.pageIndex + 1} מתוך {" "}
                {`${table.getPageCount() > 0 ? table.getPageCount() : 1}`}
            </Badge>
            <Button
                variant="outline"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
            >
                <ChevronLeft/>
            </Button>
            <Button
                variant="outline"
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
            >
                <ChevronsLeft/>
            </Button>
        </div>

        <Select
            dir="rtl"
            onValueChange={(val) => table.setPageSize(Number(val))}
            defaultValue={`${table.getState().pagination.pageSize}`}
        >
            <SelectTrigger>
        <SelectValue/>
            </SelectTrigger>
            <SelectContent
                align="end"
                onCloseAutoFocus={(e) => e.preventDefault()}
            >
                <SelectGroup>
                    {pageSizeOptions.map(pageSize => (
                        <SelectItem key={pageSize} value={`${pageSize}`}> הצג {pageSize}</SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    </div>;
}

export default DataTablePagination