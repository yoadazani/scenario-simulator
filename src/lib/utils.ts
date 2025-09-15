import {type ClassValue, clsx} from "clsx";
import {twMerge} from "tailwind-merge";
import {PaginationState, SortingState} from "@tanstack/react-table";
import packageJson from "../../package.json";
import {format} from "date-fns"
import {TZDate} from "@date-fns/tz";

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

export const convertToIsraelDateFormat = (value: Date | undefined) => {
    if (!value) return "";
    const tzDate = new TZDate(value, "Asia/Jerusalem");
    return format(tzDate, "dd-MM-yyyy HH:mm")
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

    return [{id: sortBy.split('.').join('_').replace("-", ""), desc: sortBy.startsWith("-")}];
};

export const stateToPagination = (paginationState: PaginationState) => {
    return {
        _page: paginationState.pageIndex + 1,
        _per_page: paginationState.pageSize
    };
}

export const paginationToState = (page?: number, perPage?: number) => {
    if (!page || !perPage) return {} as PaginationState;
    return {
        pageIndex: page - 1,
        pageSize: perPage,
    };
}

export const getVersion = () => {
    return `גרסה | v${packageJson.version} - ${packageJson.buildDate}`
}