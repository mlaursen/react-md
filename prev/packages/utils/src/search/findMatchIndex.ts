/**
 * Attempts to find the first match index for a list of values that starts with
 * the provided query string and is within the start and end indexes. If no
 * matches are found, -1 will be returned instead.
 *
 * Since this is normally coming from a keydown event, the query *must* be a
 * string of all capital letters to work as each value will be converted to
 * uppercase before checking.
 *
 * @param value - The current query string to find within the values
 * @param values - The list of values to search within
 * @param startIndex - The start index for the search
 * @param endIndex - The end index for the search
 * @internal
 */
export function findMatchInRange(
  value: string,
  values: readonly string[],
  startIndex: number,
  endIndex: number
): number {
  value = value.toUpperCase();
  for (let i = startIndex; i < endIndex; i += 1) {
    const content = values[i];
    if (content.toUpperCase().indexOf(value) === 0) {
      return i;
    }
  }

  return -1;
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
 * @param value - The current search value
 * @param values - A list of values to search within
 * @param startIndex - The index within the values list to start the search from
 * @param isSelfMatchable - Boolean if the current index can be included in the
 * search
 * @internal
 */
export function findMatchIndex(
  value: string,
  values: readonly string[],
  startIndex: number,
  isSelfMatchable = true
): number {
  let index = findMatchInRange(value, values, startIndex + 1, values.length);
  if (index === -1) {
    const endIndex = startIndex + (isSelfMatchable ? 1 : 0);
    index = findMatchInRange(value, values, 0, endIndex);
  }

  return index;
}

export type FindMatchIndex = typeof findMatchIndex;
