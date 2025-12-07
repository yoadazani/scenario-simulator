import '@tanstack/react-table'
import {useCallback, useMemo, useRef} from "react";
import {
    ColumnDef, ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    GlobalFilterTableState,
    PaginationState,
    RowData,
    SortingState,
    Updater,
    useReactTable,
    VisibilityState
} from "@tanstack/react-table"
import {closestCorners, DndContext} from "@dnd-kit/core";
import {horizontalListSortingStrategy, SortableContext} from "@dnd-kit/sortable";
import {restrictToHorizontalAxis} from "@dnd-kit/modifiers";
import {useDnd} from "@/hooks/use-dnd.ts";
import {AccessorKeys, Options} from "@/types";
import {useVirtualizer} from "@tanstack/react-virtual";
import {Table, TableBody, TableHeader, TableRow} from "@/components/ui/table"

import ResizeHandler from "@/components/shared/DataTable/ResizeHandler.tsx";
import DataTableView from "@/components/shared/DataTable/DataTableView.tsx";
import DataTablePagination from "@/components/shared/DataTable/DataTablePagination.tsx";
import DataTableFilters from "@/components/shared/DataTable/DataTableFilters.tsx";
import SortingIndicator from "@/components/shared/DataTable/SortingIndicator.tsx";
import DataTableActions from "@/components/shared/DataTable/DataTableActions.tsx";
import DataTableEmptyMessage from "@/components/shared/DataTable/DataTableEmptyMessage";
import DragAlongCell from "@/components/shared/DataTable/DragAlongCell.tsx";
import DraggableHeader from "@/components/shared/DataTable/DraggableHeader.tsx";
import DataTableGlobalFilter from "@/components/shared/DataTable/DataTableGlobalFilter.tsx";
import ColumnDragOverlay from "@/components/shared/DataTable/ColumnDragOverlay.tsx";
import {cn} from "@/utils";

declare module '@tanstack/react-table' {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface ColumnMeta<TData extends RowData, TValue> {
        filterGroupKey?: string
        filterGroupLabel?: string
        filterKey?: AccessorKeys<TData>
        filterLabel?: string,
        filterPlaceholder?: string,
        filterVariant?: 'text' | 'number' | 'date' | 'range' | 'datetime-range' | 'select' | 'multi-select' | 'radio-group' | 'classification'
        filterOptions?: Options[]
        enableColumnOrdering?: boolean
    }
}

interface DataTableProps<TData extends object, TValue> {
    columns: ColumnDef<TData, TValue>[],
    data: TData[],
    rowCount: number,
    columnVisibility: VisibilityState,
    setColumnVisibility: (updaterOrValue: Updater<VisibilityState>) => void,
    pagination: PaginationState,
    setPagination: (updater: Updater<PaginationState>) => void,
    sorting?: SortingState,
    setSorting?: (updater: Updater<SortingState>) => void,
    globalFilters?: GlobalFilterTableState,
    setGlobalFilters?: (updater: Updater<GlobalFilterTableState>) => void,
    columnFilters?: ColumnFiltersState,
    setColumnFilters?: (newColumnFiltersState: ColumnFiltersState) => void,
    resetColumnFilters?: () => void,
    rowSelection?: Record<string, boolean>,
    setRowSelection?: (updater: Updater<Record<string, boolean>>) => void
}

const DataTable = <TData extends object, TValue>(props: DataTableProps<TData, TValue>) => {
    const {
        columns,
        data,
        columnVisibility,
        setColumnVisibility,
        rowCount,
        pagination,
        setPagination,
        sorting,
        setSorting,
        globalFilters,
        setGlobalFilters,
        columnFilters,
        setColumnFilters,
        resetColumnFilters,
        rowSelection,
        setRowSelection
    } = props
    const tableContainerRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);

    const columnIds = useMemo(() => columns.map(col => col.id!), [columns]);
    const dnd = useDnd<string>(columnIds);

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
        enableGlobalFilter: true,
        enableHiding: true,
        enableRowSelection: true,
        enableColumnPinning: true,
        onSortingChange: setSorting,
        onPaginationChange: setPagination,
        onColumnVisibilityChange: setColumnVisibility,
        onGlobalFilterChange: setGlobalFilters,
        onColumnOrderChange: dnd.setColumnOrder,
        onRowSelectionChange: setRowSelection,
        getRowId: (originalRow, index) => {
            if ('id' in originalRow)
                return `${originalRow.id}`
            else return `${index}`
        },
        state: {
            sorting: sorting,
            pagination: pagination,
            columnVisibility: columnVisibility,
            globalFilter: globalFilters,
            rowSelection: rowSelection,
            columnOrder: dnd.columnOrder,
        },
    })

    const rows = table.getRowModel().rows;
    const rowVirtualizer = useVirtualizer({
        count: rows.length,
        getScrollElement: useCallback(() => tableContainerRef.current, []),
        estimateSize: useCallback(() => 54, []),
        getItemKey: useCallback((index: number) => rows[index].id, [rows]),
        overscan: 5,
    });

    const virtualItems = rowVirtualizer.getVirtualItems();

    const totalTableWidth = table.getTotalSize()
    const isAnyColumnResizing = useMemo(() => {
        return Boolean(table.getState().columnSizingInfo?.isResizingColumn)
    }, [table.getState().columnSizingInfo?.isResizingColumn])

    return (
        <div>
            <div className="flex justify-between items-center gap-2 py-2">
                <div className="flex gap-2 items-center">
                    <DataTableView table={table} columnVisibility={columnVisibility}/>
                    <DataTableGlobalFilter table={table}/>

                    {(columnFilters && setColumnFilters && resetColumnFilters) && <DataTableFilters
                        containerRef={containerRef}
                        columns={columns}
                        table={table}
                        columnFilters={columnFilters}
                        setColumnFilters={setColumnFilters}
                        resetColumnFilters={resetColumnFilters}
                    />
                    }
                </div>
                <div className="flex gap-2 items-center">
                    <DataTableActions/>
                </div>
            </div>
            <div className="rounded-md border" ref={containerRef}>
                <DndContext
                    sensors={dnd.sensors}
                    collisionDetection={closestCorners}
                    modifiers={[restrictToHorizontalAxis]}
                    onDragStart={dnd.onDragStart}
                    onDragEnd={dnd.onDragEnd}
                >
                    <SortableContext items={dnd.columnOrder} strategy={horizontalListSortingStrategy}>
                        <div
                            ref={tableContainerRef}
                            className="h-[calc(100vh-10rem)] overflow-y-auto relative"
                        >
                            <Table
                                style={{
                                    width: `${totalTableWidth}px`,
                                    tableLayout: 'fixed' as const,
                                }}
                            >
                                <TableHeader
                                    className="table-header-group sticky top-0 w-full z-10 bg-stone-50 ring-1 ring-stone-200">
                                    {table.getHeaderGroups().map((headerGroup) => (
                                        <TableRow key={headerGroup.id}>
                                            {headerGroup.headers.map((header) => {
                                                const enableColumnOrdering = header.column.columnDef.meta?.enableColumnOrdering !== false;
                                                return <DraggableHeader
                                                    key={header.id}
                                                    header={header}
                                                    isAnyColumnResizing={isAnyColumnResizing}
                                                    allowDragging={enableColumnOrdering}
                                                >
                                                    <div className={cn("flex items-center", (
                                                        !enableColumnOrdering ? 'justify-center' : 'justify-between'
                                                    ))}>
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
                                </TableHeader>
                                <TableBody className="relative" style={{height: `${rowVirtualizer.getTotalSize()}px`}}>
                                    {virtualItems?.length ? (
                                        virtualItems.map(virtualRow => {
                                            const row = rows[virtualRow.index];
                                            return (
                                                <TableRow
                                                    key={virtualRow.key}
                                                    data-index={virtualRow.index}
                                                    ref={node => rowVirtualizer.measureElement(node)}
                                                    data-state={row.getIsSelected() && "selected"}
                                                    className="absolute left-0 flex items-center"
                                                    style={{
                                                        transform: `translateY(${virtualRow.start}px)`,
                                                        height: `${virtualRow.size}px`,
                                                    }}
                                                >
                                                    {row.getVisibleCells().map(cell => (
                                                        <DragAlongCell key={cell.id} cell={cell}/>
                                                    ))}
                                                </TableRow>
                                            );
                                        })
                                    ) : (
                                        <DataTableEmptyMessage colSpan={table.getAllColumns().length}/>
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                        {dnd.activeId && <ColumnDragOverlay activeColumnId={dnd.activeId} table={table}/>}
                    </SortableContext>
                </DndContext>
            </div>

            <DataTablePagination table={table}/>
        </div>
    )
}

export default DataTable;