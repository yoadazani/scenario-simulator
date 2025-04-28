import {queryOptions} from "@tanstack/react-query";
import {getEvents} from "@/features/Map/api/events.ts";

const EventsQueryOptions = queryOptions({
    queryKey: ["events"],
    queryFn: getEvents,
});

export {EventsQueryOptions};
