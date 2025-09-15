import {createFileRoute} from '@tanstack/react-router'
import EventsTable from "@/features/Events/components/EventsTable";
import {Filters} from "@/hooks/useFilters.ts";
import {useMemo} from "react";

export const Route = createFileRoute('/events')({
    component: RouteComponent,
    validateSearch: (search: Filters) => ({
        _sort: search._sort,
        _page: Number(search._page) || 1,
        _per_page: Number(search._per_page) || 50,
    }),
})

function RouteComponent() {
    const routeId = useMemo(() => Route.fullPath, [])
    return <EventsTable routeId={routeId}/>
}
