import React, { FC, forwardRef, HTMLAttributes } from "react";
import cn from "classnames";
import { WithForwardedRef } from "@react-md/utils";

export type TableContainerProps = HTMLAttributes<HTMLDivElement>;

type WithRef = WithForwardedRef<HTMLDivElement>;

/**
 * An extremely "useful" component that should be used with the
 * `Table` component if you want to make a responsive table within
 * the page. If you don't want to use this component, you can just
 * apply `overflow: auto` to a parent element of the table.
 */
const TableContainer: FC<TableContainerProps & WithRef> = ({
  className,
  forwardedRef,
  children,
  ...props
}) => (
  <div
    {...props}
    ref={forwardedRef}
    className={cn("rmd-table-container", className)}
  >
    {children}
  </div>
);

if (process.env.NODE_ENV !== "production") {
  TableContainer.displayName = "TableContainer";

  let PropTypes;
  try {
    PropTypes = require("prop-types");
  } catch (e) {}
  if (PropTypes) {
    TableContainer.propTypes = {
      className: PropTypes.string,
      forwardedRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
      children: PropTypes.node,
    };
  }
}

export default forwardRef<HTMLTableElement, TableContainerProps>(
  (props, ref) => <TableContainer {...props} forwardedRef={ref} />
);
