import React, {
  FC,
  ThHTMLAttributes,
  forwardRef,
  TdHTMLAttributes,
} from "react";
import cn from "classnames";
import { bem } from "@react-md/theme";
import { WithForwardedRef } from "@react-md/utils";
import { useTableConfigContext } from "./TableConfigContext";
import { useHeaderContext } from "./HeaderContext";

type Attributes =
  | TdHTMLAttributes<HTMLTableDataCellElement>
  | ThHTMLAttributes<HTMLTableHeaderCellElement>;

export interface TableCellProps {
  align?: "left" | "center" | "right";
  grow?: boolean;
  noWrap?: boolean;
  header?: boolean;
  borderRight?: boolean;
  extraPadding?: boolean;
}

type TableCellElement = HTMLTableDataCellElement | HTMLTableHeaderCellElement;
type WithRef = WithForwardedRef<TableCellElement>;
type DefaultProps = Required<
  Pick<TableCellProps, "grow" | "align" | "borderRight">
>;

type AllTableCellProps = TableCellProps & Attributes;
type WithDefaultProps = AllTableCellProps & DefaultProps & WithRef;

const block = bem("rmd-table-cell");

const TableCell: FC<AllTableCellProps & WithRef> = providedProps => {
  const {
    className,
    grow,
    align,
    header: propHeader,
    noWrap: propNoWrap,
    borderRight,
    forwardedRef,
    children,
    extraPadding,
    ...props
  } = providedProps as WithDefaultProps;

  const header = useHeaderContext(propHeader);
  const Component = header ? "th" : "td";
  const { noWrap } = useTableConfigContext({ propNoWrap });
  return (
    <Component
      {...props}
      ref={forwardedRef}
      className={cn(
        block({
          grow,
          header,
          [align]: true,
          "border-right": borderRight,
          "no-wrap": noWrap,
          "padding-extra": extraPadding,
        }),
        className
      )}
    >
      {children}
    </Component>
  );
};

const defaultProps: DefaultProps = {
  grow: false,
  align: "left",
  borderRight: false,
};

TableCell.defaultProps = defaultProps;

export default forwardRef<TableCellElement, AllTableCellProps>((props, ref) => (
  <TableCell {...props} forwardedRef={ref} />
));
