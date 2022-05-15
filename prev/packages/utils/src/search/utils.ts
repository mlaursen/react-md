/**
 * This is a small util that is used to transform a search string with common
 * patterns.
 *
 * @param value - The string to transform
 * @param lowercase - Boolean if the value should be lowercased for
 * case-insensitive searches
 * @param trim - Boolean if the leading and trailing whitespace should be
 * trimmed
 * @param ignoreWhitespace - Boolean if all whitespace should be ignored. This
 * will take precedence over the `trim` parameter if set to true.
 * @returns The transformed search string
 * @internal
 */
export function getSearchString(
  value: string,
  lowercase = false,
  trim = false,
  ignoreWhitespace = false
): string {
  if (lowercase) {
    value = value.toLowerCase();
  }

  if (ignoreWhitespace) {
    value = value.replace(/\s/g, "");
  } else if (trim) {
    value = value.trim();
  }

  return value;
}

/**
 * The default implementation of the getItemValue search option that will
 * attempt to "stringify" any unknown item as a string.
 *
 * @param item - The current item to transform
 * @param valueKey - The key to use that should hold the value if the item is an
 * object
 * @returns the item as a string
 * @internal
 */
export function getItemValue(item: unknown, valueKey = "value"): string {
  switch (typeof item) {
    case "string":
      return item;
    case "number":
      return Number.isNaN(item) ? "" : `${item}`;
    case "function":
      return getItemValue(item(), valueKey);
    case "object":
      return item
        ? getItemValue((item as Record<string, unknown>)[valueKey], valueKey)
        : "";
    default:
      return "";
  }
}

/**
 * A function that will get a string value from each item. The default
 * implementation will:
 *
 * - return a number as a string
 * - return a string as itself
 * - return the result of item() if it is a function (this will also be used if
 *   the `valueKey` on an object is a function).
 * - return item[valueKey] if it's an object (this uses typeof item === "object")
 * - return the empty string for all other data types
 */
export type GetItemValue<T = unknown> = (item: T, valueKey: string) => string;

export interface BaseSearchOptions<T = unknown> {
  /**
   * The key to use to get a value string if the item is an object.
   */
  valueKey?: string;

  /**
   * A function that will get a string value from each item. The default
   * implementation will:
   *
   * - return a number as a string
   * - return a string as itself
   * - return the result of item() if it is a function (this will also be used
   *   if the `valueKey` on an object is a function).
   * - return item[valueKey] if it's an object (this uses typeof item === "object")
   * - return the empty string for all other data types
   */
  getItemValue?: GetItemValue<T>;
}

export interface SearchOptions<T = unknown> extends BaseSearchOptions<T> {
  /**
   * Boolean if the query string and each item should have the leading and
   * trailing spaces removed.
   */
  trim?: boolean;

  /**
   * Boolean if all the whitespace should be ignored in the query string and for
   * each item.
   */
  ignoreWhitespace?: boolean;
}

export const DEFAULT_GET_ITEM_VALUE = getItemValue;
export const DEFAULT_VALUE_KEY = "value";
export const DEFAULT_TRIM = true;
export const DEFAULT_IGNORE_WHITESPACE = false;
export const DEFAULT_SEARCH_RESET_TIME = 500;

export const DEFAULT_SEARCH_OPTIONS: Required<SearchOptions> = {
  getItemValue: DEFAULT_GET_ITEM_VALUE,
  valueKey: DEFAULT_VALUE_KEY,
  trim: DEFAULT_TRIM,
  ignoreWhitespace: DEFAULT_IGNORE_WHITESPACE,
};
