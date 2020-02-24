import React, {
  Children,
  forwardRef,
  HTMLAttributes,
  ReactElement,
  Ref,
} from "react";
import { cnb } from "cnbuilder";

import bem from "../bem";
import useAppSize from "../sizing/useAppSize";
import GridCell from "./GridCell";

/**
 * This CSS Variable allows you to override the number of columns that should be
 * displayed in the grid. This is automatically updated with media queries with
 * the default grid implementation, but is used here to add additional
 * inline-style overrides.
 *
 * @private
 */
export const GRID_COLUMNS_VAR = "--rmd-grid-cols";

/**
 * This CSS Variable allows you to override the gutter (grid-gap) between each
 * cell in the grid.
 *
 * @private
 */
export const GRID_GUTTER_VAR = "--rmd-grid-gutter";

export interface GridProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Boolean if the `children` should be updated to be wrapped in the `GridCell`
   * component and clone the `className` into each child automatically. This is
   * really just a convenience prop so you don't always need to import both the
   * `Grid` and `GridCell` components to create a grid.
   */
  clone?: boolean;

  /**
   * Boolean if the `children` should be updated to be wrapped in the `GridCell`
   * component.  This is really just a convenience prop so you don't always need
   * to import both the `Grid` and `GridCell` components to create a grid/
   */
  wrapOnly?: boolean;

  /**
   * This prop allows you to generate your grid with a dynamic amount of columns
   * instead of a static size. This will update the grid to ignore all the
   * `columns` props and update the grid to show as many columns as possible by
   * updating the `grid-template-columns` style to be:
   *
   * ```scss
   * grid-template-columns: repeat(auto-fill, minmax($min-cell-width, 1fr));
   * ```
   *
   * This **needs to be a number with a unit**. Check out the documentation on
   * the `minmax` css function for some more info.
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/CSS/minmax
   */
  minCellWidth?: "min-content" | "max-content" | "auto" | string;

  /**
   * An optional number of columns to apply for all media types. Providing one
   * of the media-spcific column props will override this value for those
   * breakpoints still.
   */
  columns?: number;

  /**
   * An optional number of columns to display for phones.
   */
  phoneColumns?: number;

  /**
   * An optional number of columns to display for tablets.
   */
  tabletColumns?: number;

  /**
   * An optional number of columns to display for desktop screens.
   */
  desktopColumns?: number;

  /**
   * An optional number of columns to display for large desktop screens.
   */
  largeDesktopColumns?: number;

  /**
   * This is really just a pass-through of the `style` prop that allows you to
   * quickly update the base padding for the grid.
   */
  padding?: number | string;

  /**
   * This will override the default grid cell's gutter value (the space between
   * each cell). This **needs to be a number with a unit** since it is set to a
   * css variable. Examples:
   *
   * - `1rem`
   * - `16px`
   * - `1em`
   * - `5%`
   */
  gutter?: string;
}

type CSSProperties = React.CSSProperties & {
  [GRID_GUTTER_VAR]?: string;
  [GRID_COLUMNS_VAR]?: number;
};

const block = bem("rmd-grid");

/**
 * The grid component is generally used for a base layout in your app to provide
 * nice padding and spacing between each item.
 *
 * Note: This component relies on the `AppSizeListener` as a parent component to
 * work and will throw an error if it does not exist as a parent.
 */
function Grid(
  {
    style,
    className,
    children,
    clone = false,
    wrapOnly = false,
    columns,
    phoneColumns,
    tabletColumns,
    desktopColumns,
    largeDesktopColumns,
    padding,
    gutter,
    minCellWidth,
    ...props
  }: GridProps,
  ref?: Ref<HTMLDivElement>
): ReactElement {
  const { isPhone, isTablet, isDesktop, isLargeDesktop } = useAppSize();

  const mergedStyle: CSSProperties = {
    padding: (padding !== 0 && padding) || undefined,
    gridTemplateColumns: minCellWidth
      ? `repeat(auto-fill, minmax(${minCellWidth}, 1fr))`
      : undefined,
    ...style,
    [GRID_COLUMNS_VAR]:
      (isPhone && phoneColumns) ||
      (isTablet && tabletColumns) ||
      (isLargeDesktop && largeDesktopColumns) ||
      (isDesktop && desktopColumns) ||
      columns,
    [GRID_GUTTER_VAR]: gutter,
  };

  let content = children;
  if (clone || wrapOnly) {
    content = Children.map(children, child => (
      <GridCell clone={clone}>{child}</GridCell>
    ));
  }

  return (
    <div
      {...props}
      ref={ref}
      style={mergedStyle}
      className={cnb(block({ "no-padding": padding === 0 }), className)}
    >
      {content}
    </div>
  );
}

const ForwardedGrid = forwardRef<HTMLDivElement, GridProps>(Grid);

if (process.env.NODE_ENV !== "production") {
  try {
    const PropTypes = require("prop-types");

    ForwardedGrid.propTypes = {
      style: PropTypes.object,
      className: PropTypes.string,
      clone: PropTypes.bool,
      wrapOnly: PropTypes.bool,
      columns: PropTypes.number,
      phoneColumns: PropTypes.number,
      tabletColumns: PropTypes.number,
      desktopColumns: PropTypes.number,
      largeDesktopColumns: PropTypes.number,
      padding: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      gutter: PropTypes.string,
      children: PropTypes.node,
      minCellWidth: PropTypes.string,
    };
  } catch (e) {}
}

export default ForwardedGrid;
