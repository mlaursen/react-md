import React, {
  CSSProperties,
  FC,
  forwardRef,
  HTMLAttributes,
  Ref,
  TableHTMLAttributes,
  useMemo,
} from "react";
import cn from "classnames";
import { bem, WithForwardedRef } from "@react-md/utils";

import { Provider, TableConfig, TableConfigContext } from "./config";

/**
 * All the available props for the `Table` component. This allows you to apply
 * the general table configuration for convenience.
 */
export interface TableProps
  extends HTMLAttributes<HTMLDivElement>,
    TableConfig {
  /**
   * An optional ref to apply to the `<table>` element. The default `ref` is
   * actually passed to the container `<div>` element.
   */
  tableRef?: Ref<HTMLTableElement>;

  /**
   * An optional style to apply to the `<table>` element. The default `style`
   * prop is actually passed to the container `<div>` element.
   */
  tableStyle?: CSSProperties;

  /**
   * An optional className to apply to the `<table>` element. The default
   * `className` prop is actually passed to the container `<div>` element.
   */
  tableClassName?: string;

  /**
   * Any additional props to provide to the `<table>` element since the props
   * are all passed to the container `<div>` element.
   *
   * Note: The `tableRef`, `tableStyle`, and `tableClassName` props will
   * override the `ref`, `style`, and `tableClassName` props in this object so
   * you should use those props instead of providing them here.
   */
  tableProps?: TableHTMLAttributes<HTMLTableElement>;

  /**
   * Boolean if the table should use the dense spec to reduce the height of each
   * cell.
   */
  dense?: boolean;

  /**
   * Boolean if the `<table>` element should span the entire width of the
   * container `<div>` element instead of having its width be determined by the
   * table's contents.
   *
   * Note: There will always be horizontal overflow if the table is too wide.
   */
  fullWidth?: boolean;
}

type WithRef = WithForwardedRef<HTMLDivElement>;
type DefaultProps = Omit<TableConfigContext, "header"> &
  Required<Pick<TableProps, "dense" | "fullWidth">>;
type WithDefaultProps = TableProps & DefaultProps & WithRef;

const block = bem("rmd-table");

/**
 * This component is a very low-level component that adds some default styles,
 * configuration, and scroll functionality for a `<table>` element. To enable
 * responsive behavior and scroll functionality, the `<table>` element will be
 * wrapped in a `<div>` which means all the props provided to this component
 * will be applied to the `<div>` instead of the `<table>`. There are some
 * top-level props for styling the table and applying a ref, but you can also
 * use the `tableProps` prop to provide anything else that might be required for
 * your `<table>`.
 */
const Table: FC<TableProps & WithRef> = providedProps => {
  const {
    className,
    tableRef,
    tableStyle,
    tableClassName,
    tableProps,
    forwardedRef,
    dense,
    fullWidth,
    hAlign,
    vAlign,
    lineWrap,
    disableHover,
    disableBorders,
    children,
    ...props
  } = providedProps as WithDefaultProps;

  const configuration = useMemo(
    () => ({
      header: false,
      hAlign,
      vAlign,
      lineWrap,
      disableHover,
      disableBorders,
    }),
    [hAlign, vAlign, lineWrap, disableHover, disableBorders]
  );

  return (
    <Provider value={configuration}>
      <div
        {...props}
        ref={forwardedRef}
        className={cn("rmd-table-container", className)}
      >
        <table
          {...tableProps}
          ref={tableRef}
          style={tableStyle}
          className={cn(
            block({
              dense,
              "full-width": fullWidth,
            }),
            tableClassName
          )}
        >
          {children}
        </table>
      </div>
    </Provider>
  );
};

const defaultProps: DefaultProps = {
  dense: false,
  hAlign: "left",
  vAlign: "middle",
  lineWrap: false,
  fullWidth: false,
  disableHover: false,
  disableBorders: false,
};

Table.defaultProps = defaultProps;

if (process.env.NODE_ENV !== "production") {
  Table.displayName = "Table";

  let PropTypes;
  try {
    PropTypes = require("prop-types");
  } catch (e) {}

  if (PropTypes) {
    Table.propTypes = {
      className: PropTypes.string,
      dense: PropTypes.bool,
      fullWidth: PropTypes.bool,
      disableHover: PropTypes.bool,
      disableBorders: PropTypes.bool,
      hAlign: PropTypes.oneOf(["left", "center", "right"]),
      vAlign: PropTypes.oneOf(["top", "middle", "bottom"]),
      lineWrap: PropTypes.bool,
      tableRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
      tableStyle: PropTypes.object,
      tableClassName: PropTypes.string,
    };
  }
}

export default forwardRef<HTMLDivElement, TableProps>((props, ref) => (
  <Table {...props} forwardedRef={ref} />
));
