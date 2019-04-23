/**
 * Attempts to find the first match index for a list of values that starts with the provided
 * query string and is within the start and end indexes. If no matches are found, -1 will be
 * returned instead.
 *
 * Since this is normally coming from a keydown event, the query *must* be a string of all
 * capital letters to work as each value will be converted to uppercase before checking.
 *
 * @param value The current query string to find within the values
 * @param values The list of values to search within
 * @param startIndex The start index for the search
 * @param endIndex The end index for the search
 */
export default function findMatchInRange(
  value: string,
  values: string[],
  startIndex: number,
  endIndex: number
) {
  value = value.toUpperCase();
  for (let i = startIndex; i < endIndex; i += 1) {
    const content = values[i];
    if (content.toUpperCase().indexOf(value) === 0) {
      return i;
    }
  }

  return -1;
}
