import {tryCatch} from "@/lib/utils";
import axios from "axios";
import {DistrictAndSubdistrict} from "@/features/Map/types/map.type";

export const getDistricts = async () => {
    const [error, result] = await tryCatch(axios.get("http://localhost:3000/districts"));
    if (error) throw error;
    return result.data as DistrictAndSubdistrict[];
}