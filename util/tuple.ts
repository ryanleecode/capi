export function tuple<Elements extends unknown[]>(...elements: [...Elements]): Elements {
  return elements
}

export type ArrayOfLength<T, L extends number, A extends T[] = []> = number extends L ? T[]
  : L extends A["length"] ? A
  : ArrayOfLength<T, L, [...A, T]>
