import {eventsColumnDef} from "@/features/Events/data/events-column-def";
import DataTable from "@/components/shared/DataTable";
import {useQuery} from "@tanstack/react-query";
import {EventsQueryOptions} from "@/features/Events/queries/events.query";
import {RegisteredRouter, RouteIds, useLoaderData} from "@tanstack/react-router";
import {Filters, useFilters} from "@/hooks/use-filters.ts";
import {Skeleton} from "@/components/ui/skeleton.tsx";
import {useMemo} from "react";
import {Event} from "@/features/Events/types";
import {PaginationResponse} from "@/features/Events/api/events";
import {useTableStore} from "@/stores/tableStore";
import {useShallow} from "zustand/shallow";
import {defaultColumnVisibility} from "@/features/Events/data/default-column-visibility";

const EventsTable = <T extends RouteIds<RegisteredRouter["routeTree"]>>({routeId}: { routeId: T }) => {
    const {filters} = useFilters(routeId);
    const enumsData = useLoaderData({from: routeId})
    const eventsTableStore = useTableStore(routeId, defaultColumnVisibility)
    const {
        setColumnVisibility,
        columnVisibility,
        pagination,
        setPagination,
        sorting,
        setSorting,
        globalFilters,
        setGlobalFilters,
        columnFilters,
        setColumnFilters,
        resetColumnFilters
    } = eventsTableStore(useShallow((state) => {
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
        };
    }))
    const {data, isLoading, isError, error} = useQuery(EventsQueryOptions(filters as Filters))

    const columns = useMemo(() => eventsColumnDef, [])
    const responseData = useMemo(() => data as PaginationResponse<Event> | undefined, []);

    if (!responseData || isLoading) return <Skeleton className="h-[calc(100vh - 6rem)] w-full"/>
    if (isError) return <div>{error.message}</div>

    return <DataTable
        columns={columns(enumsData)}
        data={responseData.data}
        rowCount={responseData.items}
        columnVisibility={columnVisibility}
        setColumnVisibility={setColumnVisibility}
        pagination={pagination}
        setPagination={setPagination}
        sorting={sorting}
        setSorting={setSorting}
        globalFilters={globalFilters}
        setGlobalFilters={setGlobalFilters}
        columnFilters={columnFilters}
        setColumnFilters={setColumnFilters}
        resetColumnFilters={resetColumnFilters}
    />
}

export default EventsTable;