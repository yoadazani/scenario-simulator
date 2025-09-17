import {create} from "zustand";
import {immer} from "zustand/middleware/immer";
import {persist} from "zustand/middleware";
import {defaultColumnVisibility} from "@/features/Events/data/default-column-visibility.ts";
import {PaginationState, SortingState, Updater, VisibilityState} from "@tanstack/react-table";
import {paginationToState, sortByToState, stateToPagination, stateToSortBy} from "@/lib/utils.ts";
import {Filters} from "@/hooks/useFilters.ts";


type TableState = {
    columnVisibility: Record<string, boolean>,
    pagination: PaginationState,
    sorting: SortingState
}

type TableActions = {
    setColumnVisibility: (updaterOrValue: Updater<VisibilityState>) => void
    setPagination: (updaterOrValue: Updater<PaginationState>) => void
    setSorting: (updaterOrValue: Updater<SortingState>) => void
}

type TableStore = TableState & TableActions

export const useTableStore = (setFilters?: () => Promise<void>, filters?: Partial<Filters>) => create<TableStore>()(
    persist(
        immer((set, get) => ({
            columnVisibility: defaultColumnVisibility,
            pagination: paginationToState(filters?._page, filters?._per_page),
            sorting: sortByToState(filters?._sort),
            setColumnVisibility: (updaterOrValue) => {
                const newColumnVisibility = typeof updaterOrValue === 'function' ? updaterOrValue(get().columnVisibility) : updaterOrValue
                set((state) => {
                    state.columnVisibility = newColumnVisibility
                })
            },
            setPagination: (updaterOrValue) => {
                const newPaginationState = typeof updaterOrValue === "function" ? updaterOrValue(get().pagination) : updaterOrValue
                const pagination = stateToPagination(newPaginationState)

                set((state) => {
                    state.pagination = newPaginationState
                })

                return setFilters({
                    _page: pagination?._page,
                    _per_page: pagination?._per_page,
                })
            },
            setSorting: (updaterOrValue) => {
                const newSortingState = typeof updaterOrValue === "function" ? updaterOrValue(get().sorting) : updaterOrValue
                const sorting = stateToSortBy(newSortingState)

                set((state) => {
                    state.sorting = newSortingState
                })

                return setFilters({
                    _sort: sorting?._sort
                })
            },
        })),
        {
            name: "events-table-store",
            partialize: (state) => ({
                columnVisibility: state.columnVisibility,
            })
        }
    )
)