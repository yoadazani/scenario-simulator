import {tryCatch} from "@/lib/utils";
import axios from "axios";
import {Event} from "@/features/Events/types";
import {Filters} from "@/hooks/useFilters.ts";

export const getEvents = async (filters?: Filters) => {
    const [error, result] = await tryCatch(axios.get("http://localhost:3000/events", {
        params: filters,
    }));
    if (error) throw error;
    return result.data as Event[]
}