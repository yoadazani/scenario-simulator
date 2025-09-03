import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import packageJson from "../../package.json";

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

export const getVersion = () => {
    return `גרסה | v${packageJson.version} - ${packageJson.buildDate}`
}