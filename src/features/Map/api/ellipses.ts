import {tryCatch} from "@/utils";
import axios from "axios";
import {RocketAttack} from "@/features/Map/types/map.type";

const backendBaseUrl = import.meta.env.VITE_BACKEND_URL

export const getEllipses = async () => {
    const [error, result] = await tryCatch(axios.get<RocketAttack[]>(`${backendBaseUrl}/ellipses`));
    if (error) throw error;
    return result.data
}