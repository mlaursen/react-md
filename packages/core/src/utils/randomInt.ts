/** @since 6.0.0 */
export interface RandomIntOptions {
  /** @defaultValue `0` */
  min?: number;
  /** @defaultValue `10` */
  max?: number;
}

/**
 * Generates a random integer between a min and max value. Defaults
 * to 0-10.
 *
 * @param options - the {@link RandomIntOptions}
 * @returns a random number
 * @since 6.0.0
 */
export function randomInt(options: RandomIntOptions = {}): number {
  const { min = 0, max = 10 } = options;

  return Math.floor(Math.random() * (max - min)) + min;
}
