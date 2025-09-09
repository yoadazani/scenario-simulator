import {eventsColumnDef} from "@/features/Events/data/events-column-def";
import DataTable from "@/components/shared/DataTable";
import {useQuery} from "@tanstack/react-query";
import {EventsQueryOptions} from "@/features/Events/queries/events.query";
import {Event} from "@/features/Events/types";
import {RegisteredRouter, RouteIds} from "@tanstack/react-router";
import {Filters, useFilters} from "@/hooks/useFilters.ts";
import {Skeleton} from "@/components/ui/skeleton.tsx";
import {useMemo} from "react";

const EventsTable = <T extends RouteIds<RegisteredRouter["routeTree"]>>({routeId}: { routeId: T }) => {
    const {filters} = useFilters(routeId);
    const {data, isLoading, isError, error} = useQuery(EventsQueryOptions(filters as Filters))
    const columns = useMemo(() => eventsColumnDef, [])

    if (isLoading) return <Skeleton className="h-[calc(100vh - 6rem)] w-full"/>
    if (isError) return <div>{error.message}</div>

    return <DataTable<Event, never>
        routeId={routeId}
        columns={columns}
        data={data}
    />
}

export default EventsTable;