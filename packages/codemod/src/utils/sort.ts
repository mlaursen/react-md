export const COMPARE_ALPHA_NUMERIC = new Intl.Collator("en-US", {
  numeric: true,
  caseFirst: "upper",
}).compare;

export type TextExtractor<T> = (item: T) => string;
const defaultExtractor: TextExtractor<unknown> = (item): string => {
  if (typeof item === "string") {
    return item;
  }
  throw new Error();
};

interface AlphaNumericSortOptions<T> {
  extractor?: TextExtractor<T>;
  descending?: boolean;
}

export function alphaNumericSort<T extends string>(
  list: readonly T[],
  options?: Omit<AlphaNumericSortOptions<T>, "extractor">
): readonly T[];
export function alphaNumericSort<T>(
  list: readonly T[],
  options: AlphaNumericSortOptions<T> & { extractor: TextExtractor<T> }
): readonly T[];
export function alphaNumericSort<T>(
  list: readonly T[],
  options: AlphaNumericSortOptions<T> = {}
): readonly T[] {
  const { extractor = defaultExtractor, descending = false } = options;

  const sorted = list.slice();
  sorted.sort((a, b) => {
    const aValue = extractor(a);
    const bValue = extractor(b);

    const value1 = descending ? bValue : aValue;
    const value2 = descending ? aValue : bValue;

    return COMPARE_ALPHA_NUMERIC(value1, value2);
  });

  return sorted;
}
