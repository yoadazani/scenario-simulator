import {getRouteApi, RegisteredRouter, RouteIds, useLocation, useNavigate} from "@tanstack/react-router";

export type Filters = {
    _sort: string,
}

export const useFilters = <T extends RouteIds<RegisteredRouter["routeTree"]>>(routeId: T) => {
    const routeApi = getRouteApi<T>(routeId)
    const {pathname} = useLocation()
    const navigate = useNavigate()
    const filters = routeApi.useSearch() as Partial<Filters>

    const setFilters = async (partialFilters: Partial<Filters>) => navigate({
        to: pathname,
        search: (prev => ({...prev, ...partialFilters}))
    })


    const resetFilters = async () => navigate({
        to: pathname,
        search: {}
    })

    return {
        filters,
        setFilters,
        resetFilters
    }
}