/**
 * A small util that is used to increment or decrement a number until it reaches
 * the max value or -1. When that happens, it will loop around to 0 or the max
 * value respectively. This does not work for different increment numbers or any
 * values below 0 for now.
 *
 * @internal
 * @param x The number to increment or decrement
 * @param max The max number that can be set
 * @param increment Boolean if it should be incremented or decremented
 * @param minmax Boolean if the loop functionality should be replaced with
 * min-max behavior instead of allowing looping
 */
export default function loop(
  x: number,
  max: number,
  increment: boolean,
  minmax: boolean = false
): number {
  let next = x + (increment ? 1 : -1);
  if (minmax) {
    next = Math.min(max, Math.max(0, next));
  } else if (next > max) {
    next = 0;
  } else if (next < 0) {
    next = max;
  }

  return next;
}
