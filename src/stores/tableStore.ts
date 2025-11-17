import {create} from "zustand";
import {immer} from "zustand/middleware/immer";
import {persist} from "zustand/middleware";
import {
    ColumnFiltersState,
    GlobalFilterTableState,
    PaginationState,
    SortingState,
    Updater,
    VisibilityState
} from "@tanstack/react-table";
import {useFilters} from "@/hooks/use-filters.ts";
import {RegisteredRouter, RouteIds} from "@tanstack/react-router";
import {
    columnFiltersToQuery,
    columnFiltersToState,
    globalFiltersToState, paginationToState, sortByToState,
    stateToColumnFilters, stateToGlobalFilters, stateToPagination,
    stateToSortBy
} from "@/utils/filters.ts";


type TableState = {
    columnVisibility: Record<string, boolean>,
    pagination: PaginationState,
    sorting: SortingState,
    globalFilters: GlobalFilterTableState,
    columnFilters: ColumnFiltersState
}

type TableActions = {
    setColumnVisibility: (updaterOrValue: Updater<VisibilityState>) => void
    setPagination: (updaterOrValue: Updater<PaginationState>) => void
    setSorting: (updaterOrValue: Updater<SortingState>) => void,
    setGlobalFilters: (updaterOrValue: Updater<GlobalFilterTableState>) => void,
    setColumnFilters: (newColumnFiltersState: ColumnFiltersState) => void,
    resetColumnFilters: () => void,
}

type TableStore = TableState & TableActions

export const useTableStore = <T extends RouteIds<RegisteredRouter["routeTree"]>>(routeId: T, defaultColumnVisibility?: Record<string, boolean>) => {
    const {setFilters, filters} = useFilters(routeId);
    return create<TableStore, [["zustand/persist", unknown], ["zustand/immer", never]]>(
        persist(
            immer((set, get) => {
                return {
                    columnVisibility: defaultColumnVisibility ?? {},
                    pagination: paginationToState(filters?._page, filters?._per_page),
                    sorting: sortByToState(filters?._sort),
                    globalFilters: globalFiltersToState(filters?._q),
                    columnFilters: columnFiltersToState(columnFiltersToQuery(filters)),
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

                        return setFilters?.({
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

                        return setFilters?.({
                            _sort: sorting?._sort
                        })
                    },
                    setGlobalFilters: (updaterOrValue) => {
                        const newGlobalFiltersState = typeof updaterOrValue === "function" ? updaterOrValue(get().globalFilters) : updaterOrValue
                        const globalFilters = stateToGlobalFilters(newGlobalFiltersState)

                        set((state) => {
                            state.globalFilters = newGlobalFiltersState
                        })
                        return setFilters?.({
                            _q: globalFilters?._q,
                            _fuzzy: globalFilters?._fuzzy
                        })
                    },
                    setColumnFilters: (newColumnFiltersState) => {
                        const columnFilters = stateToColumnFilters(newColumnFiltersState)


                        set((state) => {
                            state.columnFilters = newColumnFiltersState
                        })

                        const combinedFilters = columnFilters.reduce((acc, filter) => {
                            const key = Object.keys(filter)[0];
                            acc[key] = filter[key];
                            return acc;
                        }, {});

                        return setFilters?.(combinedFilters)
                    },
                    resetColumnFilters: () => {
                        const emptyColumnFiltersState = get().columnFilters.map(filter => {
                            return {
                                id: filter.id,
                                value: undefined,
                            }
                        })

                        set((state) => {
                            state.columnFilters = emptyColumnFiltersState
                        })

                        const emptyColumnFilters = stateToColumnFilters(emptyColumnFiltersState)

                        const combinedFilters = emptyColumnFilters.reduce((acc, filter) => {
                            const key = Object.keys(filter)[0];
                            acc[key] = filter[key];
                            return acc;
                        }, {});

                        return setFilters?.(combinedFilters)
                    }
                }
            }),
            {
                name: `${routeId}-table-store` as const,
                partialize: (state) => ({
                    columnVisibility: state.columnVisibility,
                })
            }
        )
    )
}