import type { TextExtractor } from "../types";

/** @internal */
const identity =
  <T>(name: string) =>
  (item: T): string => {
    if (typeof item === "string") {
      return item;
    }

    throw new Error(
      `A \`TextExtractor\` must be provided to \`${name}\` for lists that do not contain strings`
    );
  };

/**
 * @remarks \@since 6.0.0
 */
export interface BaseFilterOptions<T> {
  list: readonly T[];

  /**
   * The current query string. i.e. `"SeArch"`
   */
  query: string;

  /**
   * This is required if the list includes anything other than strings.
   * @see {@link TextExtractor}
   */
  extractor?: TextExtractor<T>;

  /**
   * @defaultValue `"keep"`
   */
  whitespace?: "ignore" | "trim" | "keep";
}

/**
 * @internal
 * @remarks \@since 6.0.0
 */
export interface FilterOptions<T> extends BaseFilterOptions<T> {
  filter(query: string, value: string): boolean;
  extractor: TextExtractor<T>;
}

/**
 * @internal
 * @remarks \@since 6.0.0
 */
const toSearchString = (
  s: string,
  whitespace: "trim" | "ignore" | "keep"
): string => {
  let q = s.toLowerCase();
  if (whitespace === "ignore") {
    q = q.replace(/\s/g, "");
  } else if (whitespace === "trim") {
    q = q.trim();
  }

  return q;
};

/**
 * @internal
 * @remarks \@since 6.0.0
 */
function filter<T>(options: FilterOptions<T>): readonly T[] {
  const { list, query, filter, extractor, whitespace = "keep" } = options;
  if (!list.length) {
    return list;
  }

  const q = toSearchString(query, whitespace);
  if (!q) {
    return list;
  }

  return list.filter((item) =>
    filter(q, toSearchString(extractor(item), whitespace))
  );
}

/**
 * @remarks \@since 6.0.0
 */
export interface CaseInsensitiveOptions<T> extends BaseFilterOptions<T> {
  /**
   * Set this to `true` if the item in the list must start with the query
   * instead of only including it.
   *
   * @example
   * ```ts
   * const fruits = ["Apple", "Banana", "Grape", "Orange"];
   *
   * caseInsensitiveFilter({
   *   list: fruits,
   *   query: "ap",
   * });
   * // ["Apple", "Grape"]
   *
   * caseInsensitiveFilter({
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
 * @example
 * String list
 * ```ts
 * const fruits = ["Apple", "Banana", "Grape", "Orange"];
 *
 * caseInsensitiveFilter({
 *   list: fruits,
 *   query: "ap",
 * });
 * // ["Apple", "Grape"]
 *
 * caseInsensitiveFilter({
 *   list: fruits,
 *   query: "ap",
 *   startsWith: true,
 * });
 * // ["Apple"]
 *
 * caseInsensitiveFilter({
 *   list: fruits,
 *   query: "  a p",
 * });
 * // []
 *
 * caseInsensitiveFilter({
 *   list: fruits,
 *   query: "  a p",
 *   whitespace: "ignore",
 * });
 * // ["Apple", "Grape"]
 *
 * caseInsensitiveFilter({
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
 * caseInsensitiveFilter({
 *   list: fruits,
 *   query: "ap",
 *   extractor: (item) => item.name,
 * });
 * // [{ name: "Apple", value: 0 }, { name: "Grape", value: 2 }]
 * ```
 *
 * @remarks \@since 6.0.0
 */
export function caseInsensitiveFilter<T extends string>(
  options: Omit<CaseInsensitiveOptions<T>, "extractor">
): readonly T[];
export function caseInsensitiveFilter<T>(
  options: CaseInsensitiveOptions<T> & { extractor: TextExtractor<T> }
): readonly T[];
export function caseInsensitiveFilter<T>(
  options: CaseInsensitiveOptions<T>
): readonly T[] {
  const {
    list,
    query,
    extractor = identity("caseInsensitiveFilter"),
    startsWith,
    whitespace,
  } = options;

  return filter({
    list,
    query,
    extractor,
    whitespace,
    filter(q, value) {
      const matchIndex = value.indexOf(q);
      if (startsWith) {
        return matchIndex === 0;
      }

      return matchIndex !== -1;
    },
  });
}

/**
 * @remarks \@since 6.0.0
 */
export type FuzzyFilterOptions<T> = BaseFilterOptions<T>;

/**
 * Filters a list by making sure that all the letters appear in order ignoring
 * case, punctuation, whitespace, and special characters. This is kind of the
 * same filtering that appears in text editors.
 *
 * @example
 * Simple Example
 * ```ts
 * const list = [
 *   "at",
 *   "charAt",
 *   "charCodeAt",
 *   "codePointAt",
 *   "concat",
 *   "constructor",
 *   "endsWith",
 *   "includes",
 *   "indexOf",
 *   "lastIndexOf",
 *   "length",
 *   "localeCompare",
 *   "match",
 *   "matchAll",
 *   "normalize",
 *   "padEnd",
 *   "padStart",
 *   "repeat",
 *   "replace",
 *   "replaceAll",
 *   "search",
 *   "slice",
 *   "split",
 *   "startsWith",
 *   "substring",
 *   "toLocaleLowerCase",
 *   "toLocaleUpperCase",
 *   "toLowerCase",
 *   "toString",
 *   "toUpperCase",
 *   "trim",
 *   "trimEnd",
 *   "trimStart",
 *   "valueOf",
 * ];
 *
 * fuzzyFilter({ list: list, query: "la" });
 * // [
 * //   "lastIndexOf",
 * //    ^^
 * //   "localeCompare",
 * //    ^  ^
 * //   "replace",
 * //       ^^
 * //   "replaceAll",
 * //       ^^
 * //   "toLocaleLowerCase",
 * //      ^  ^
 * //   "toLocaleUpperCase",
 * //      ^  ^
 * //   "toLowerCase",
 * //      ^     ^
 * // ]
 * ```
 *
 * @remarks \@since 6.0.0
 */
export function fuzzyFilter<T extends string>(
  options: Omit<FuzzyFilterOptions<T>, "extractor">
): readonly T[];
export function fuzzyFilter<T>(
  option: FuzzyFilterOptions<T> & { extractor: TextExtractor<T> }
): readonly T[];
export function fuzzyFilter<T>(options: FuzzyFilterOptions<T>): readonly T[] {
  const {
    list,
    query,
    extractor = identity("fuzzyFilter"),
    whitespace,
  } = options;

  let regexp: RegExp;
  return filter({
    list,
    query,
    extractor,
    whitespace,
    filter(query, value) {
      if (!regexp) {
        regexp = new RegExp(
          `${query}`
            .split("")
            .join("\\w*")
            .replace(
              /(\(|\||\)|\\(?!w\*)|\[|\|-|\.|\^|\+|\$|\?|^(?!w)\*)/g,
              "\\$1"
            )
            // Couldn't get the matching of two '*' working, so replace them here..
            .replace(/\*\*/g, "*\\*"),
          "i"
        );
      }

      return value.length > 0 && regexp.test(value);
    },
  });
}
