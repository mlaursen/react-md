import { type Point } from "../types.js";

/**
 * @since 6.3.0
 * @internal
 */
export const radiansToDegrees = (radians: number): number =>
  (radians * 180) / Math.PI;

/**
 * @since 6.3.0
 * @internal
 */
export const degreesToRadians = (degrees: number): number =>
  (degrees * Math.PI) / 180;

/**
 * @since 6.3.0
 * @internal
 */
interface IsPointInCircleOptions {
  point: Point;
  center: Point;
  radius: number;
}

/**
 * @since 6.3.0
 * @internal
 */
export function isPointInCircle(options: IsPointInCircleOptions): boolean {
  const { point, center, radius } = options;

  const distance = (center.x - point.x) ** 2 + (center.y - point.y) ** 2;
  return distance <= radius ** 2;
}

/**
 * @internal
 * @since 6.3.0
 */
export function calcHypotenuse(point: Point): number {
  const { x, y } = point;

  return Math.sqrt(x * x + y * y);
}
