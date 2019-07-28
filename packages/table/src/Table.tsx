import React, { FC, forwardRef, TableHTMLAttributes } from "react";
import cn from "classnames";
import { bem, WithForwardedRef } from "@react-md/utils";

import { TableConfig, TableConfigProvider } from "./TableConfigContext";

export interface TableProps
  extends TableHTMLAttributes<HTMLTableElement>,
    TableConfig {
  fixed?: boolean;
  dense?: boolean;
  fullWidth?: boolean;
}

type WithRef = WithForwardedRef<HTMLTableElement>;
type DefaultProps = Required<TableConfig> &
  Required<Pick<TableProps, "dense" | "fullWidth">>;
type WithDefaultProps = TableProps & DefaultProps & WithRef;

const block = bem("rmd-table");

const Table: FC<TableProps & WithRef> = providedProps => {
  const {
    className,
    forwardedRef,
    children,
    fixed,
    dense,
    noWrap,
    bordered,
    hoverable,
    fullWidth,
    extraPadding,
    ...props
  } = providedProps as WithDefaultProps;

  return (
    <TableConfigProvider
      noWrap={noWrap}
      bordered={bordered}
      hoverable={hoverable}
      extraPadding={extraPadding}
    >
      <table
        {...props}
        ref={forwardedRef}
        className={cn(
          block({
            dense,
            fixed,
            "full-width": fullWidth,
          }),
          className
        )}
      >
        {children}
      </table>
    </TableConfigProvider>
  );
};

const defaultProps: DefaultProps = {
  dense: false,
  noWrap: true,
  bordered: true,
  hoverable: true,
  fullWidth: false,
  extraPadding: true,
};

Table.defaultProps = defaultProps;

if (process.env.NODE_ENV !== "production") {
  Table.displayName = "Table";
}

export default forwardRef<HTMLTableElement, TableProps>((props, ref) => (
  <Table {...props} forwardedRef={ref} />
));
