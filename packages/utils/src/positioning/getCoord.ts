export interface XCoordConfig {
  xMargin: number;
  elWidth: number;
  initialX?: number;
  containerRect: DOMRect | ClientRect;
}

export interface YCoordConfig {
  yMargin: number;
  elHeight: number;
  initialY?: number;
  containerRect: DOMRect | ClientRect;
}

type Left = number;
type Top = number;

/**
 * Creates the `left` style value for an element that should be fixed to the
 * (outer) left of the container element. So the right bounds of the fixed
 * element will be equal to the left bounds of the container element (before the
 * xMargin is applied).
 * @internal
 */
export function getLeftCoord({
  xMargin,
  elWidth,
  initialX,
  containerRect,
}: XCoordConfig): Left {
  return (initialX ?? containerRect.left) - elWidth - xMargin;
}

/**
 * Creates the `left` style value for an element that should be fixed to the
 * inner-left of the container element. So the left bounds of both the container
 * and fixed elements will overlap (before the xMargin is applied)
 * @internal
 */
export function getInnerLeftCoord({
  xMargin,
  initialX,
  containerRect,
}: XCoordConfig): Left {
  return (initialX ?? containerRect.left) + xMargin;
}

/**
 * Creates the `left` style value for an element that should be fixed to the
 * center of the container element. So the center point of the fixed element
 * should be the center point of the container element.
 *
 * Note: Unlike all the other horizontal positioning logic, the center position
 * does not use the xMargin.
 * @internal
 */
export function getCenterXCoord({
  elWidth,
  initialX,
  containerRect,
}: XCoordConfig): Left {
  const containerCenter = containerRect.width / 2;
  const elementCenter = elWidth / 2;
  return (initialX ?? containerRect.left + containerCenter) - elementCenter;
}

/**
 * Creates the `left` style value for an element that should be fixed to the
 * inner-right of the container element. So the right bounds for both the
 * container and fixed elements will overlap (before the xMargin is applied).
 * @internal
 */
export function getInnerRightCoord({
  xMargin,
  elWidth,
  initialX,
  containerRect,
}: XCoordConfig): Left {
  return (
    (initialX ?? containerRect.left + containerRect.width) - elWidth - xMargin
  );
}

/**
 * Creates the `left` style value for an element that should be fixed to the
 * (outer) right of the container element. So the left bounds of the fixed
 * element will overlap with the right bounds of the container element (before
 * the xMargin is applied).
 * @internal
 */
export function getRightCoord({
  xMargin,
  initialX,
  containerRect,
}: XCoordConfig): Left {
  return (initialX ?? containerRect.left + containerRect.width) + xMargin;
}

/**
 * Creates the `top` style value for an element that should be fixed above the
 * container element. So the bottom bounds of the fixed element will overlap
 * with the top bounds of the container element (before the yMargin is applied).
 * @internal
 */
export function getAboveCoord({
  yMargin,
  initialY,
  elHeight,
  containerRect,
}: YCoordConfig): Top {
  return (initialY ?? containerRect.top) - elHeight - yMargin;
}

/**
 * Creates the `top` style value for an element that should be fixed to the top
 * of the container element. So the top bounds for both the container and fixed
 * elements will overlap (before the yMargin is applied).
 * @internal
 */
export function getTopCoord({
  yMargin,
  initialY,
  containerRect,
}: YCoordConfig): Top {
  return (initialY ?? containerRect.top) + yMargin;
}

/**
 * Creates the `top` style value for an element that should be fixed vertically
 * centered relative to the container element. So the vertical center point for
 * the fixed element should overlap the vertical center point of the container
 * element.
 *
 * Note: Unlike all the other vertical positioning logic, the center position
 * does not use the yMargin.
 */
export function getCenterYCoord({
  elHeight,
  initialY,
  containerRect,
}: YCoordConfig): Top {
  const containerCenter = containerRect.height / 2;
  const elementCenter = elHeight / 2;
  return (initialY ?? containerRect.top + containerCenter) - elementCenter;
}

/**
 * Creates the `top` style value for an element that should be fixed to the
 * bottom of the container element. So the top bounds of the fixed element
 * should overlap the bottom bounds of the container element (before the yMargin
 * is applied).
 * @internal
 */
export function getBottomCoord({
  yMargin,
  initialY,
  elHeight,
  containerRect,
}: YCoordConfig): Top {
  return (
    (initialY ?? containerRect.top + containerRect.height) - elHeight - yMargin
  );
}

/**
 * Creates the `top` style value for an element that should be fixed to the
 * bottom of the container element. So the bottom bounds of both the container
 * and fixed elements should overlap (before the yMargin is applied).
 * @internal
 */
export function getBelowCoord({
  yMargin,
  initialY,
  containerRect,
}: YCoordConfig): Top {
  return (initialY ?? containerRect.top + containerRect.height) + yMargin;
}
