import React, { FC, forwardRef, HTMLAttributes } from "react";
import cn from "classnames";

import bem from "../css/bem";
import { useAppSizeContext } from "../sizing/AppSize";
import { WithForwardedRef } from "../types";

export interface GridCSSProperties {
  /**
   * The number of rows that a cell should span. If this value is provided, it will be used
   * instead of the `rowEnd` property. When this is `undefined`, it will span 1 row as normal.
   */
  rowSpan?: number;

  /**
   * The row that the cell should start at. This is a nice way to be able to reorder cells within
   * your grid.
   */
  rowStart?: number | string;

  /**
   * The row that the cell should end at. This is a nice way to be able to reorder cells within
   * your grid but will be ignored if the `rowSpan` property is provided.
   */
  rowEnd?: number | string;

  /**
   * The column that the cell should start at. When this is `undefined`, it will just appear in normal
   * order within the grid.
   */
  colStart?: number | string;

  /**
   * The column that the cell should stop at. When this is `undefined`, it will just appear in normal
   * order within the grid and span only 1 column. If the `colSpan` property was provided, this will
   * be ignored.
   */
  colEnd?: number | string;
}

export interface GridCellProps
  extends HTMLAttributes<HTMLDivElement>,
    GridCSSProperties {
  /**
   * The number of columns that the cell should span. If this value is provided, it will be used
   * instead of the `colEnd` property.
   *
   * Note: If this value is larger than the number of columns allowed in the current grid, it will
   * shrink all the other columns.
   */
  colSpan?: number;

  /**
   * Optional Grid CSS Property overries that should be applied on phones only.
   */
  phone?: GridCSSProperties;

  /**
   * Optional Grid CSS Property overries that should be applied on tablets and above.
   */
  tablet?: GridCSSProperties;

  /**
   * Optional Grid CSS Property overries that should be applied on desktop screens.
   */
  desktop?: GridCSSProperties;

  /**
   * Optional Grid CSS Property overries that should be applied on large desktops only.
   */
  largeDesktop?: GridCSSProperties;
}

const block = bem("rmd-grid");

type WithRef = WithForwardedRef<HTMLDivElement>;

const GridCell: FC<GridCellProps & WithRef> = ({
  style,
  className,
  forwardedRef,
  children,
  colSpan,
  colStart: propColStart,
  colEnd: propColEnd,
  rowSpan: propRowSpan,
  rowStart: propRowStart,
  rowEnd: propRowEnd,
  phone,
  tablet,
  desktop,
  largeDesktop,
  ...props
}) => {
  const { isPhone, isTablet, isDesktop, isLargeDesktop } = useAppSizeContext();

  let colStart = propColStart;
  let colEnd = propColEnd;
  let rowSpan = propRowSpan;
  let rowStart = propRowStart;
  let rowEnd = propRowEnd;
  const media =
    (isPhone && phone) ||
    (isTablet && tablet) ||
    (isDesktop && desktop) ||
    (isLargeDesktop && largeDesktop);

  if (media) {
    ({
      rowSpan = propRowSpan,
      rowStart = propRowStart,
      rowEnd = propRowEnd,
      colStart = propColStart,
      colEnd = propColEnd,
    } = media);
  }

  return (
    <div
      {...props}
      style={{
        gridColumnStart: colStart,
        gridColumnEnd: colEnd,
        gridRowStart: rowStart,
        gridRowEnd: rowSpan ? `span ${rowSpan}` : rowEnd,
        ...style,
      }}
      ref={forwardedRef}
      className={cn(block("cell", { [`${colSpan}`]: colSpan }), className)}
    >
      {children}
    </div>
  );
};

if (process.env.NODE_ENV !== "production") {
  GridCell.displayName = "GridCell";

  let PropTypes;
  try {
    PropTypes = require("prop-types");
  } catch (e) {}

  if (PropTypes) {
    const gridCSSProperties = PropTypes.shape({
      rowSpan: PropTypes.number,
      rowStart: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      rowEnd: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      colSpan: PropTypes.number,
      colStart: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      colEnd: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    });

    GridCell.propTypes = {
      style: PropTypes.object,
      className: PropTypes.string,
      rowSpan: PropTypes.number,
      rowStart: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      rowEnd: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      colSpan: PropTypes.number,
      colStart: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      colEnd: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      phone: gridCSSProperties,
      tablet: gridCSSProperties,
      desktop: gridCSSProperties,
      largeDesktop: gridCSSProperties,
      children: PropTypes.node,
      forwardedRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    };
  }
}

export default forwardRef<HTMLDivElement, GridCellProps>((props, ref) => (
  <GridCell {...props} forwardedRef={ref} />
));
