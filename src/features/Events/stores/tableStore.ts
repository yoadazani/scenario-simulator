import {create} from "zustand";
import {immer} from "zustand/middleware/immer";
import {persist} from "zustand/middleware";
import {defaultColumnVisibility} from "@/features/Events/data/default-column-visibility.ts";
import {VisibilityState} from "@tanstack/react-table";


type TableState = {
    columnVisibility: Record<string, boolean>
}

type TableActions = {
    setColumnVisibility: (visibilityState: VisibilityState) => void
}

type TableStore = TableState & TableActions

export const useTableStore = create<TableStore>()(
    persist(
        immer((set) => ({
            columnVisibility: defaultColumnVisibility,
            setColumnVisibility: (columnsVisibility) => {
                set((state) => {
                    state.columnVisibility = columnsVisibility
                })
            }
        })),
        {
            name: "events-table-store",
            partialize: (state) => ({
                columnVisibility: state.columnVisibility
            })
        }
    )
)