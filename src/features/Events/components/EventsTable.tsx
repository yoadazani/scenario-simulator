import {eventsColumnDef} from "@/features/Events/data/events-column-def";
import DataTable from "@/components/shared/DataTable";
import {useQuery} from "@tanstack/react-query";
import {EventsQueryOptions} from "@/features/Events/queries/events.query";
import {RegisteredRouter, RouteIds, useLoaderData} from "@tanstack/react-router";
import {Filters, useFilters} from "@/hooks/use-filters.ts";
import {Skeleton} from "@/components/ui/skeleton.tsx";
import {Event} from "@/features/Events/types";
import {PaginationResponse} from "@/features/Events/api/events";
import {useTableStore} from "@/stores/tableStore";
import {useShallow} from "zustand/shallow";
import {defaultColumnVisibility} from "@/features/Events/data/default-column-visibility";
import {useMemo} from "react";

const EventsTable = <T extends RouteIds<RegisteredRouter["routeTree"]>>({routeId}: { routeId: T }) => {
    const {filters} = useFilters(routeId);
    const enumsData = useLoaderData({from: routeId})
    const eventsTableStore = useTableStore(routeId, defaultColumnVisibility)
    const tableStore = eventsTableStore(useShallow((state) => {
        return {
            columnVisibility: state.columnVisibility,
            setColumnVisibility: state.setColumnVisibility,
            pagination: state.pagination,
            setPagination: state.setPagination,
            sorting: state.sorting,
            setSorting: state.setSorting,
            globalFilters: state.globalFilters,
            setGlobalFilters: state.setGlobalFilters,
            columnFilters: state.columnFilters,
            setColumnFilters: state.setColumnFilters,
            resetColumnFilters: state.resetColumnFilters,
            rowSelection: state.rowSelection,
            setRowSelection: state.setRowSelection,
        };
    }))
    const {data, isLoading, isError, error} = useQuery(EventsQueryOptions(filters as Filters))

    const columns = useMemo(() => eventsColumnDef(enumsData), [tableStore.rowSelection]);
    const responseData = data as PaginationResponse<Event> | undefined

    if (!responseData || isLoading) return <Skeleton className="h-[calc(100vh - 6rem)] w-full"/>
    if (isError) return <div>{error.message}</div>

    return <DataTable
        columns={columns}
        data={responseData.data}
        rowCount={responseData.items}
        columnVisibility={tableStore.columnVisibility}
        setColumnVisibility={tableStore.setColumnVisibility}
        pagination={tableStore.pagination}
        setPagination={tableStore.setPagination}
        sorting={tableStore.sorting}
        setSorting={tableStore.setSorting}
        globalFilters={tableStore.globalFilters}
        setGlobalFilters={tableStore.setGlobalFilters}
        columnFilters={tableStore.columnFilters}
        setColumnFilters={tableStore.setColumnFilters}
        resetColumnFilters={tableStore.resetColumnFilters}
        rowSelection={tableStore.rowSelection}
        setRowSelection={tableStore.setRowSelection}
    />
}

export default EventsTable;