import {tryCatch} from "@/utils";
import axios from "axios";
import {DistrictAndSubdistrict} from "@/features/Map/types/map.type";

const backendBaseUrl = import.meta.env.VITE_BACKEND_URL

export const getDistricts = async () => {
    const [error, result] = await tryCatch(axios.get(`${backendBaseUrl}/districts`));
    if (error) throw error;
    return result.data as DistrictAndSubdistrict[];
}