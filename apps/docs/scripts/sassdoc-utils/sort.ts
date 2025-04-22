export const sort = <T>(
  map: ReadonlyMap<string, T>,
  order: ReadonlyMap<string, number>
): readonly [string, T][] => {
  const entries = [...map.entries()];
  entries.sort(([a], [b]) => (order.get(a) ?? 0) - (order.get(b) ?? 0));

  return entries;
};
