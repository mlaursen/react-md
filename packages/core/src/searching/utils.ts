import { type TextExtractor } from "../types.js";
import { toSearchQuery } from "./toSearchQuery.js";
import { type BaseSearchOptions } from "./types.js";

/**
 * @since 6.0.0
 * @internal
 */
export const defaultExtractor =
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
 * @internal
 * @since 6.0.0
 */
export interface SearchOptions<T> extends BaseSearchOptions<T> {
  type: "search" | "filter";
  filter: (query: string, value: string) => boolean;
  extractor: TextExtractor<T>;
}

/**
 * @internal
 * @since 6.0.0
 */
export function search<T>(
  options: SearchOptions<T>
): readonly T[] | T | undefined {
  const { list, type, query, filter, extractor, whitespace = "keep" } = options;
  const fallback = type === "search" ? undefined : list;
  if (!list.length) {
    return fallback;
  }

  const q = toSearchQuery(query, whitespace);
  if (!q) {
    return fallback;
  }

  const fn = type === "search" ? "find" : "filter";
  return list[fn]((item) =>
    filter(q, toSearchQuery(extractor(item), whitespace))
  );
}
