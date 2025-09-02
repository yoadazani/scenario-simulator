import {Suspense} from "react";
import Map from "@/features/Map/components";
import AppFallback from "@/components/shared/AppFallback.tsx";

function App() {
    return (
        <Suspense name="AppSuspense" fallback={<AppFallback />}>
            <Map />
        </Suspense>
    );
}

export default App;
