import {queryOptions} from "@tanstack/react-query";
import {getEllipses} from "@/features/Map/api/ellipses.ts";

const EllipsesQueryOptions = queryOptions({
  queryKey: ["ellipses"],
  queryFn: getEllipses,
});

export { EllipsesQueryOptions };
