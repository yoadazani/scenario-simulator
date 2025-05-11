import {Loader} from "lucide-react";

export const Loading = () => {
    return <div className="flex justify-center py-4">
        <Loader className="animate-spin"/>
    </div>;
}