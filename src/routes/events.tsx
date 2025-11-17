import {createFileRoute} from '@tanstack/react-router'
import EventsTable from "@/features/Events/components/EventsTable";
import {Filters} from "@/hooks/use-filters.ts";
import {useMemo} from "react";
import {queryClient} from "@/main.tsx";
import {EnumsQueryOptions} from "@/queries/enums.query.tsx";

export const Route = createFileRoute('/events')({
    component: RouteComponent,
    validateSearch: (search: Filters) => ({
        _sort: search._sort,
        _page: Number(search._page) || 1,
        _per_page: Number(search._per_page) || 50,
        _q: search._q,
        _fuzzy: search._fuzzy,
    }),
    shouldReload: false,
    loader: async () => {
        return await queryClient.ensureQueryData(EnumsQueryOptions())
    }
})

function RouteComponent() {
    const routeId = useMemo(() => Route.fullPath, [])
    return <EventsTable routeId={routeId}/>
}
