import { queryOptions } from "@tanstack/react-query";
import { Ellipse } from "../types/map.type.ts";

const EllipsesQueryOptions = queryOptions({
  queryKey: ["ellipses"],
  queryFn: async () => {
    const response = await fetch("http://localhost:3000/ellipses");
    const data = (await response.json()) as Ellipse[];
    return data;
  },
});

export { EllipsesQueryOptions };
