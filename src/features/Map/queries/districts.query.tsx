import { queryOptions } from "@tanstack/react-query";
import { DistrictAndSubdistrict } from "../types/map.type.ts";
import axios from "axios";
import { tryCatch } from "@/lib/utils";


const getDistricts = async () => {
  const [error, result] = await tryCatch(axios.get("http://localhost:3000/districts"));
  if (error) throw error;
  return result.data as DistrictAndSubdistrict[];
}

const DisrictsQueryOptions = queryOptions({
  queryKey: ["districts"],
  queryFn: getDistricts,
});

export { DisrictsQueryOptions };
