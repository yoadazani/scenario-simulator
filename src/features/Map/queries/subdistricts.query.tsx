import { queryOptions } from "@tanstack/react-query";
import { DistrictAndSubdistrict } from "../types/map.type.ts";
import {tryCatch} from "@/lib/utils.ts";
import axios from "axios";

const getSubdistricts = async () => {
  const [error, result] = await tryCatch(axios.get("http://localhost:3000/subdistricts"));
  if (error) throw error;
  return result.data as DistrictAndSubdistrict[];
}

const SubdisrictsQueryOptions = queryOptions({
  queryKey: ["subdistricts"],
  queryFn: getSubdistricts
});

export { SubdisrictsQueryOptions };
