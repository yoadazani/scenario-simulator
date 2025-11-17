import {type ClassValue, clsx} from "clsx";
import {twMerge} from "tailwind-merge";
import packageJson from "../../package.json";
import {format} from "date-fns"
import {TZDate} from "@date-fns/tz";
import {he} from "date-fns/locale";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const tryCatch = async <T>(
    promise: Promise<T> | Axios.IPromise<T>
): Promise<[undefined, T] | [Error]> => {
    try {
        const result = await promise;
        return [undefined, result];
    } catch (error) {
        const err = error as Error;
        return [err];
    }
};

export const convertToIsraelDateFormat = (value: Date | undefined) => {
    if (!value) return "";
    const tzDate = new TZDate(value, "Asia/Jerusalem");
    return format(tzDate, "EEEE, d בMMMM yyyy, HH:mm", { locale: he })
}



export const getVersion = () => {
    return `גרסה | v${packageJson.version} - ${packageJson.buildDate}`
}