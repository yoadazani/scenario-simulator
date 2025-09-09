import {ColumnDef, flexRender, getCoreRowModel, useReactTable,} from "@tanstack/react-table"

import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table"
import {SendingStatusEnum} from "@/types";
import {useCallback, useMemo} from "react";
import {useFilters} from "@/hooks/useFilters.ts";
import {RegisteredRouter, RouteIds} from "@tanstack/react-router";
import {sortByToState, stateToSortBy} from "@/lib/utils.ts";
import DataTableEmptyMessage from "@/components/shared/DataTable/DataTableEmptyMessage";
import SortingIndicator from "@/components/shared/DataTable/SortingIndicator.tsx";
import ResizeHandler from "@/components/shared/DataTable/ResizeHandler.tsx";
import {TABLE_ROW_COLOR} from "@/constants";

interface DataTableProps<TData extends { sendingStatus?: SendingStatusEnum }, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[],
    routeId: RouteIds<RegisteredRouter["routeTree"]>
}

const DataTable = <TData extends {
    sendingStatus?: SendingStatusEnum
}, TValue>(props: DataTableProps<TData, TValue>) => {
    const {columns, data, routeId} = props
    const {setFilters, filters} = useFilters(routeId)

    const sortingState = useMemo(() => {
        return sortByToState(filters._sort)
    }, [filters._sort])

    const handleSorting = useCallback((updaterOrValue) => {
        const newSortingState = typeof updaterOrValue === "function" ? updaterOrValue(sortingState) : updaterOrValue
        const sorting = stateToSortBy(newSortingState)
        return setFilters({
            _sort: sorting?._sort
        })
    },[filters._sort])

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        columnResizeMode: 'onChange',
        columnResizeDirection: 'rtl',
        enableColumnResizing: true,
        manualFiltering: true,
        manualSorting: true,
        manualPagination: true,
        state: {
            sorting: sortingState,
        },
        onSortingChange: handleSorting
    })

    const totalTableWidth = useMemo(() => {
        return table.getTotalSize()
    }, [table.getState().columnSizing])

    const isAnyColumnResizing = useMemo(() => {
        return Boolean(table.getState().columnSizingInfo?.isResizingColumn)
    }, [table.getState().columnSizingInfo?.isResizingColumn])

    return (
        <div className="rounded-md border overflow-auto h-[calc(100vh-6rem)]">
            <Table className="h-full" style={{
                width: `${totalTableWidth}px`,
                tableLayout: 'fixed' as const,
            }}>
                <TableHeader className="table-header-group sticky top-0 right-0 bg-stone-50">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead
                                        className={`relative py-2 px-4 flex-row justify-between items-center w-full truncate ${
                                            isAnyColumnResizing ? "" : "cursor-pointer"
                                        }`}
                                        colSpan={header.colSpan}
                                        onDoubleClick={header.column.resetSize}
                                        style={{width: `${header.getSize()}px`}}
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
                                );
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
                                className={`${TABLE_ROW_COLOR[row.original.sendingStatus] as SendingStatusEnum} text-center`}
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell
                                        key={cell.id}
                                        className="truncate"
                                        style={{width: `${cell.column.getSize()}px`}}
                                    >
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <DataTableEmptyMessage colSpan={columns.length}/>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}

export default DataTable