export type AsyncFilterFunction<T> = (item: T, index?: number, list?: T[]) => Promise<boolean>;

export function filterAsync<T>(list: T[], filterFn: AsyncFilterFunction<T>): Promise<T[]> {
  return Promise.all(list.map(filterFn)).then(booleans => list.filter((_, i) => booleans[i]));
}
