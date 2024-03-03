import { type TextExtractor } from "../types.js";

/**
 * @remarks \@since 6.0.0
 */
export function toSearchQuery(
  s: string,
  whitespace: "trim" | "ignore" | "keep" = "keep"
): string {
  let q = s.toLowerCase();
  if (whitespace === "ignore") {
    q = q.replace(/\s/g, "");
  } else if (whitespace === "trim") {
    q = q.trim();
  }

  return q;
}

/**
 * @remarks \@since 6.0.0
 */
export interface CaseInsensitiveMatchOptions {
  /**
   * The current search query.
   */
  query: string;

  /**
   * The current value to compare against.
   */
  value: string;

  /**
   * @see {@link CaseInsensitiveOptions.startsWith}
   * @defaultValue `false`
   */
  startsWith?: boolean;
}

/**
 * @example
 * ```ts
 * const fruits = ["Banana", "Grape", "Apple", "Orange"];
 *
 * fruits.find((fruit) => caseInsensitiveMatch({
 *   query: "ap",
 *   value: fruit,
 * }))
 * // ["Grape"]
 *
 * fruits.find((fruit) => caseInsensitiveMatch({
 *   query: "ap",
 *   value: fruit,
 *   startsWith: true,
 * }))
 * // ["Apple"]
 * ```
 *
 * @see {@link caseInsensitiveFilter}
 * @remarks \@since 6.0.0
 */
export function caseInsensitiveMatch(
  options: CaseInsensitiveMatchOptions
): boolean {
  const { query, value, startsWith } = options;
  const matchIndex = value.indexOf(query);
  if (startsWith) {
    return matchIndex === 0;
  }

  return matchIndex !== -1;
}

/**
 * @example
 * ```tsx
 * import { createFuzzyRegExp, toSearchQuery } from "@react-md/core":
 * import { useDeferredValue, useMemo, useState, type ReactElement } from "react";
 *
 * function Example(): ReactElement {
 *   const [value, setValue] = useState("");
 *   const deferredValue = useDeferredValue(value)
 *
 *   const match = useMemo(() => {
 *     const query = toSearchQuery(deferredValue);
 *     if (!query) {
 *       return;
 *     }
 *
 *     const fuzzyRegExp = createFuzzyRegExp(query);
 *     return options.find(option => fuzzyRegExp.test(option.label)):
 *   }, [options])
 *
 *   if (match) {
 *     // do something
 *   }
 * }
 *
 * ```
 *
 * @remarks \@since 6.0.0
 * @see {@link fuzzyFilter}
 */
export function createFuzzyRegExp(query: string): RegExp {
  return new RegExp(
    query
      .split("")
      .join("\\w*")
      .replace(/(\(|\||\)|\\(?!w\*)|\[|\|-|\.|\^|\+|\$|\?|^(?!w)\*)/g, "\\$1")
      // Couldn't get the matching of two '*' working, so replace them here..
      .replace(/\*\*/g, "*\\*"),
    "i"
  );
}

/** @internal */
const defaultExtractor =
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
export type WhitespaceFilter = "ignore" | "trim" | "keep";

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
  whitespace?: WhitespaceFilter;
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
function filter<T>(options: FilterOptions<T>): readonly T[] {
  const { list, query, filter, extractor, whitespace = "keep" } = options;
  if (!list.length) {
    return list;
  }

  const q = toSearchQuery(query, whitespace);
  if (!q) {
    return list;
  }

  return list.filter((item) =>
    filter(q, toSearchQuery(extractor(item), whitespace))
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
    extractor = defaultExtractor("caseInsensitiveFilter"),
    startsWith,
    whitespace,
  } = options;

  return filter({
    list,
    query,
    extractor,
    whitespace,
    filter(q, value) {
      return caseInsensitiveMatch({
        query: q,
        value,
        startsWith,
      });
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
    extractor = defaultExtractor("fuzzyFilter"),
    whitespace,
  } = options;

  // lazy initialize the RegExp since the base `filter` function will modify the
  // query and never call the filter function if:
  // - there is no query
  // - the list is empty
  let regexp: RegExp;
  return filter({
    list,
    query,
    extractor,
    whitespace,
    filter(query, value) {
      return (
        value.length > 0 && (regexp ??= createFuzzyRegExp(query)).test(value)
      );
    },
  });
}
