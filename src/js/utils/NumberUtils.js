/**
 * Calculates the scale for using two numbers inclusively. This will
 * be the count of numbers between the min and max.
 *
 * @param {Number} min - the min value to include.
 * @param {Number} max - the max value to include.
 * @return {Number} the count of all the numbers.
 */
export function calculateScale(min, max) {
  let scale = Math.abs(max - min);
  if ((min <= 0 && max >= 0) || (min < 0 && max < 0) || (min > 0 && max > 0)) {
    scale++;
  }

  return scale;
}

/**
 * Checks if a number is between a min and maximum (inclusive)
 *
 * @param {Number} num the number to check
 * @param {Number} min the minimum
 * @param {Number} max the maximum
 * @return {Boolean} true if the number is between the min and max (inclusive)
 */
export function isBetween(num, min, max) {
  return num >= min && num <= max;
}
