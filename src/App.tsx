import {Suspense} from "react";
import Map from "@/features/Map/components";
import AppFallback from "@/components/shared/AppFallback.tsx";

import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"

function App() {
    return (
        <Suspense name="AppSuspense" fallback={<AppFallback/>}>
            <ResizablePanelGroup direction="horizontal">
                <ResizablePanel defaultSize={35} maxSize={50}>
                    <Map/>
                </ResizablePanel>
                <ResizableHandle withHandle/>
                <ResizablePanel defaultSize={65} maxSize={100}>
                    <span className="font-semibold">Content</span>
                </ResizablePanel>
            </ResizablePanelGroup>
        </Suspense>
    )
}

export default App;
