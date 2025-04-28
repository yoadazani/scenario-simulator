import {queryOptions} from "@tanstack/react-query";
import {getSubdistricts} from "@/features/Map/api/subdistricts.ts";

const SubDistrictsQueryOptions = queryOptions({
  queryKey: ["subdistricts"],
  queryFn: getSubdistricts
});

export { SubDistrictsQueryOptions };
