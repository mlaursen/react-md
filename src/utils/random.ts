interface Options {
  /** @defaultValue `0` */
  min?: number;
  /** @defaultValue `10` */
  max?: number;
}

/**
 * Generates a random integer between a min and max value. Defaults
 * to 0-10.
 */
export function randomInt(options: Options = {}): number {
  const { min = 0, max = 10 } = options;

  return Math.floor(Math.random() * max) + min;
}
