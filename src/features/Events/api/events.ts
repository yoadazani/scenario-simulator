import {tryCatch} from "@/lib/utils";
import axios from "axios";
import {Filters} from "@/hooks/useFilters.ts";

export type PaginationResponse<T> = {
    first: number,
    prev: number | null,
    next: number | null,
    last: number,
    pages: number,
    items: number,
    data: T[]
}

export const getEvents = async (filters?: Filters) => {
    const [error, result] = await tryCatch(axios.get<PaginationResponse<Event>>("http://localhost:3000/events", {
        params: filters,
    }));
    if (error) throw error;
    return result.data
}