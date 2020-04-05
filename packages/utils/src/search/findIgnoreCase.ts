import {
  getSearchString,
  SearchOptions,
  DEFAULT_SEARCH_OPTIONS,
} from "./utils";
import defaults from "../defaults";

/**
 * This is a simple `array.find` implementation that will work for any
 * searchable item type and return the first item that starts with the current
 * query string ignoring case.
 *
 * @param query The current query string to use to match with
 * @param searchable The list of searchable items
 * @param options The additional search options available.
 * @return the found item in the searchable list or null
 */
export default function findIgnoreCase<T = unknown>(
  query: string,
  searchable: readonly T[],
  options: SearchOptions<T> = {}
): T | null {
  const { getItemValue, valueKey, trim, ignoreWhitespace } = defaults(
    options,
    DEFAULT_SEARCH_OPTIONS
  );

  query = getSearchString(query, true, trim, ignoreWhitespace);
  if (!query.length || !searchable.length) {
    return null;
  }

  const found = searchable.find((item) => {
    const value = getSearchString(
      getItemValue(item, valueKey),
      true,
      trim,
      ignoreWhitespace
    );

    return value.indexOf(query) === 0;
  });

  return typeof found === "number" ? found : found || null;
}
