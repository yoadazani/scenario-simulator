import {queryOptions} from "@tanstack/react-query";
import {getDistricts} from "@/features/Map/api/districts";

const DistrictsQueryOptions = queryOptions({
  queryKey: ["districts"],
  queryFn: getDistricts
});

export { DistrictsQueryOptions };
