import { type TextExtractor } from "../types.js";
import { type BaseSearchOptions } from "./types.js";
import { defaultExtractor, search } from "./utils.js";

/**
 * @remarks \@since 6.0.0
 */
export interface CaseInsensitiveStartsWithOptions {
  /**
   * Set this to `true` if the item in the list must start with the query
   * instead of only including it.
   *
   * @example
   * Search Example
   * ```ts
   * const fruits = ["Banana", "Grape", "Apple", "Orange"];
   *
   * caseInsensitiveSearch({
   *   list: fruits,
   *   query: "ap",
   *   type: "search",
   * });
   * // "Grape"
   *
   * caseInsensitiveSearch({
   *   list: fruits,
   *   query: "ap",
   *   type: "search",
   *   startsWith: true,
   * });
   * // "Apple"
   * ```
   *
   * @example
   * Filter Example
   * ```ts
   * const fruits = ["Apple", "Banana", "Grape", "Orange"];
   *
   * caseInsensitiveSearch({
   *   list: fruits,
   *   query: "ap",
   * });
   * // ["Apple", "Grape"]
   *
   * caseInsensitiveSearch({
   *   list: fruits,
   *   query: "ap",
   *   startsWith: true,
   * });
   * // ["Apple"]
   * ```
   *
   * @defaultValue `false`
   */
  startsWith?: boolean;
}

/**
 * @remarks \@since 6.0.0
 */
export interface IsCaseInsensitiveMatchOptions
  extends CaseInsensitiveStartsWithOptions {
  /**
   * The current search query.
   */
  query: string;

  /**
   * The current value to compare against.
   */
  value: string;
}

/**
 * @remarks \@since 6.0.0
 */
export function isCaseInsensitiveMatch(
  options: IsCaseInsensitiveMatchOptions
): boolean {
  const { query, value, startsWith } = options;
  const matchIndex = value.indexOf(query);
  if (startsWith) {
    return matchIndex === 0;
  }

  return matchIndex !== -1;
}

/**
 * @remarks \@since 6.0.0
 */
export interface CaseInsensitiveOptions<T>
  extends BaseSearchOptions<T>,
    CaseInsensitiveStartsWithOptions {}

/**
 * @example
 * String list
 * ```ts
 * const fruits = ["Apple", "Banana", "Grape", "Orange"];
 *
 * caseInsensitiveSearch({
 *   list: fruits,
 *   query: "ap",
 * });
 * // ["Apple", "Grape"]
 *
 * caseInsensitiveSearch({
 *   list: fruits,
 *   query: "ap",
 *   startsWith: true,
 * });
 * // ["Apple"]
 *
 * caseInsensitiveSearch({
 *   list: fruits,
 *   query: "  a p",
 * });
 * // []
 *
 * caseInsensitiveSearch({
 *   list: fruits,
 *   query: "  a p",
 *   whitespace: "ignore",
 * });
 * // ["Apple", "Grape"]
 *
 * caseInsensitiveSearch({
 *   list: fruits,
 *   query: "  ap  ",
 *   whitespace: "trim",
 * });
 * // ["Apple", "Grape"]
 * ```
 *
 * @example
 * Objects
 * ```ts
 * const fruits = [
 *   { name: "Apple", value: 0 },
 *   { name: "Banana", value: 1 },
 *   { name: "Grape", value: 2 },
 *   { name: "Orange", value: 3 },
 * ];
 *
 * caseInsensitiveSearch({
 *   list: fruits,
 *   query: "ap",
 *   extractor: (item) => item.name,
 * });
 * // [{ name: "Apple", value: 0 }, { name: "Grape", value: 2 }]
 * ```
 *
 * @remarks \@since 6.0.0
 */
export function caseInsensitiveSearch<T extends string>(
  options: Omit<CaseInsensitiveOptions<T>, "extractor"> & { type?: "filter" }
): readonly T[];
export function caseInsensitiveSearch<T extends string>(
  options: Omit<CaseInsensitiveOptions<T>, "extractor"> & { type: "search" }
): T | undefined;
export function caseInsensitiveSearch<T>(
  options: CaseInsensitiveOptions<T> & {
    extractor: TextExtractor<T>;
    type?: "filter";
  }
): readonly T[];
export function caseInsensitiveSearch<T>(
  options: CaseInsensitiveOptions<T> & {
    extractor: TextExtractor<T>;
    type: "search";
  }
): T | undefined;
export function caseInsensitiveSearch<T>(
  options: CaseInsensitiveOptions<T>
): readonly T[] | T | undefined {
  const {
    list,
    type = "filter",
    query,
    extractor = defaultExtractor("caseInsensitiveSearch"),
    startsWith,
    whitespace,
  } = options;

  return search({
    type,
    list,
    query,
    extractor,
    whitespace,
    filter(q, value) {
      return isCaseInsensitiveMatch({
        query: q,
        value,
        startsWith,
      });
    },
  });
}
