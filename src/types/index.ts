export type KeyOfType<T, V> = keyof {
  [K in keyof T as T[K] extends V ? K : never]: T[K];
};

export enum SendingStatusEnum {
    Pending = "Pending",
    Sent = "Sent",
    Failed = "Failed",
    On_Hold = "On_Hold"
}
