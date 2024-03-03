import { type TextExtractor } from "../types.js";
import { type BaseSearchOptions } from "./types.js";
import { defaultExtractor, search } from "./utils.js";

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
 * @see {@link fuzzySearch}
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

/**
 * @remarks \@since 6.0.0
 */
export type FuzzySearchOptions<T> = BaseSearchOptions<T>;

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
 * fuzzySearch({
 *   list,
 *   query: "la",
 * });
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
 *
 * fuzzySearch({
 *   list,
 *   query: "ad",
 *   type: "search",
 * });
 * // "charCodeAt"
 *  //    ^   ^
 * ```
 *
 * @remarks \@since 6.0.0
 */
export function fuzzySearch<T extends string>(
  options: Omit<FuzzySearchOptions<T>, "extractor"> & { type?: "filter" }
): readonly T[];
export function fuzzySearch<T extends string>(
  options: Omit<FuzzySearchOptions<T>, "extractor"> & { type?: "search" }
): T | undefined;
export function fuzzySearch<T>(
  option: FuzzySearchOptions<T> & {
    extractor: TextExtractor<T>;
    type?: "filter";
  }
): readonly T[];
export function fuzzySearch<T>(
  option: FuzzySearchOptions<T> & {
    extractor: TextExtractor<T>;
    type?: "search";
  }
): T | undefined;
export function fuzzySearch<T>(
  options: FuzzySearchOptions<T>
): readonly T[] | T | undefined {
  const {
    list,
    type = "filter",
    query,
    extractor = defaultExtractor("fuzzySearch"),
    whitespace,
  } = options;

  // lazy initialize the RegExp since the base `filter` function will modify the
  // query and never call the filter function if:
  // - there is no query
  // - the list is empty
  let regexp: RegExp;
  return search({
    type,
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
