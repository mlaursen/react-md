/** @internal */
export interface BaseOptions {
  /**
   * The current query string to find within the values
   */
  value: string;

  /**
   * The list of values to search within
   */
  values: readonly string[];

  /**
   * The start index for the search
   */
  startIndex: number;
}

/** @internal */
export interface MatchInRangeOptions extends BaseOptions {
  /**
   * The end index for the search
   */
  endIndex: number;
}

/**
 * Attempts to find the first match index for a list of values that starts with
 * the provided query string and is within the start and end indexes. If no
 * matches are found, -1 will be returned instead.
 *
 * Since this is normally coming from a keydown event, the query *must* be a
 * string of all capital letters to work as each value will be converted to
 * uppercase before checking.
 * @internal
 */
export function findMatchInRange(options: MatchInRangeOptions): number {
  const { values, startIndex, endIndex } = options;
  if (values.length === 0) {
    return -1;
  }

  const value = options.value.toUpperCase();

  for (let i = startIndex; i < endIndex; i += 1) {
    const content = values[i];
    if (content.toUpperCase().indexOf(value) === 0) {
      return i;
    }
  }

  return -1;
}

/** @internal */
export interface MatchIndexOptions extends BaseOptions {
  /**
   * Boolean if the current index can be included in the search
   *
   * @defaultValue `true`
   */
  isSelfMatchable?: boolean;
}

/**
 * A function that is used to find the next match index within a list of values
 * by comparing the start values ignoring case.
 *
 * If a match can not be found from the search string, `-1` will be returned.
 * The search value is self-matchable by default, but it can be omitted by
 * disabling the `isSelfMatchable` argument. This will make a self-match return
 * `-1`.
 *
 * @internal
 */
export function findMatchIndex(options: MatchIndexOptions): number {
  const { value, values, startIndex, isSelfMatchable = true } = options;
  // this was added to support comboboxes when there are no options available
  if (values.length === 0) {
    return -1;
  }

  let index = findMatchInRange({
    value,
    values,
    startIndex: startIndex + 1,
    endIndex: values.length,
  });
  if (index === -1) {
    const endIndex = startIndex + (isSelfMatchable ? 1 : 0);
    index = findMatchInRange({
      value,
      values,
      startIndex: 0,
      endIndex,
    });
  }

  return index;
}
