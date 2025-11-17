import {useSortable} from "@dnd-kit/sortable";
import {CSSProperties, memo, ReactNode, useMemo} from "react";
import {CSS} from "@dnd-kit/utilities";
import {TableHead} from "@/components/ui/table.tsx";
import {Header} from "@tanstack/react-table";


interface DraggableHeaderProps<TData> {
    header: Header<TData, unknown>;
    children: ReactNode;
    isAnyColumnResizing?: boolean
}

const DraggableHeader = <TData, >({header, children, isAnyColumnResizing}: DraggableHeaderProps<TData>) => {
    const {attributes, listeners, setNodeRef, transform, transition, isDragging} = useSortable({
        id: header.column.id,
    });

    const style: CSSProperties = useMemo(() => ({
        opacity: isDragging ? 0.5 : 1,
            transform: CSS.Transform.toString(transform),
            transition,
            whiteSpace: "nowrap",
            width: `${header.column.getSize()}px`,
            flex: `0 0 ${header.column.getSize()}px`,
            cursor: isAnyColumnResizing ? "default" : "cursor-pointer",
            zIndex: isDragging ? 1 : 0,
            position: "relative",
    }), [isDragging, transform, transition, header.column.getSize(), isAnyColumnResizing]);

    return (
        <TableHead
            ref={setNodeRef}
            key={header.id}
            className={`py-2 px-4 flex-row justify-between items-center w-full truncate group`}
            colSpan={header.colSpan}
            onDoubleClick={header.column.resetSize}
            style={style}
        >
            <div
                className={`w-full h-1 bg-primary absolute top-0 left-0 cursor-grab active:cursor-grabbing transition-opacity ${
                    isAnyColumnResizing
                        ? 'opacity-0 pointer-events-none'
                        : 'opacity-0 group-hover:opacity-100'
                }`} {...attributes} {...listeners}/>
            {children}
        </TableHead>
    );
};

export default memo(DraggableHeader) as typeof DraggableHeader;