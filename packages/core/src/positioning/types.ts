/**
 * Above:
 * - the container top is in-line with the bottom of the element.
 *
 * Below:
 * - the container bottom is in-line with the top of the element
 *
 * Center:
 * - the container center is in-line with the top of the element
 *
 * Top:
 * - the container top is in-line with the top of the element
 *
 * Bottom:
 * - the container bottom is in-line with the bottom of the element
 */
export type VerticalPosition = "above" | "below" | "center" | "top" | "bottom";

/**
 * Left:
 * - the container left is in-line with the right of the element
 *
 * Right:
 * - the container right is in-line with the left of the element
 *
 * Center:
 * - the container's horizontal center point will be aligned with the element's
 *   horizontal center point
 *
 * Inner Left:
 * - the container's left is in-line with the left of the element
 *
 * Inner Right:
 * - the container's right is in-line with the right of the element
 */
export type HorizontalPosition =
  | "left"
  | "right"
  | "center"
  | "inner-left"
  | "inner-right";

/**
 * An object containing the x and y positions to anchor a fixed element to
 * another container element.
 */
export interface PositionAnchor {
  x: HorizontalPosition;
  y: VerticalPosition;
}

/**
 * A "simple" version of all the positioning options. These are generally used
 * across all of react-md as it'll use the "center" version of the opposite type
 * when creating a fixed position.
 */
export type SimplePosition = "above" | "below" | "left" | "right";

/**
 * An optional configuration for calculating and setting the width of the
 * element relative to the width of the container. When this value is set to
 * `"auto"` (default), the width will be based on content width but still
 * ensuring it can fit within the viewport. Setting this to `"equal"` will just
 * apply the container's width to the fixed element. Finally, setting this to
 * `"min"` will set the container's width as the `minWidth` for the fixed
 * element so that it is at least the same width as the container.
 *
 * If this is set to `"equal"` or `"min"` and the horizontal anchor is not set
 * to `"center"`, an error will be thrown.
 *
 * @defaultValue `"auto"`
 */
export type PositionWidth = "auto" | "equal" | "min";

export interface InitialCoords {
  /**
   * The initial x value to use when calculating the position instead of
   * finding the container element to determine the the correct position. All
   * the other positioning logic will still be in effect to ensure the element
   * will be visible within the viewport.
   */
  initialX?: number;

  /**
   * The initial y value to use when calculating the position instead of
   * finding the container element to determine the the correct position. All
   * the other positioning logic will still be in effect to ensure the element
   * will be visible within the viewport.
   */
  initialY?: number;
}

/** @remarks \@since 4.0.0 */
export interface CalculateFixedPositionOptions extends InitialCoords {
  /**
   * The configuration to anchor the fixed element to the container element.
   *
   * @defaultValue `BELOW_CENTER_ANCHOR`
   */
  anchor?: PositionAnchor;

  /**
   * The viewwidth margin to apply so that the element doesn't need to be
   * directly on the screen edge.
   *
   * @defaultValue `16`
   */
  vwMargin?: number;

  /**
   * The viewwidth margin to apply so that the element doesn't need to be
   * directly on the screen edge.
   *
   * @defaultValue `16`
   */
  vhMargin?: number;

  /**
   * The container width margin to apply so that the element doesn't need to be
   * directly on the container's edge.
   *
   * @defaultValue `0`
   */
  xMargin?: number;

  /**
   * The container height margin to apply so that the element doesn't need to be
   * directly on the container's edge
   *
   * @defaultValue `0`
   */
  yMargin?: number;

  /** {@inheritDoc PositionWidth} */
  width?: PositionWidth;

  /**
   * Boolean if the style object should include the `transformOrigin` value
   * based on the x and y positions.
   *
   * @defaultValue `false`
   */
  transformOrigin?: boolean;

  /**
   * Boolean if the fixed element should no longer be able to overlap the
   * container element. This is useful for autocomplete menus or other
   * components that retain focus on the container element while the fixed
   * element becomes visible.
   *
   * @defaultValue `false`
   */
  preventOverlap?: boolean;

  /**
   * Boolean if the auto-swapping behavior should be disabled. It's normally
   * recommended to not disable this since it'll allow elements to appear off
   * screen.
   *
   * @defaultValue `false`
   * @remarks \@since 5.0.0 This will always be `true` if the
   * {@link FixedPositionOptions.container} is `null`.
   */
  disableSwapping?: boolean;

  /**
   * Boolean if the fixed positioning should no longer prevent the fixed element
   * to be positioned within the viewport. This is nice if you want to allow for
   * full page scrolling instead and manually set a max-height on your element.
   *
   * @defaultValue `false`
   */
  disableVHBounds?: boolean;
}

export interface FixedPositionOptions extends CalculateFixedPositionOptions {
  /**
   * The container element that the `element` should be fixed to.
   */
  container: HTMLElement | null;

  /**
   * The element that is fixed to a `container` element.
   */
  element: HTMLElement | null;
}

/**
 * This is more of a private interface that is used to help show how fixed
 * elements are placed within the viewport. Most of the time the `top` and
 * `left` values will be provided, but there are a few flows where the `right`
 * and `bottom` could be added or the `top` and `left` are removed.
 *
 * The `width` values will only be used when the `equalWidth` or `minEqualWidth`
 * options are enabled.
 *
 * @internal
 */
export interface Coords {
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
  width?: number;
  minWidth?: number;
}

/**
 * The style object that should be applied to the fixed element so it will be
 * fixed to the container element. This will be `undefined` if the container
 * element doesn't exist within the DOM.
 *
 * Note: The fixed element styles **will not** contain styles for `z-index` or
 * `background-color` so you'll need to add that manually.
 *
 * @remarks \@since 4.0.0
 */
export interface FixedPositionStyle extends Coords {
  /**
   * This will be `"fixed"` unless
   * {@link CalculateFixedPositionOptions.disableVHBounds} is set to `true`.
   */
  position: "fixed" | "absolute";

  /**
   * This will be `undefined` unless
   * {@link CalculateFixedPositionOptions.transformOrigin} is set to `true`
   */
  transformOrigin?: string;
}

/**
 * Since the position can be "swapped" to help fit the fixed element within the
 * viewport, this interface is used to contain the calculated positions as well
 * as an optional style object to apply.
 */
export interface FixedPosition {
  /**
   * The calculated horizontal position that can be used to compare to the
   * provided horizontal position anchor if additional manual updates should be
   * applied.
   */
  actualX: HorizontalPosition;

  /**
   * The calculated vertical position that can be used to compare to the
   * provided horizontal position anchor if additional manual updates should be
   * applied.
   */
  actualY: VerticalPosition;
  /** {@inheritDoc FixedPositionStyle} */
  style?: FixedPositionStyle;
}
