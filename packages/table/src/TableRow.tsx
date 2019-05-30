import React, { FC, ThHTMLAttributes, forwardRef } from "react";
import cn from "classnames";
import { bem } from "@react-md/theme";
import { WithForwardedRef } from "@react-md/utils";

import { useTableConfigContext } from "./TableConfigContext";

export interface TableRowProps extends ThHTMLAttributes<HTMLTableRowElement> {
  bordered?: boolean;
  hoverable?: boolean;
}

type WithRef = WithForwardedRef<HTMLTableRowElement>;

const block = bem("rmd-table-row");

const TableRow: FC<TableRowProps & WithRef> = providedProps => {
  const {
    className,
    bordered: propBordered,
    hoverable: propHoverable,
    forwardedRef,
    children,
    ...props
  } = providedProps;

  const { bordered, hoverable } = useTableConfigContext({
    propBordered,
    propHoverable,
  });

  return (
    <tr
      {...props}
      ref={forwardedRef}
      className={cn(block({ bordered, hoverable }), className)}
    >
      {children}
    </tr>
  );
};

export default forwardRef<HTMLTableRowElement, TableRowProps>((props, ref) => (
  <TableRow {...props} forwardedRef={ref} />
));
