import React, { Children, forwardRef, HTMLAttributes, ReactNode } from "react";

import { GridListCell } from "./GridListCell";
import {
  DEFAULT_GRID_LIST_MAX_CELL_SIZE,
  DEFAULT_GRID_LIST_PADDING,
  GridListSize,
  GridListSizeProvider,
  useGridList,
  UseGridListOptions,
} from "./useGridList";

/**
 * The children render function that will be provided the current grid list size
 * object and should return renderable elements.
 *
 * Note: The first time this is called, the `columns` and `cellWidth` will be
 * the `defaultSize`.  Once the `GridList` has been fully mounted in the DOM, it
 * will begin the sizing calculations and update with the "real" values. This
 * doesn't cause any problems if you are only rendering client side, but it
 * might mess up server-side rendering, so it is recommended to update the
 * `defaultSize` when server-side rendering if this can be "known" service-side
 * in your app.
 */
export type RenderGridListChildren = (size: GridListSize) => ReactNode;

export interface GridListProps
  extends HTMLAttributes<HTMLDivElement>,
    UseGridListOptions {
  /**
   * Boolean if the resize observer should stop tracking width changes within
   * the `GridList`. This should normally stay as `false` since tracking width
   * changes will allow for dynamic content being added to the list to not mess
   * up the grid calculation when the user is on an OS that shows scrollbars.
   */
  disableHeightObserver?: boolean;

  /**
   * Boolean if the resize observer should stop tracking width changes within
   * the `GridList`. This should normally stay as `false` since tracking width
   * changes will allow for dynamic content being added to the list to not mess
   * up the grid calculation when the user is on an OS that shows scrollbars.
   */
  disableWidthObserver?: boolean;

  /**
   * The children to display within the grid list. This can either be a callback
   * function that will provide the current calculated width for each cell that
   * should return renderable elements or any renderable elements that are sized
   * with the `--rmd-cell-width` css variable.
   */
  children: ReactNode | RenderGridListChildren;

  /**
   * Boolean if the current cell sizing should automatically be cloned into each
   * child. This will only work if the `children` is renderable element or a
   * list of renderable elements that accept the `style` and `className` props.
   */
  clone?: boolean;

  /**
   * Boolean if each child within the `GridList` should be wrapped with the
   * `GridListCell` component.  This will only work if the `children` is not a
   * `function`.
   */
  wrapOnly?: boolean;
}

const isRenderFunction = (
  children: GridListProps["children"]
): children is RenderGridListChildren => typeof children === "function";

/**
 * The `GridList` component is a different way to render a list of data where
 * the number of columns is dynamic and based on the max-width for each cell.
 * Instead of setting a percentage width to each cell based on the number of
 * columns, this will dynamically add columns to fill up the remaining space and
 * have each cell grow up to a set max-width. A really good use-case for this is
 * displaying a list of images or thumbnails and allowing the user to see a full
 * screen preview once selected/clicked.
 */
export const GridList = forwardRef<HTMLDivElement, GridListProps>(
  function GridList(
    {
      style,
      className,
      children,
      clone = false,
      wrapOnly = false,
      cellMargin,
      defaultSize,
      maxCellSize = DEFAULT_GRID_LIST_MAX_CELL_SIZE,
      containerPadding = DEFAULT_GRID_LIST_PADDING,
      disableHeightObserver = false,
      disableWidthObserver = false,
      ...props
    },
    forwardedRef
  ) {
    const [gridListProps, gridSize] = useGridList({
      ref: forwardedRef,
      style,
      className,
      cellMargin,
      defaultSize,
      maxCellSize,
      containerPadding,
      disableHeight: disableHeightObserver,
      disableWidth: disableWidthObserver,
    });

    let content: ReactNode = null;
    if (isRenderFunction(children)) {
      content = children(gridSize);
    } else if (clone || wrapOnly) {
      content = Children.map(
        children,
        (child) => child && <GridListCell clone={clone}>{child}</GridListCell>
      );
    } else {
      content = children;
    }

    return (
      <GridListSizeProvider value={gridSize}>
        <div {...props} {...gridListProps}>
          {content}
        </div>
      </GridListSizeProvider>
    );
  }
);

/* istanbul ignore next */
if (process.env.NODE_ENV !== "production") {
  try {
    const PropTypes = require("prop-types");

    GridList.propTypes = {
      style: PropTypes.object,
      clone: PropTypes.bool,
      wrapOnly: PropTypes.bool,
      className: PropTypes.string,
      children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
      cellMargin: PropTypes.string,
      maxCellSize: PropTypes.number,
      defaultSize: PropTypes.oneOfType([
        PropTypes.shape({
          columns: PropTypes.number.isRequired,
          cellWidth: PropTypes.number.isRequired,
        }),
        PropTypes.func,
      ]),
      containerPadding: PropTypes.number,
      disableHeightObserver: PropTypes.bool,
      disableWidthObserver: PropTypes.bool,
    };
  } catch (e) {}
}
