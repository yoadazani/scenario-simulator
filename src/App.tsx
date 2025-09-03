import {Suspense} from "react";
import Map from "@/features/Map/components";
import AppFallback from "@/components/shared/AppFallback.tsx";

import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"
import AppSidebar from "@/components/shared/AppSidebar.tsx";

function App() {
    return (
        <Suspense name="AppSuspense" fallback={<AppFallback/>}>
            <ResizablePanelGroup direction="horizontal">
                <ResizablePanel defaultSize={35} maxSize={50}>
                    <Map/>
                </ResizablePanel>
                <ResizableHandle withHandle/>
                <ResizablePanel defaultSize={65} maxSize={100}>
                    <AppSidebar>
                        <div className="flex flex-col items-center justify-center gap-2 p-4">
                        </div>
                    </AppSidebar>
                </ResizablePanel>
            </ResizablePanelGroup>
        </Suspense>
    )
}

export default App;
