import { defaults } from "../defaults";
import {
  DEFAULT_SEARCH_OPTIONS,
  getSearchString,
  SearchOptions,
} from "./utils";

export interface CaseInsensitiveOptions<T = unknown> extends SearchOptions<T> {
  /**
   * Boolean if the filter should also exclude all items that do not start with
   * the query string. The default behavior is to return all matches that
   * contain the query string anywhere.
   */
  startsWith?: boolean;
}

/**
 * Filters a list by ensuring that all items contain the query string in order
 * anywhere in it's own value.
 *
 * @param query - The current query string
 * @param searchable - The list of searchable items that should be filtered
 * @param options - All the search options to use
 * @returns A filtered list of all the searchable items based on the query
 * string.
 */
export function caseInsensitiveFilter<T = unknown>(
  query: string,
  searchable: readonly T[],
  options: CaseInsensitiveOptions<T> = {}
): readonly T[] {
  const {
    getItemValue,
    valueKey,
    trim,
    ignoreWhitespace,
    startsWith = false,
  } = defaults(options, DEFAULT_SEARCH_OPTIONS);

  query = getSearchString(query, true, trim, ignoreWhitespace);
  if (!query || !searchable.length) {
    return searchable;
  }

  return searchable.filter((item) => {
    const value = getSearchString(
      getItemValue(item, valueKey),
      true,
      trim,
      ignoreWhitespace
    );

    if (startsWith) {
      return value.indexOf(query) === 0;
    }

    return value.indexOf(query) !== -1;
  });
}
