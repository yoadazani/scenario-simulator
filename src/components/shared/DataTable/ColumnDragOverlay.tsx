import type {Table as TanstackTable} from "@tanstack/table-core";
import {useMemo} from "react";
import {DragOverlay} from "@dnd-kit/core";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {flexRender} from "@tanstack/react-table";
import {TABLE_ROW_COLOR} from "@/constants";
import {SendingStatusEnum} from "@/types";

export const ColumnDragOverlay = <TData, >(props: { activeColumnId: string, table: TanstackTable<TData> }) => {
    const {activeColumnId, table} = props
    const activeIdHeader = useMemo(() => table.getFlatHeaders().find(header => header.column.id === activeColumnId)!, [activeColumnId])

    return (
        <DragOverlay
            className="bg-stone-50 cursor-grabbing translate-x-10"
            style={{position: 'fixed', top: 85}}
        >
            <div className="rounded-md border overflow-auto h-[calc(100vh-10rem)]">
                <Table className="h-full">
                    <TableHeader className="table-header-group sticky top-0 right-0">
                        <TableRow>
                            <TableHead
                                colSpan={activeIdHeader.colSpan}
                                className={`py-2 px-4 flex-row justify-between items-center w-full truncate group`}
                                style={{
                                    width: `${activeIdHeader.getSize()}px`,
                                    flex: `0 0 ${activeIdHeader.getSize()}px`,
                                }}
                            >
                                <div
                                    className={`w-full h-1 bg-primary absolute top-0 left-0 cursor-grab active:cursor-grabbing transition-opacity`}/>
                                {flexRender(
                                    activeIdHeader.column.columnDef.header,
                                    activeIdHeader.getContext()
                                )}
                            </TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {table.getRowModel().rows.map((row) => (
                            <TableRow
                                key={row.id}
                                className={`${TABLE_ROW_COLOR[row.original.sendingStatus as SendingStatusEnum]} text-center`}
                            >
                                {row.getVisibleCells()
                                    .filter(cell => cell.column.id === activeColumnId)
                                    .map((cell) => (
                                        <TableCell
                                            key={cell.column.id}
                                            className="truncate"
                                            style={{
                                                width: `${cell.column.getSize()}px`,
                                                flex: `0 0 ${cell.column.getSize()}px`,
                                            }}
                                        >
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </DragOverlay>
    )
}