/**
 * @remarks \@since 2.7.0
 */
export interface LoopOptions {
  /**
   * The current value that should be modified.
   */
  value: number;

  /**
   * An optional `min` value that can be used before looping to the `max` value.
   *
   * @defaultValue `0`
   */
  min?: number;

  /**
   * The max number that can be used before looping to the `min` value.
   */
  max: number;

  /**
   * Boolean if the `value` should be incremented or decremented by `1`.
   */
  increment: boolean;

  /**
   * Boolean if the looping should be ignored and only the `min`/`max` options
   * should be respected. In other words, the looping  behavior will be disabled
   * and the `value` must be: `min >= value <= max`
   */
  minmax?: boolean;
}

/**
 * A small util that is used to increment or decrement a number until it reaches
 * the max value or -1. When that happens, it will loop around to 0 or the max
 * value respectively. This does not work for different increment numbers or any
 * values below 0 for now.
 *
 * @internal
 * @param options - {@link LoopOptions}
 * @remarks \@since 2.7.0 The `min` option was added and the arguments changed to an
 * object
 */
export function loop({
  value,
  min = 0,
  max,
  increment,
  minmax = false,
}: LoopOptions): number {
  let next = value + (increment ? 1 : -1);
  if (minmax) {
    next = Math.min(max, Math.max(min, next));
  } else if (next > max) {
    next = min;
  } else if (next < min) {
    next = max;
  }

  return next;
}
