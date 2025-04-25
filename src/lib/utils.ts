import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
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
