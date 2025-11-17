import {queryOptions} from "@tanstack/react-query";
import {getEvents} from "@/features/Events/api/events";
import {Filters} from "@/hooks/use-filters.ts";

const EventsQueryOptions = (filters?: Filters) => queryOptions({
    queryKey: ["events", filters],
    queryFn: () => getEvents(filters)
});

export {EventsQueryOptions};
