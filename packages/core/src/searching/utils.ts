import { type TextExtractor } from "../types.js";
import { toSearchQuery } from "./toSearchQuery.js";
import { type BaseSearchOptions } from "./types.js";

/**
 * @since 6.0.0
 * @since 6.2.0 Added support for `item.name` and `item.label`.
 * @internal
 */
export const defaultExtractor =
  (usageName: string, propName = "extractor") =>
  (item: unknown): string => {
    if (typeof item === "string") {
      return item;
    }

    if (item && typeof item === "object") {
      if ("label" in item && typeof item.label === "string") {
        return item.label;
      }

      if ("name" in item && typeof item.name === "string") {
        return item.name;
      }
    }

    throw new Error(
      `\`${usageName}\` requires the \`${propName}\` prop for lists that do not contain strings or known object types.`
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
