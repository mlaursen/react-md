/** @module utils/NumberUtils/minMaxLoop */

/**
 * Keeps a number within the min and max values. When the number becomes less
 * than the min, it will loop around and be the max value. When the number is
 * greater than the max, it will loop around and be the min value.
 *
 * @param {Number} current - the current number
 * @param {Number} min - the minimum number allowed
 * @param {Number} max - the maximum number allowed
 * @param {Boolean} increment - boolean if the value should be incremented or decremented by
 *    1.
 * @return {Number} the next number
 */
export default function minMaxLoop(current, min, max, increment = true) {
  let next = current + (increment ? 1 : -1);
  if (max < next) {
    next = min;
  } else if (next < min) {
    next = max;
  }

  return next;
}
