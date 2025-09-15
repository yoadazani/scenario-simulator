import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import "@/index.css";
import {keepPreviousData, QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {RouterProvider, createRouter} from '@tanstack/react-router'

import {routeTree} from './routeTree.gen'

const router = createRouter({routeTree})

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router
    }
}

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            gcTime: 1000 * 60 * 10, // 10 minutes
            staleTime: 1000 * 60 * 5, // 5 minutes
            retry: 3,
            retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
            refetchOnWindowFocus: true,
            refetchOnMount: true,
            placeholderData: keepPreviousData,
        },
        mutations: {
            retry: false
        },
    }
});

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router}/>
        </QueryClientProvider>
    </StrictMode>
);
