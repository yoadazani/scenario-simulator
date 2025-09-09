import {createRootRoute} from '@tanstack/react-router'
import App from "@/App";
import {queryClient} from "@/main.tsx";
import {EventsQueryOptions} from "@/features/Events/queries/events.query.tsx";
import {EllipsesQueryOptions} from "@/features/Map/queries/ellipses.query.tsx";
import {SubDistrictsQueryOptions} from "@/features/Map/queries/subdistricts.query.tsx";
import {DistrictsQueryOptions} from "@/features/Map/queries/districts.query.tsx";

export const Route = createRootRoute({
    component: App,
    loader: async () => {
        await queryClient.ensureQueryData(EventsQueryOptions())
        await queryClient.ensureQueryData(EllipsesQueryOptions)
        await queryClient.ensureQueryData(SubDistrictsQueryOptions)
        await queryClient.ensureQueryData(DistrictsQueryOptions)
    }
})
