import {
    DragEndEvent, DragStartEvent,
    KeyboardSensor,
    MouseSensor,
    PointerSensor,
    TouchSensor,
    useSensor,
    useSensors
} from "@dnd-kit/core";
import {arrayMove} from "@dnd-kit/sortable";
import {useCallback, useState} from "react";

export const useDnd = <T>(items: T[]) => {
    const [columnOrder, setColumnOrder] = useState<T[]>(items)
    const [activeId, setActiveId] = useState<T | null>(null)

    // These sensors are created once per component instance
    const sensors = useSensors(
        useSensor(MouseSensor, {}),
        useSensor(TouchSensor, {}),
        useSensor(KeyboardSensor, {}),
        useSensor(PointerSensor, {}),
    )

    // Use useCallback to memoize event handlers
    const onDragStart = useCallback((event: DragStartEvent) => {
        setActiveId(items.find(item => item === event.active.id) as T)
    }, [items]);

    const onDragEnd = useCallback((event: DragEndEvent) => {
        const {active, over} = event
        if (active && over && active.id !== over.id) {
            setColumnOrder(columnOrder => {
                const oldIndex = columnOrder.findIndex(id => id === active.id)
                const newIndex = columnOrder.findIndex(id => id === over.id)
                return arrayMove(columnOrder, oldIndex, newIndex)
            })
        }
        setActiveId(null)
    }, []);

    return {
        onDragStart,
        onDragEnd,
        sensors,
        activeId,
        columnOrder,
        setColumnOrder,
    }

};