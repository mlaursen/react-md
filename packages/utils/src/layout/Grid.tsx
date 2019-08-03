import React, { FC, forwardRef, HTMLAttributes } from "react";
import cn from "classnames";

import { useAppSizeContext } from "../sizing/AppSize";
import { WithForwardedRef } from "../types";

/**
 * This CSS Variable allows you to override the number of columns that should be displayed in the
 * grid. This is automatically updated with media queries with the default grid implementation, but
 * is used here to add additional inline-style overrides.
 *
 * @private
 */
export const GRID_COLUMNS_VAR = "--rmd-grid-cols";

/**
 * This CSS Variable allows you to override the gutter (grid-gap) between each cell in the grid.
 *
 * @private
 */
export const GRID_GUTTER_VAR = "--rmd-grid-gutter";

export interface GridProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * This prop allows you to generate your grid with a dynamic amount of columns instead of a static
   * size. This will update the grid to ignore all the `columns` props and update the grid to show
   * as many columns as possible by updating the `grid-template-columns` style to be:
   *
   * ```scss
   * grid-template-columns: repeat(auto-fill, minmax($min-cell-width, 1fr));
   * ```
   *
   * This **needs to be a number with a unit**. Check out the documentation on the `minmax` css function
   * for some more info.
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/CSS/minmax
   */
  minCellWidth?: "min-content" | "max-content" | "auto" | string;

  /**
   * An optional number of columns to apply for all media types. Providing one of the media-spcific
   * column props will override this value for those breakpoints still.
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
   * This is really just a pass-through of the `style` prop that allows you to quickly update the base
   * padding for the grid.
   */
  padding?: number | string;

  /**
   * This will override the default grid cell's gutter value (the space between each cell). This **needs to be
   * a number with a unit** since it is set to a css variable. Examples:
   *
   * - `1rem`
   * - `16px`
   * - `1em`
   * - `5%`
   */
  gutter?: string;
}

type WithRef = WithForwardedRef<HTMLDivElement>;
type CSSProperties = React.CSSProperties & {
  [GRID_GUTTER_VAR]?: string;
  [GRID_COLUMNS_VAR]?: number;
};

/**
 * The grid component is generally used for a base layout in your app to provide nice padding
 * and spacing between each item.
 *
 * Note: This component relies on the `AppSizeListener` as a parent component to work and will
 * throw an error if it does not exist as a parent.
 */
const Grid: FC<GridProps & WithRef> = ({
  style,
  className,
  forwardedRef,
  children,
  columns,
  phoneColumns,
  tabletColumns,
  desktopColumns,
  largeDesktopColumns,
  padding,
  gutter,
  minCellWidth,
  ...props
}) => {
  const { isPhone, isTablet, isDesktop, isLargeDesktop } = useAppSizeContext();

  const mergedStyle: CSSProperties = {
    padding,
    gridTemplateColumns: minCellWidth
      ? `repeat(auto-fill, minmax(${minCellWidth}, 1fr))`
      : undefined,
    ...style,
    [GRID_COLUMNS_VAR]:
      (isPhone && phoneColumns) ||
      (isTablet && tabletColumns) ||
      (isDesktop && desktopColumns) ||
      (isLargeDesktop && largeDesktopColumns) ||
      columns,
    [GRID_GUTTER_VAR]: gutter,
  };

  return (
    <div
      {...props}
      style={mergedStyle}
      ref={forwardedRef}
      className={cn("rmd-grid", className)}
    >
      {children}
    </div>
  );
};

if (process.env.NODE_ENV !== "production") {
  Grid.displayName = "Grid";

  let PropTypes;
  try {
    PropTypes = require("prop-types");
  } catch (e) {}

  if (PropTypes) {
    Grid.propTypes = {
      style: PropTypes.object,
      className: PropTypes.string,
      columns: PropTypes.number,
      phoneColumns: PropTypes.number,
      tabletColumns: PropTypes.number,
      desktopColumns: PropTypes.number,
      largeDesktopColumns: PropTypes.number,
      padding: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      gutter: PropTypes.string,
      children: PropTypes.node,
      forwardedRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
      minCellWidth: PropTypes.string,
    };
  }
}
export default forwardRef<HTMLDivElement, GridProps>((props, ref) => (
  <Grid {...props} forwardedRef={ref} />
));
