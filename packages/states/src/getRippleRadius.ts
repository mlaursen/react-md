function calcHypotenuse(a: number, b: number) {
  return Math.sqrt(a * a + b * b);
}

/**
 * Gets the current radius for a ripple based on the x and y page dimensions
 * as well as the size of the element.
 *
 * This is really just in a separate file so I can easily mock this and write
 * tests.
 */
export function getRippleRadius(
  x: number,
  y: number,
  offsetWidth: number,
  offsetHeight: number
) {
  return Math.max(
    calcHypotenuse(x, y),
    calcHypotenuse(offsetWidth - x, y),
    calcHypotenuse(offsetWidth - x, offsetHeight - y),
    calcHypotenuse(x, offsetHeight - y)
  );
}
