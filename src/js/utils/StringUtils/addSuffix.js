/**
 * Optionally adds a suffix to a string if it does
 * not already contain that string.
 *
 * @param {String} str - The string to modify
 * @param {String} suffix - The suffix to add
 *
 * @return {String} the string with a suffix
 */
export default function addSuffix(str, suffix) {
  if (!str) {
    return str;
  }

  return str.indexOf(suffix) === -1
    ? `${str.trim()} ${suffix}`
    : str;
}
