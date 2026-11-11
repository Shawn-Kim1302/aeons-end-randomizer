// Same shape as the English dictionary, with any string values.
// Missing or extra keys in another language become type errors.
export type Dictionary<T> = {
  [K in keyof T]: T[K] extends string ? string : Dictionary<T[K]>
}
