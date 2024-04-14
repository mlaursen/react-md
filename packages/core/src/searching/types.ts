import { type TextExtractor } from "../types.js";

/**
 * @since 6.0.0
 */
export type WhitespaceFilter = "ignore" | "trim" | "keep";

/**
 * @since 6.0.0
 */
export interface BaseSearchOptions<T> {
  list: readonly T[];

  /**
   * @defaultValue `"filter"`
   */
  type?: "search" | "filter";

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
