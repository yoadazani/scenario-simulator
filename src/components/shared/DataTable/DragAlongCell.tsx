import {Cell, flexRender} from "@tanstack/react-table";
import {useSortable} from "@dnd-kit/sortable";
import {CSSProperties, memo, useMemo} from "react";
import {CSS} from "@dnd-kit/utilities";
import {TableCell} from "@/components/ui/table.tsx";

const DragAlongCell = <TData, >({cell}: { cell: Cell<TData, unknown> }) => {
    const {isDragging, setNodeRef, transform, transition} = useSortable({
        id: cell.column.id,
    });

    const style: CSSProperties = useMemo(() => ({
        opacity: isDragging ? 0.5 : 1,
        position: 'relative',
        transform: CSS.Translate.toString(transform),
        transition,
        zIndex: isDragging ? 1 : 0,
        width: `${cell.column.getSize()}px`,
        flex: `0 0 ${cell.column.getSize()}px`,
    }), [isDragging, transform, transition, cell.column.getSize()]);

    return (
        <TableCell
            ref={setNodeRef}
            key={cell.column.id}
            className="truncate"
            style={style}
        >
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
    );
};

export default memo(DragAlongCell) as typeof DragAlongCell