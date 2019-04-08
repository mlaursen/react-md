interface RandomInt {
  min?: number;
  max?: number;
}

/**
 * Generates a random integer between a min and max value. Defaults
 * to 0-10.
 */
export function randomInt({ min = 0, max = 10 }: RandomInt = {}) {
  return Math.floor(Math.random() * max) + min;
}
