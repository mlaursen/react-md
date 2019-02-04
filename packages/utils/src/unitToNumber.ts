/**
 * A simple util to convert a unit that is using `px`, `em`, or `rem` to a number so that
 * calculations can be made on that unit.
 *
 * @param unit - The unit to convert to a number
 * @param element - The element to use to use for calculating `em`
 * @return the unit as a number
 */
export default function unitToNumber(
  unit: number | string,
  element?: Element
): number {
  if (typeof unit === "number") {
    return unit;
  } else if (/px$/.test(unit)) {
    return parseFloat(unit);
  }

  const rem = /rem$/.test(unit);
  let el: HTMLElement | Element = document.documentElement as HTMLElement;
  if (!rem && element) {
    el = element.parentElement || element;
  }

  const fontSize = parseFloat(window.getComputedStyle(el).fontSize || "16px");

  return parseFloat(unit) + fontSize;
}
