import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import {SortDirection, SortingState} from "@tanstack/react-table";
import packageJson from "../../package.json";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const tryCatch = async <T>(
  promise: Promise<T> | Axios.IPromise<T>
): Promise<[undefined, T] | [Error]> => {
  try {
    const result = await promise;
    return [undefined, result];
  } catch (error) {
    const err = error as Error;
    return [err];
  }
};

export const convertToIsraelDateFormat = (value: string | Date | undefined) => {
    if (!value) return "";
    return new Date(value).toLocaleString("IL", {
day: "numeric",
        month: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: false,
    }).split(",").reverse().join(" ")
}

export const stateToSortBy = (sorting: SortingState | undefined) => {
    if (!sorting || sorting.length == 0) return undefined;

    const sort = sorting[0];

    return {
        _sort: sort.desc ? `-${sort.id.split('_').join('.')}` : sort.id.split('_').join('.'),
    } as const;
};

export const sortByToState = (sortBy: string | undefined) => {
    if (!sortBy) return [];

    return [{ id: sortBy.split('.').join('_').replace("-", ""), desc: sortBy.startsWith("-") }];
};

export const getVersion = () => {
    return `גרסה | v${packageJson.version} - ${packageJson.buildDate}`
}