import {queryOptions} from "@tanstack/react-query";
import {getEvents} from "@/features/Events/api/events";

const EventsQueryOptions = queryOptions({
    queryKey: ["events"],
    queryFn: getEvents,
});

export {EventsQueryOptions};
