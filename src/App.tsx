import {Suspense} from "react";
import {ResizableHandle, ResizablePanel, ResizablePanelGroup} from "@/components/ui/resizable";
import AppFallback from "@/components/shared/Skeletons/AppFallback.tsx";
import AppSidebar from "@/components/shared/AppSidebar";
import {Outlet} from "@tanstack/react-router";
import {TanStackRouterDevtools} from "@tanstack/react-router-devtools";
import Map from "@/features/Map/components";

function App() {
    return (
        <Suspense name="AppSuspense" fallback={<AppFallback/>}>
            <ResizablePanelGroup direction="horizontal">
                <ResizablePanel defaultSize={35} maxSize={50}>
                    <Map/>
                </ResizablePanel>
                <ResizableHandle withHandle className="bg-muted hover:bg-border hover:duration-500 p-1"/>
                <ResizablePanel defaultSize={65} maxSize={100}>
                    <AppSidebar>
                        <Outlet/>
                    </AppSidebar>
                </ResizablePanel>
            </ResizablePanelGroup>
            <TanStackRouterDevtools/>
        </Suspense>
    )
}

export default App;
