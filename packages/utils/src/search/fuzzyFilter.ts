import { defaults } from "../defaults";
import { getFuzzyRegExp } from "./getFuzzyRegExp";
import {
  DEFAULT_SEARCH_OPTIONS,
  getSearchString,
  SearchOptions,
} from "./utils";

/**
 * Filters a list by using a fuzzy search "algorithm" (huge double quotes on
 * algorithm). The fuzzy search will just ensure that all the letters in the
 * query string appear in-order for all the remaining items. However, the
 * letters *do not need to be consecutive*.
 *
 * @param query - The current query string
 * @param searchable - The list of searchable items that should be filtered
 * @param options - All the search options to use
 * @returns A filtered list of all the searchable items based on the query
 * string.
 */
export function fuzzyFilter<T = unknown>(
  query: string,
  searchable: readonly T[],
  options: SearchOptions<T> = {}
): readonly T[] {
  const { getItemValue, valueKey, trim, ignoreWhitespace } = defaults(
    options,
    DEFAULT_SEARCH_OPTIONS
  );

  query = getSearchString(query, false, trim, ignoreWhitespace);
  if (!searchable.length || !query) {
    return searchable;
  }

  const queryRegExp = getFuzzyRegExp(query);
  return searchable.filter((item) => {
    const value = getSearchString(
      getItemValue(item, valueKey),
      false,
      trim,
      ignoreWhitespace
    );

    return value.length && value.match(queryRegExp);
  });
}
