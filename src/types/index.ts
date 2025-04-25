export type KeyOfType<T, V> = keyof {
  [K in keyof T as T[K] extends V ? K : never]: T[K];
};
