import {eventsColumnDef} from "@/features/Events/data/events-column-def";
import DataTable from "@/components/shared/DataTable";
import {useQuery} from "@tanstack/react-query";
import {EventsQueryOptions} from "@/features/Events/queries/events.query";
import {RegisteredRouter, RouteIds} from "@tanstack/react-router";
import {Filters, useFilters} from "@/hooks/useFilters.ts";
import {Skeleton} from "@/components/ui/skeleton.tsx";
import {useMemo} from "react";
import {Event} from "@/features/Events/types";
import {PaginationResponse} from "@/features/Events/api/events.ts";
import {useTableStore} from "@/features/Events/stores/tableStore.ts";
import {useShallow} from "zustand/shallow";

const EventsTable = <T extends RouteIds<RegisteredRouter["routeTree"]>>({routeId}: { routeId: T }) => {
    const {filters} = useFilters(routeId);
    const {setColumnVisibility, columnVisibility} = useTableStore(useShallow((state) => {
        return {
            columnVisibility: state.columnVisibility,
            setColumnVisibility: state.setColumnVisibility,
        };
    }))
    const {data, isLoading, isError, error} = useQuery(EventsQueryOptions(filters as Filters))
    const columns = useMemo(() => eventsColumnDef, [])

    const responseData = useMemo(() => data as PaginationResponse<Event> | undefined, []);

    if (!responseData || isLoading) return <Skeleton className="h-[calc(100vh - 6rem)] w-full"/>
    if (isError) return <div>{error.message}</div>

    return <DataTable<Event, never>
        routeId={routeId}
        columns={columns}
        data={responseData.data}
        rowCount={responseData.items}
        columnVisibility={columnVisibility}
        setColumnVisibility={setColumnVisibility}
    />
}

export default EventsTable;