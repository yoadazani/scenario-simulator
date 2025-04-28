import {tryCatch} from "@/lib/utils.ts";
import axios from "axios";
import {Event} from "@/features/Map/types/map.type.ts";

export const getEvents = async () => {
    const [error, result] = await tryCatch(axios.get("http://localhost:3000/events"));
    if (error) throw error;
    return result.data as Event[]
}