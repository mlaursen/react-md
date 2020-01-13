import React, { FC, forwardRef, HTMLAttributes } from "react";
import cn from "classnames";
import { WithForwardedRef, bem } from "@react-md/utils";

import { TableRowConfig, useTableConfig } from "./config";

export interface TableRowProps
  extends HTMLAttributes<HTMLTableRowElement>,
    TableRowConfig {}

type WithRef = WithForwardedRef<HTMLTableRowElement>;

const block = bem("rmd-tr");

/**
 * Creates a `<tr>` element with some general styles that are inherited from the
 * base table configuration.
 */
const TableRow: FC<TableRowProps & WithRef> = ({
  className,
  forwardedRef,
  disableHover: propDisableHover,
  disableBorders: propDisableBorders,
  children,
  ...props
}) => {
  const { disableHover, disableBorders } = useTableConfig({
    disableHover: propDisableHover,
    disableBorders: propDisableBorders,
  });

  return (
    <tr
      {...props}
      ref={forwardedRef}
      className={cn(
        block({
          bordered: !disableBorders,
          hoverable: !disableHover,
        }),
        className
      )}
    >
      {children}
    </tr>
  );
};

if (process.env.NODE_ENV !== "production") {
  TableRow.displayName = "TableRow";

  let PropTypes;
  try {
    PropTypes = require("prop-types");
  } catch (e) {}

  if (PropTypes) {
    TableRow.propTypes = {
      className: PropTypes.string,
      children: PropTypes.node,
      forwardedRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
      disableHover: PropTypes.bool,
      disableBorders: PropTypes.bool,
    };
  }
}

export default forwardRef<HTMLTableRowElement, TableRowProps>((props, ref) => (
  <TableRow {...props} forwardedRef={ref} />
));
