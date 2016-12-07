/**
 * Calculates the hypotenuse using the x and y coordinates given.
 *
 * @param {number} a the x coordinate
 * @param {number} b the y coordinate
 * @return {number} the hypotenuse length for the given x and y coordinates.
 */
export default function calculateHypotenuse(a, b) {
  return Math.sqrt((a * a) + (b * b));
}
