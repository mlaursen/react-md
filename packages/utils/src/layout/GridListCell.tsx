import React, {
  Children,
  cloneElement,
  forwardRef,
  HTMLAttributes,
  isValidElement,
  ReactElement,
  Ref,
} from "react";
import cn from "classnames";

import bem from "../css/bem";

export interface GridListCellProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Boolean if the className should be cloned into the child instead of
   * wrapping in another div. This will only work if the `children` is a single
   * ReactElement.
   */
  clone?: boolean;

  /**
   * Boolean if the cell should be square by also setting the current cell size
   * to the `height`.
   */
  square?: boolean;
}

const block = bem("rmd-grid-list");

function GridListCell(
  {
    className,
    children,
    square = false,
    clone = false,
    ...props
  }: GridListCellProps,
  ref?: Ref<HTMLDivElement>
): ReactElement {
  const cellClassName = cn(block("cell", { square }), className);
  if (clone && isValidElement(children)) {
    const child = Children.only(children);
    return cloneElement(child, {
      className: cn(cellClassName, child.props.className),
    });
  }

  return (
    <div {...props} ref={ref} className={cellClassName}>
      {children}
    </div>
  );
}

const ForwardedGridListCell = forwardRef<HTMLDivElement, GridListCellProps>(
  GridListCell
);

if (process.env.NODE_ENV !== "production") {
  try {
    const PropTypes = require("prop-types");

    ForwardedGridListCell.propTypes = {
      clone: PropTypes.bool,
      square: PropTypes.bool,
      className: PropTypes.string,
      children: PropTypes.node,
    };
  } catch (e) {}
}

export default ForwardedGridListCell;
