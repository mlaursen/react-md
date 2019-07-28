import React, { FC, forwardRef, HTMLAttributes } from "react";
import cn from "classnames";
import { bem, WithForwardedRef } from "@react-md/utils";

import { HeaderContextProvider } from "./HeaderContext";
import { TableConfigProvider } from "./TableConfigContext";

export interface TableHeaderProps
  extends HTMLAttributes<HTMLTableSectionElement> {
  noWrap?: boolean;
  hoverable?: boolean;
}

type WithRef = WithForwardedRef<HTMLTableSectionElement>;
type DefaultProps = Required<Pick<TableHeaderProps, "noWrap" | "hoverable">>;
type WithDefaultProps = TableHeaderProps & DefaultProps & WithRef;

const block = bem("rmd-table-header");

const TableHeader: FC<TableHeaderProps & WithRef> = providedProps => {
  const {
    style: propStyle,
    className,
    noWrap,
    forwardedRef,
    children,
    hoverable,
    ...props
  } = providedProps as WithDefaultProps;

  return (
    <TableConfigProvider hoverable={hoverable} noWrap={noWrap}>
      <HeaderContextProvider header>
        <thead {...props} ref={forwardedRef} className={cn(block(), className)}>
          {children}
        </thead>
      </HeaderContextProvider>
    </TableConfigProvider>
  );
};

const defaultProps: DefaultProps = {
  noWrap: true,
  hoverable: false,
};

TableHeader.defaultProps = defaultProps;

export default forwardRef<HTMLTableSectionElement, TableHeaderProps>(
  (props, ref) => <TableHeader {...props} forwardedRef={ref} />
);
