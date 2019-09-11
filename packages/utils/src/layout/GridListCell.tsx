import React, { FC, forwardRef, HTMLAttributes } from "react";
import cn from "classnames";

import bem from "../css/bem";
import { WithForwardedRef } from "../types";

export interface GridListCellProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Boolean if the cell should be square by also setting the current cell size
   * to the `height`.
   */
  square?: boolean;
}

type WithRef = WithForwardedRef<HTMLDivElement>;
type DefaultProps = Required<Pick<GridListCellProps, "square">>;
type WithDefaultProps = GridListCellProps & DefaultProps & WithRef;

const block = bem("rmd-grid-list");

const GridListCell: FC<GridListCellProps & WithRef> = providedProps => {
  const {
    className,
    forwardedRef,
    children,
    square,
    ...props
  } = providedProps as WithDefaultProps;

  return (
    <div
      {...props}
      ref={forwardedRef}
      className={cn(block("cell", { square }), className)}
    >
      {children}
    </div>
  );
};

const defaultProps: DefaultProps = {
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
