import React, {
  FC,
  forwardRef,
  HTMLAttributes,
  Children,
  cloneElement,
  isValidElement,
} from "react";
import cn from "classnames";

import bem from "../css/bem";
import { WithForwardedRef } from "../types";

export interface GridListCellProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Boolean if the className should be cloned into the child instead of wrapping
   * in another div. This will only work if the `children` is a single ReactElement.
   */
  clone?: boolean;

  /**
   * Boolean if the cell should be square by also setting the current cell size
   * to the `height`.
   */
  square?: boolean;
}

type WithRef = WithForwardedRef<HTMLDivElement>;
type DefaultProps = Required<Pick<GridListCellProps, "clone" | "square">>;
type WithDefaultProps = GridListCellProps & DefaultProps & WithRef;

const block = bem("rmd-grid-list");

const GridListCell: FC<GridListCellProps & WithRef> = providedProps => {
  const {
    className,
    forwardedRef,
    children,
    square,
    clone,
    ...props
  } = providedProps as WithDefaultProps;

  const cellClassName = cn(block("cell", { square }), className);
  if (clone && isValidElement(children)) {
    const child = Children.only(children);
    return cloneElement(child, {
      className: cn(cellClassName, child.props.className),
    });
  }

  return (
    <div {...props} ref={forwardedRef} className={cellClassName}>
      {children}
    </div>
  );
};

const defaultProps: DefaultProps = {
  clone: false,
  square: false,
};

GridListCell.defaultProps = defaultProps;

if (process.env.NODE_ENV !== "production") {
  GridListCell.displayName = "GridListCell";

  let PropTypes;
  try {
    PropTypes = require("prop-types");
  } catch (e) {}

  if (PropTypes) {
    GridListCell.propTypes = {
      clone: PropTypes.bool,
      square: PropTypes.bool,
      className: PropTypes.string,
      children: PropTypes.node,
      forwardedRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    };
  }
}

export default forwardRef<HTMLDivElement, GridListCellProps>((props, ref) => (
  <GridListCell {...props} forwardedRef={ref} />
));
