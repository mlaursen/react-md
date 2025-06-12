import { type AutomaticTextExtraction, type TextExtractor } from "../types.js";
import { type BaseSearchOptions } from "./types.js";
import { defaultExtractor, search } from "./utils.js";

/**
 * @since 6.2.0
 * @internal
 */
const DEFAULT_EXTRACTOR = defaultExtractor("caseInsensitiveSearch");

/**
 * @since 6.0.0
 */
export interface CaseInsensitiveStartsWithOptions {
  /**
   * Set this to `true` if the item in the list must start with the query
   * instead of only including it.
   *
   * @example Search Example
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
   * @example Filter Example
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
 * @since 6.0.0
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
 * @since 6.0.0
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
 * @since 6.0.0
 */
export interface CaseInsensitiveOptions<T>
  extends BaseSearchOptions<T>,
    CaseInsensitiveStartsWithOptions {}

/**
 * @example String list
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
 * @example Objects
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
 * });
 * // [{ name: "Apple", value: 0 }, { name: "Grape", value: 2 }]
 * ```
 *
 * @example Objects With Custom Names
 * ```ts
 * const fruits = [
 *   { nameField: "Apple", value: 0 },
 *   { nameField: "Banana", value: 1 },
 *   { nameField: "Grape", value: 2 },
 *   { nameField: "Orange", value: 3 },
 * ];
 *
 * caseInsensitiveSearch({
 *   list: fruits,
 *   query: "ap",
 *   extractor: (item) => item.nameField,
 * });
 * // [{ nameField: "Apple", value: 0 }, { nameField: "Grape", value: 2 }]
 * ```
 *
 * @since 6.0.0
 */
export function caseInsensitiveSearch<T extends AutomaticTextExtraction>(
  options: CaseInsensitiveOptions<T> & { type?: "filter" }
): readonly T[];
export function caseInsensitiveSearch<T extends AutomaticTextExtraction>(
  options: CaseInsensitiveOptions<T> & { type: "search" }
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
    extractor = DEFAULT_EXTRACTOR,
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
