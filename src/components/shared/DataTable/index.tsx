import '@tanstack/react-table'
import {useMemo} from "react";
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    PaginationState,
    RowData,
    SortingState,
    Updater,
    useReactTable,
    VisibilityState
} from "@tanstack/react-table"
import {Table, TableBody, TableHeader, TableRow} from "@/components/ui/table"
import {SendingStatusEnum, WithSendingStatus} from "@/types";
import {TABLE_ROW_COLOR} from "@/constants";
import SortingIndicator from "@/components/shared/DataTable/SortingIndicator.tsx";
import ResizeHandler from "@/components/shared/DataTable/ResizeHandler.tsx";
import DataTableView from "@/components/shared/DataTable/DataTableView.tsx";
import DataTablePagination from "@/components/shared/DataTable/DataTablePagination.tsx";
import DataTableActions from "@/components/shared/DataTable/DataTableActions.tsx";
import DataTableEmptyMessage from "@/components/shared/DataTable/DataTableEmptyMessage";
import {closestCorners, DndContext} from "@dnd-kit/core";
import {horizontalListSortingStrategy, SortableContext} from "@dnd-kit/sortable";
import {restrictToHorizontalAxis} from "@dnd-kit/modifiers";
import {useDnd} from "@/hooks/use-dnd.ts";
import {DraggableHeader} from "@/components/shared/DataTable/DraggableHeader.tsx";
import {DragAlongCell} from "@/components/shared/DataTable/DragAlongCell.tsx";
import {ColumnDragOverlay} from "@/components/shared/DataTable/ColumnDragOverlay.tsx";

declare module '@tanstack/react-table' {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface ColumnMeta<TData extends RowData, TValue> {
        filterKey?: keyof TData
        filterVariant?: 'text' | 'number' | 'date' | 'select' | 'multi-select' | 'range' | 'datetime-range'
        filterOptions?: {
            label: string
            value: string | number
        }[]
    }
}

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[],
    data: TData[],
    rowCount: number,
    columnVisibility: VisibilityState,
    setColumnVisibility: (updaterOrValue: Updater<VisibilityState>) => void,
    pagination: PaginationState,
    setPagination: (updater: Updater<PaginationState>) => void,
    sorting?: SortingState,
    setSorting?: (updater: Updater<SortingState>) => void,
}

const DataTable = <TData extends WithSendingStatus, TValue>(props: DataTableProps<TData, TValue>) => {
    const {
        columns,
        data,
        columnVisibility,
        setColumnVisibility,
        rowCount,
        pagination,
        setPagination,
        sorting,
        setSorting
    } = props

    const dnd = useDnd<string>(columns.map(col => col.id!))
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
        onSortingChange: setSorting,
        onPaginationChange: setPagination,
        onColumnVisibilityChange: setColumnVisibility,
        onColumnOrderChange: dnd.setColumnOrder,
        state: {
            sorting: sorting,
            pagination: pagination,
            columnVisibility: columnVisibility,
            columnOrder: dnd.columnOrder
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
                <DndContext
                    sensors={dnd.sensors}
                    collisionDetection={closestCorners}
                    modifiers={[restrictToHorizontalAxis]}
                    onDragStart={dnd.onDragStart}
                    onDragEnd={dnd.onDragEnd}
                >
                    <Table className="h-full"
                           style={{
                               width: `${totalTableWidth}px`,
                               tableLayout: 'fixed' as const,
                           }}>
                        <TableHeader className="table-header-group sticky top-0 right-0 bg-stone-50">
                            <SortableContext items={dnd.columnOrder} strategy={horizontalListSortingStrategy}>
                                {table.getHeaderGroups().map((headerGroup) => (
                                    <TableRow key={headerGroup.id}>
                                        {headerGroup.headers.map((header) => {
                                            return <DraggableHeader
                                                key={header.id}
                                                header={header}
                                                isAnyColumnResizing={isAnyColumnResizing}
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
                                            </DraggableHeader>
                                        })}
                                    </TableRow>
                                ))}
                            </SortableContext>
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
                                            <SortableContext
                                                key={cell.id}
                                                items={dnd.columnOrder}
                                                strategy={horizontalListSortingStrategy}
                                            >
                                                <DragAlongCell cell={cell}/>
                                            </SortableContext>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <DataTableEmptyMessage colSpan={table.getAllColumns().length}/>
                            )}
                        </TableBody>
                    </Table>
                    {dnd.activeId && <ColumnDragOverlay activeColumnId={dnd.activeId} table={table}/>}
                </DndContext>
            </div>

            <DataTablePagination table={table}/>
        </>
    )
}

export default DataTable