import React, { FC, HTMLAttributes, forwardRef } from "react";
import cn from "classnames";
import { bem, WithForwardedRef } from "@react-md/utils";

export interface TableBodyProps
  extends HTMLAttributes<HTMLTableSectionElement> {
  fixed?: boolean;
}

type WithRef = WithForwardedRef<HTMLTableSectionElement>;
type DefaultProps = Required<Pick<TableBodyProps, "fixed">>;
type WithDefaultProps = TableBodyProps & DefaultProps & WithRef;

const block = bem("rmd-table-body");

const TableBody: FC<TableBodyProps & WithRef> = providedProps => {
  const {
    className,
    fixed,
    forwardedRef,
    children,
    ...props
  } = providedProps as WithDefaultProps;
  return (
    <tbody
      {...props}
      ref={forwardedRef}
      className={cn(block({ fixed }), className)}
    >
      {children}
    </tbody>
  );
};

const defaultProps: DefaultProps = {
  fixed: false,
};

TableBody.defaultProps = defaultProps;

export default forwardRef<HTMLTableSectionElement, TableBodyProps>(
  (props, ref) => <TableBody {...props} forwardedRef={ref} />
);
