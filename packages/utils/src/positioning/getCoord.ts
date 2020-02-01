export interface XCoordConfig {
  xMargin: number;
  elWidth: number;
  containerRect: DOMRect | ClientRect;
}

export interface YCoordConfig {
  yMargin: number;
  elHeight: number;
  containerRect: DOMRect | ClientRect;
}

type Left = number;
type Top = number;

/**
 * Creates the `left` style value for an element that should be fixed to the
 * (outer) left of the container element. So the right bounds of the fixed
 * element will be equal to the left bounds of the container element (before the
 * xMargin is applied).
 * @private
 */
export function getLeftCoord({
  xMargin,
  elWidth,
  containerRect,
}: XCoordConfig): Left {
  return containerRect.left - elWidth - xMargin;
}

/**
 * Creates the `left` style value for an element that should be fixed to the
 * inner-left of the container element. So the left bounds of both the container
 * and fixed elements will overlap (before the xMargin is applied)
 * @private
 */
export function getInnerLeftCoord({
  xMargin,
  containerRect,
}: XCoordConfig): Left {
  return containerRect.left + xMargin;
}

/**
 * Creates the `left` style value for an element that should be fixed to the
 * center of the container element. So the center point of the fixed element
 * should be the center point of the container element.
 *
 * Note: Unlike all the other horizontal positioning logic, the center position
 * does not use the xMargin.
 * @private
 */
export function getCenterXCoord({
  elWidth,
  containerRect,
}: XCoordConfig): Left {
  const containerCenter = containerRect.width / 2;
  const elementCenter = elWidth / 2;
  return containerRect.left + containerCenter - elementCenter;
}

/**
 * Creates the `left` style value for an element that should be fixed to the
 * inner-right of the container element. So the right bounds for both the
 * container and fixed elements will overlap (before the xMargin is applied).
 * @private
 */
export function getInnerRightCoord({
  xMargin,
  elWidth,
  containerRect,
}: XCoordConfig): Left {
  return containerRect.left + containerRect.width - elWidth - xMargin;
}

/**
 * Creates the `left` style value for an element that should be fixed to the
 * (outer) right of the container element. So the left bounds of the fixed
 * element will overlap with the right bounds of the container element (before
 * the xMargin is applied).
 * @private
 */
export function getRightCoord({ xMargin, containerRect }: XCoordConfig): Left {
  return containerRect.left + containerRect.width + xMargin;
}

/**
 * Creates the `top` style value for an element that should be fixed above the
 * container element. So the bottom bounds of the fixed element will overlap
 * with the top bounds of the container element (before the yMargin is applied).
 * @private
 */
export function getAboveCoord({
  yMargin,
  elHeight,
  containerRect,
}: YCoordConfig): Top {
  return containerRect.top - elHeight - yMargin;
}

/**
 * Creates the `top` style value for an element that should be fixed to the top
 * of the container element. So the top bounds for both the container and fixed
 * elements will overlap (before the yMargin is applied).
 * @private
 */
export function getTopCoord({ yMargin, containerRect }: YCoordConfig): Top {
  return containerRect.top + yMargin;
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
  containerRect,
}: YCoordConfig): Top {
  const containerCenter = containerRect.height / 2;
  const elementCenter = elHeight / 2;
  return containerRect.top + containerCenter - elementCenter;
}

/**
 * Creates the `top` style value for an element that should be fixed to the
 * bottom of the container element. So the top bounds of the fixed element
 * should overlap the bottom bounds of the container element (before the yMargin
 * is applied).
 * @private
 */
export function getBottomCoord({
  yMargin,
  elHeight,
  containerRect,
}: YCoordConfig): Top {
  return containerRect.top + containerRect.height - elHeight - yMargin;
}

/**
 * Creates the `top` style value for an element that should be fixed to the
 * bottom of the container element. So the bottom bounds of both the container
 * and fixed elements should overlap (before the yMargin is applied).
 * @private
 */
export function getBelowCoord({ yMargin, containerRect }: YCoordConfig): Top {
  return containerRect.top + containerRect.height + yMargin;
}
