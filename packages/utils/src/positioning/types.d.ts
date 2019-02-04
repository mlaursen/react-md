export type HorizontalPosition =
  | "left"
  | "inner left"
  | "center"
  | "right"
  | "inner right"
  | "auto";

export type VerticalPosition =
  | "above"
  | "below"
  | "center"
  | "overlap"
  | "auto";

export interface IPositionOptions {
  /**
   * An optional horizontal position to use. This defaults to automagically determining the
   * "best" location based on the `fixedTo` element's position within the viewport and the
   * `target` element's size.
   */
  horizontalPosition?: HorizontalPosition;

  /**
   * An optional vertical position to use. This defaults to automagically determining the
   * "best" location based on the `fixedTo` element's position within the viewport and the
   * `target` element's size.
   */
  verticalPosition?: VerticalPosition;

  /**
   * This should be a number between 0 and 1 (inclusive). This will allow the target element
   * to overlap the `fixedTo` by a percentage of the `fixedTo`'s height.
   */
  heightOverlapMultiplier?: number;

  /**
   * This should be a number between 0 and 1 (inclusive). This will allow the target element
   * to overlap the `fixedTo` by a percentage of the `fixedTo`'s width.
   */
  widthOverlapMultiplier?: number;

  /**
   * This prop is to help position the target element within the viewport based on the relative
   * element. When this value is less than `1`, it will be used as a viewport multiplier. If it
   * is greater than `1`, it will be `x` number of pixels from the edge of the viewport.
   *
   * Multiplier Example:
   * ```js
   * const viewportThreshold = 0.03;
   * const isOutOfBoundsLeft = fixedTo.left < (viewportWidth * viewportThreshold);
   * const isOutOfBoundsBottom = fixedTo.top < (viewportHeight - (viewportHeight * viewportThreshold));
   * ```
   *
   * Pixel Example:
   * ```js
   * const viewportThreshold = 20;
   * const isOutOfBoundsLeft = fixedTo.left < viewportThreshold;
   * const isOutOfBoundsBottom = fixedTo.top < (viewportHeight - viewportThreshold);
   * ```
   */
  viewportThreshold?: number;

  /**
   * The amount of horizontal margin to use when positioning the target element within the viewport.
   * This will be applied to both the left and right of the page.
   */
  vwMargin?: number;

  /**
   * The amount of vertical margin to use when positioning the target element within the viewport.
   * This will be applied to both the top and bottom of the page.
   */
  vhMargin?: number;

  /**
   * The amount of spacing to put between the `fixedTo` element and the `target` element. This
   * should be a string of a number of pixels or a number in rem. This will update the styles
   * to do a `calc(${CALCULATED_POSITION}px - ${spacing})`.
   *
   * Examples:
   * - '20px'
   * - '0.825rem'
   */
  horizontalSpacing?: string;

  /**
   * The amount of spacing to put between the `fixedTo` element and the `target` element. This
   * should be a string of a number of pixels or a number in rem. This will update the styles
   * to do a `calc(${CALCULATED_POSITION}px - ${spacing})`.
   *
   * Examples:
   * - '20px'
   * - '0.825rem'
   */
  verticalSpacing?: string;
}

export interface IPositioningStyle {
  top: number | string;
  left: number | string;
  position: "fixed";
  transformOrigin: string;
  width?: number | string;

  // only used if the target element's height is bigger than the viewport height with margins
  bottom?: number;

  // only used if the target element's width is bigger than the viewport width with margins
  right?: number;
}
