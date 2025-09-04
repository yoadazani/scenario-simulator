import {tryCatch} from "@/lib/utils";
import axios from "axios";
import {Event} from "@/features/Events/types";

export const getEvents = async () => {
    const [error, result] = await tryCatch(axios.get("http://localhost:3000/events"));
    if (error) throw error;
    return result.data as Event[]
}