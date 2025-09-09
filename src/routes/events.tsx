import {createFileRoute} from '@tanstack/react-router'
import EventsTable from "@/features/Events/components/EventsTable";
import {Filters} from "@/hooks/useFilters.ts";
import {useMemo} from "react";

export const Route = createFileRoute('/events')({
    component: RouteComponent,
    validateSearch: () => ({} as Filters),
})

function RouteComponent() {
    const routeId = useMemo(() => Route.fullPath, [])
    return <EventsTable routeId={routeId}/>
}
