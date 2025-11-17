import {tryCatch} from "@/utils";
import axios from "axios";
import {Filters} from "@/hooks/use-filters.ts";

export type PaginationResponse<T> = {
    first: number,
    prev: number | null,
    next: number | null,
    last: number,
    pages: number,
    items: number,
    data: T[]
}

const backendBaseUrl = import.meta.env.VITE_BACKEND_URL

export const getEvents = async (filters?: Filters) => {
    const [error, result] = await tryCatch(axios.get<PaginationResponse<Event>>(`${backendBaseUrl}/events`, {
        params: filters,
    }));
    if (error) throw error;
    return result.data
}