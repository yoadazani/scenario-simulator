import {ColumnFiltersState, GlobalFilterTableState, PaginationState, SortingState} from "@tanstack/react-table";
import {Filters} from "@/hooks/use-filters.ts";
import {FilterValue} from "@/types";

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

export const stateToGlobalFilters = (globalFiltersState: GlobalFilterTableState) => {
    if (!globalFiltersState.globalFilter) return {};
    return {
        _q: globalFiltersState.globalFilter,
        _fuzzy: !!globalFiltersState.globalFilter
    };
}

export const globalFiltersToState = (globalFilter?: string) => {
    if (!globalFilter) return {} as GlobalFilterTableState;
    return {
        globalFilter: globalFilter,
    };
}

export const stateToColumnFilters = (columnFiltersState: ColumnFiltersState) => {
    if (!columnFiltersState.length) return [];
    return columnFiltersState.map(filter => {
        return {
            [filter.id]: filter.value,
        }
    });
}

export const columnFiltersToState = (columnFilters?: string) => {
    if (!columnFilters) return [] as ColumnFiltersState;
    return columnFilters.replace('?', '').split('&').map(filter => {
        const [key, value] = filter.split('=');
        return {
            id: key,
            value: decodeURIComponent(value),
        }
    });
}

export const columnFiltersToQuery = (filters: Partial<Filters> | undefined): string => {
    const entries = Object.entries(filters!).filter(([key]) => !key.startsWith('_'));

    if (entries.length === 0) return '';

    const queryString = entries
        .map(([key, value]) => `${key}=${encodeURIComponent(String(value))}`)
        .join('&');

    return `?${queryString}`;
}

export const cleanEmptyParams = <T extends Record<string, unknown>>(
    search: T
) => {
    const newSearch = {...search}
    Object.keys(newSearch).forEach(key => {
        const value = newSearch[key]
        if (
            value === undefined ||
            value === '' ||
            (typeof value === 'number' && isNaN(value))
        ) delete newSearch[key]
    })

    return newSearch
}

export const normalizeId = (id: string) => id.replaceAll('.', '_');
export const denormalizeId = (key: string) => key.replaceAll('_', '.');

export function applyRangeValue(
    acc: Record<string, FilterValue>,
    id: string,
    value: Date | string | undefined,
    keyPart: 'from' | 'to'
) {
    const key = id.replace(`_${keyPart === 'from' ? 'gte' : 'lte'}`, '').replaceAll('.', '_');
    const existing = acc[key];
    const range =
        typeof existing === 'object' && 'range' in existing
            ? existing.range
            : {from: undefined, to: undefined};
    acc[key] = {range: {...range, [keyPart]: value}};
    return acc;
}

export const buildDefaultValues = (filters: ColumnFiltersState, empty = false) => {
    return filters.reduce((acc, filter) => {
        const {id, value} = filter;

        if (id.endsWith('_lte')) {
            return applyRangeValue(acc, id, empty ? '' : (value as Date), 'to');
        }
        if (id.endsWith('_gte')) {
            return applyRangeValue(acc, id, empty ? '' : (value as Date), 'from');
        }

        acc[normalizeId(id)] = empty ? '' : (value as string | number);

        return acc;
    }, {} as Record<string, FilterValue>)
};