/**
 * Checks if a number is between a min and maximum (inclusive)
 *
 * @param {Number} num the number to check
 * @param {Number} min the minimum
 * @param {Number} max the maximum
 * @return {Boolean} true if the number is between the min and max (inclusive)
 */
export default function isBetween(num, min, max) {
  return num >= min && num <= max;
}
