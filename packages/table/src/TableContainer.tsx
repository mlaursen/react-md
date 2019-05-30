import React, { FC, HTMLAttributes, forwardRef } from "react";
import cn from "classnames";
import { WithForwardedRef } from "@react-md/utils";
import { bem } from "@react-md/theme";
// import { FixedContextProvider } from "./FixedContext";

export interface TableContainerProps extends HTMLAttributes<HTMLDivElement> {
  // fixedHeader?: boolean;
  // fixedFooter?: boolean;
}

type WithRef = WithForwardedRef<HTMLDivElement>;
// type DefaultProps = Required<
//   Pick<TableContainerProps, "fixedHeader" | "fixedFooter">
// >;
type WithDefaultProps = TableContainerProps & WithRef;
// type WithDefaultProps = TableContainerProps & DefaultProps & WithRef;

const block = bem("rmd-table-container");

const TableContainer: FC<TableContainerProps & WithRef> = providedProps => {
  const {
    className,
    forwardedRef,
    children,
    // fixedHeader,
    // fixedFooter,
    // role: propRole,
    ...props
  } = providedProps as WithDefaultProps;

  // let role = propRole;

  return (
    <div {...props} className={cn(block(), className)} ref={forwardedRef}>
      {children}
    </div>
  );
};

// const defaultProps: DefaultProps = {
//   fixedHeader: false,
//   fixedFooter: false,
// };

// TableContainer.defaultProps = defaultProps;

export default forwardRef<HTMLDivElement, TableContainerProps>((props, ref) => (
  <TableContainer {...props} forwardedRef={ref} />
));
