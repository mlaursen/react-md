/**
 * Checks if a variable provided is defined and a correctly
 * formatted date.
 *
 * @param d - Any value that should be checked if it is a valid date
 * @return {boolean} true if it is a valid date.
 */
export default function isValidDate(d) {
  // just checking if getTime is a function is ridiculously quicker than instanceof Date
  // and _seems_ safe enough
  return !!d && typeof d.getTime === 'function' && d.getTime() === d.getTime();
}
