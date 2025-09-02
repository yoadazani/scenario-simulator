import {Skeleton} from "@/components/ui/skeleton.tsx";

const MapFallback = () => (
    <div className="h-[100vh] w-full p-2">
        <Skeleton className="h-full w-full" />
    </div>
);

export default MapFallback;