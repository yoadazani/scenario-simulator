import {queryOptions} from "@tanstack/react-query";
import {getEnums} from "@/api/enums.ts";

const EnumsQueryOptions = () => queryOptions({
    queryKey: ["enums"],
    queryFn: () => getEnums()
});

export { EnumsQueryOptions };
