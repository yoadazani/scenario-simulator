import { queryOptions } from "@tanstack/react-query";
import { Event } from "../types/map.type.ts";

const EventsQueryOptions = queryOptions({
  queryKey: ["events"],
  queryFn: async () => {
    const response = await fetch("http://localhost:3000/events");
    const data = (await response.json()) as Event[];
    return data;
  },
});

export { EventsQueryOptions };
