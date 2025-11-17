import {DateTimeRange} from "@/components/ui/date-range-picker.tsx";

export type KeyOfType<T, V> = keyof {
  [K in keyof T as T[K] extends V ? K : never]: T[K];
};


type FlattenKeys<T, Prefix extends string = ''> = {
    [K in keyof T]: T[K] extends Record<string, unknown>
        ? T[K] extends unknown[]
            ? `${Prefix}${K & string}`
            : FlattenKeys<T[K], `${Prefix}${K & string}_`>
        : `${Prefix}${K & string}`
}[keyof T]

export type AccessorKeys<T> = keyof T | FlattenKeys<T>


export enum SendingStatusEnum {
    Pending = "Pending",
    Sent = "Sent",
    Failed = "Failed",
    On_Hold = "On_Hold"
}

export type Options = { label: string; value: string | number }
export type FilterValue = string | number | { range: DateTimeRange };