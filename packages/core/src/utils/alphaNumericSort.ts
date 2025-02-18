import { defaultExtractor } from "../searching/utils.js";
import { type TextExtractor } from "../types.js";

/** @since 6.0.0 */
export const DEFAULT_COLLATOR_OPTIONS = {
  numeric: true,
  caseFirst: "upper",
} as const satisfies Intl.CollatorOptions;

/**
 * The default `Intl.Collator` that should be used for sorting large lists.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare#performance
 * @since 6.0.0
 */
export const DEFAULT_COLLATOR = new Intl.Collator(
  "en-US",
  DEFAULT_COLLATOR_OPTIONS
);

/** @since 6.0.0 */
export interface AlphaNumericSortOptions<T> {
  /**
   * The extractor is only required when the list of items are not strings.
   *
   * @example Simple Example
   * ```ts
   * interface Item {
   *   name: string;
   * }
   *
   * const items: Item[] = [{ name: 'Hello' }, { name: 'World' }];
   *
   * alphaNumericSort(items, {
   *   extractor: (item) => item.name,
   * });
   * ```
   *
   * For javascript developers, this will throw an error in dev mode if an
   * extractor is not provided for non-string lists.
   *
   * @defaultValue `typeof item === "string" ? item : ""`
   */
  extractor?: TextExtractor<T>;

  /**
   * A custom compare function for sorting the list. This should really only be
   * provided if the language for your app is not `"en-US"` or you'd like to
   * provide some custom sorting options.
   *
   * @example Custom Compare using Intl.Collator
   * ```ts
   * const collator = new Intl.Collator("en-US", {
   *   numeric: false,
   *   caseFirst: "lower",
   *   usage: "search",
   * });
   *
   * alphaNumericSort(items, {
   *   compare: collator.compare,
   * })
   * ```
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Collator/Collator
   * @defaultValue `new Intl.Collator("en-US", { numeric: true, caseFirst: "upper" }).compare`
   */
  compare?: (a: string, b: string) => number;

  /**
   * Setting this to `true` will return the list in descending order instead of
   * ascending.
   *
   * @defaultValue `false`
   */
  descending?: boolean;
}

/**
 * @example Simple Example
 * ```ts
 * const items = ["World", "Hello"];
 *
 * const sorted = alphaNumericSort(items);
 * // sorted == ["Hello", "World"]
 * ```
 *
 * @param list - The list of strings to sort
 * @returns a new sorted list
 */
export function alphaNumericSort<T extends string>(
  list: readonly T[],
  options?: Omit<AlphaNumericSortOptions<T>, "extractor">
): readonly T[];
/**
 * @example Simple Example
 * ```ts
 * interface Item {
 *   name: string;
 * }
 *
 * const items: Item[] = [{ name: "World" }, { name: "Hello" }];
 *
 * const sorted = alphaNumericSort(items, {
 *   extractor: (item) => item.name,
 * });
 * // sorted == [{ name: "Hello" }, { name: "World" }]
 * ```
 *
 * @param list - The list of items to sort
 * @returns a new sorted list
 */
export function alphaNumericSort<T>(
  list: readonly T[],
  options: AlphaNumericSortOptions<T> & { extractor: TextExtractor<T> }
): readonly T[];
export function alphaNumericSort<T>(
  list: readonly T[],
  options: AlphaNumericSortOptions<T> = {}
): readonly T[] {
  const {
    compare = DEFAULT_COLLATOR.compare,
    extractor = defaultExtractor("alphaNumericSort"),
    descending = false,
  } = options;

  const sorted = list.slice();
  sorted.sort((a, b) => {
    const aValue = extractor(a);
    const bValue = extractor(b);

    const value1 = descending ? bValue : aValue;
    const value2 = descending ? aValue : bValue;

    return compare(value1, value2);
  });

  return sorted;
}
