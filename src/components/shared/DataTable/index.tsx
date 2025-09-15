import '@tanstack/react-table'
import {useCallback, useMemo, useState} from "react";
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    PaginationState,
    RowData,
    SortingState,
    Updater,
    useReactTable,
    VisibilityState,
} from "@tanstack/react-table"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table"
import {SendingStatusEnum, WithSendingStatus} from "@/types";
import {useFilters} from "@/hooks/useFilters.ts";
import {RegisteredRouter, RouteIds} from "@tanstack/react-router";
import {paginationToState, sortByToState, stateToPagination, stateToSortBy} from "@/lib/utils.ts";
import {TABLE_ROW_COLOR} from "@/constants";
import SortingIndicator from "@/components/shared/DataTable/SortingIndicator.tsx";
import ResizeHandler from "@/components/shared/DataTable/ResizeHandler.tsx";
import DataTableView from "@/components/shared/DataTable/DataTableView.tsx";
import DataTablePagination from "@/components/shared/DataTable/DataTablePagination.tsx";
import DataTableActions from "@/components/shared/DataTable/DataTableActions.tsx";
import DataTableEmptyMessage from "@/components/shared/DataTable/DataTableEmptyMessage";

declare module '@tanstack/react-table' {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface ColumnMeta<TData extends RowData, TValue> {
        visible: boolean
    }
}

interface DataTableProps<TData, TValue> {
    routeId: RouteIds<RegisteredRouter["routeTree"]>,
    columns: ColumnDef<TData, TValue>[],
    data: TData[],
    rowCount: number,
    columnVisibility: VisibilityState,
    setColumnVisibility: (visibilityState: VisibilityState) => void,
}

const DataTable = <TData extends WithSendingStatus, TValue>(props: DataTableProps<TData, TValue>) => {
    const {columns, data, routeId, columnVisibility, setColumnVisibility, rowCount} = props
    const {setFilters, filters} = useFilters(routeId)
    const sortingState = useMemo(() => {
        return sortByToState(filters._sort)
    }, [filters._sort])
    const [columnOrder, setColumnOrder] = useState<string[]>(() =>
        columns.map(c => c.id!)
    )
    const handleSorting = useCallback((updaterOrValue: Updater<SortingState>) => {
        const newSortingState = typeof updaterOrValue === "function" ? updaterOrValue(sortingState) : updaterOrValue
        const sorting = stateToSortBy(newSortingState)
        return setFilters({
            _sort: sorting?._sort
        })
    }, [filters._sort])

    const paginationState = useMemo(() => {
        return paginationToState(filters._page, filters._per_page)
    }, [filters._page, filters._per_page])

    const handlePagination = useCallback((updaterOrValue: Updater<PaginationState>) => {
        const newPaginationState = typeof updaterOrValue === "function" ? updaterOrValue(paginationState) : updaterOrValue
        const pagination = stateToPagination(newPaginationState)
        return setFilters({
            _page: pagination?._page,
            _per_page: pagination?._per_page,
        })
    }, [filters._page, filters._per_page])

    const handleColumnVisibility = ((updaterOrValue: Updater<VisibilityState>) => {
        const newColumnVisibility = typeof updaterOrValue === 'function' ? updaterOrValue(columnVisibility) : updaterOrValue
        setColumnVisibility(newColumnVisibility)
    })

    const table = useReactTable({
        data,
        columns,
        rowCount,
        getCoreRowModel: getCoreRowModel(),
        columnResizeMode: 'onChange',
        columnResizeDirection: 'rtl',
        manualFiltering: true,
        manualSorting: true,
        manualPagination: true,
        enableColumnResizing: true,
        enableHiding: true,
        onSortingChange: handleSorting,
        onPaginationChange: handlePagination,
        onColumnVisibilityChange: handleColumnVisibility,
        onColumnOrderChange: setColumnOrder,
        state: {
            sorting: sortingState,
            pagination: paginationState,
            columnVisibility: columnVisibility,
            columnOrder: columnOrder
        },
    })

    const totalTableWidth = useMemo(() => table.getTotalSize(), [table.getState().columnSizingInfo])
    const isAnyColumnResizing = useMemo(() => {
        return Boolean(table.getState().columnSizingInfo?.isResizingColumn)
    }, [table.getState().columnSizingInfo?.isResizingColumn])

    return (
        <>
            <div className="flex justify-between items-center gap-2 py-2">
                <DataTableView table={table} columnVisibility={columnVisibility}/>

                <DataTableActions/>
            </div>
            <div className="rounded-md border overflow-auto h-[calc(100vh-10rem)]">
                <Table className="h-full" style={{width: `${totalTableWidth}px`, tableLayout: 'fixed' as const}}>
                    <TableHeader className="table-header-group sticky top-0 right-0 bg-stone-50">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return <TableHead
                                        key={header.id}
                                        className={`relative py-2 px-4 flex-row justify-between items-center w-full truncate ${
                                            isAnyColumnResizing ? "" : "cursor-pointer"
                                        }`}
                                        colSpan={header.colSpan}
                                        onDoubleClick={header.column.resetSize}
                                        style={{
                                            width: `${header.column.getSize()}px`,
                                            flex: `0 0 ${header.column.getSize()}px`
                                        }}
                                    >
                                        <div className="flex justify-between items-center">
                                            {flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                            {header.column.getCanSort() && <SortingIndicator
                                                toggleSorting={header.column.getToggleSortingHandler()!}
                                                sortedDirection={header.column.getIsSorted()}
                                            />}
                                        </div>

                                        {header.column.getCanResize() &&
                                            <ResizeHandler
                                                isResizing={header.column.getIsResizing()}
                                                getResizeHandler={header.getResizeHandler()}
                                            />
                                        }
                                    </TableHead>
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                    className={`${TABLE_ROW_COLOR[row.original.sendingStatus as SendingStatusEnum]} text-center`}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell
                                            key={cell.id}
                                            className="truncate"
                                            style={{
                                                width: `${cell.column.getSize()}px`,
                                                flex: `0 0 ${cell.column.getSize()}px`
                                            }}
                                        >
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <DataTableEmptyMessage colSpan={table.getAllColumns().length}/>
                        )}
                    </TableBody>
                </Table>
            </div>

            <DataTablePagination table={table}/>
        </>
    )
}

export default DataTable