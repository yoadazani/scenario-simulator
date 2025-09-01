import {tryCatch} from "@/lib/utils.ts";
import axios from "axios";
import {RocketAttack} from "@/features/Map/types/map.type.ts";

export const getEllipses = async () => {
    const [error, result] = await tryCatch(axios.get<RocketAttack[]>("http://localhost:3000/ellipses"));
    if (error) throw error;
    return result.data
}