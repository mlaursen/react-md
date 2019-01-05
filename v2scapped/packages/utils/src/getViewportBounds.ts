import getViewportSize from "./getViewportSize";

/**
 * A utility function that will get the viewport bounding area used for positioning
 * calculations.
 *
 * @param direction - The viewport direction to get bounds for
 * @param marginOrThreshold - The provided margin or threshold to apply to the viewport
 * size. If this value is greater than one, it will be considered a constant margin and
 * be used. However, if this is less than or equal to 1, it will be multiplied with the
 * viewport size to create a percentage value.
 * @param subtractSize - Boolean if the current viewport size should have the bounds
 * subtracted as the return result.
 */
export default function getViewportBounds(
  direction: "height" | "width",
  marginOrThreshold: number = 0,
  subtractSize: boolean = true
): number {
  const size = getViewportSize(direction);
  const bounds = marginOrThreshold > 1 ? marginOrThreshold : size * marginOrThreshold;

  return subtractSize ? size - bounds : bounds;
}
