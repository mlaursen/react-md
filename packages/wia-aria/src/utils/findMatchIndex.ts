import findMatchInRange from "./findMatchInRange";

/**
 * A function that is used to find the next match index within a list
 * of values by comparing the start values ignoring case.
 *
 * If a match can not be found from the search string, `-1` will be returned.
 * The search value is self-matchable by default, but it can be omitted
 * by disabling the `isSelfMatchable` argument. This will make a self-match
 * return `-1`.
 *
 * @param value The current search value
 * @param values A list of values to search within
 * @param startIndex The index within the values list to start the search from
 * @param isSelfMatchable Boolean if the current index can be included in the search
 */
export default function findMatchIndex(
  value: string,
  values: string[],
  startIndex: number,
  isSelfMatchable: boolean = true
) {
  let index = findMatchInRange(value, values, startIndex + 1, values.length);
  if (index === -1) {
    const endIndex = startIndex + (isSelfMatchable ? 1 : 0);
    index = findMatchInRange(value, values, 0, endIndex);
  }

  return index;
}
