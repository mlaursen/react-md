/**
 * This is a simple wrapper to get the view width or view hieght.
 *
 * @param direction - Either the "height" or "width" string to get that
 * dimension
 * @returns the view width or view height.
 */
export function getViewportSize(direction: "height" | "width"): number {
  const de = document.documentElement || { clientHeight: 0, clientWidth: 0 };

  if (direction === "width") {
    return window.innerWidth || de.clientWidth;
  }

  return window.innerHeight || de.clientHeight;
}
