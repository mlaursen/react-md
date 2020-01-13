import React, { FC, forwardRef, HTMLAttributes, useMemo } from "react";
import cn from "classnames";
import { bem, WithForwardedRef } from "@react-md/utils";

import { TableConfigProvider, useTableConfig, TableCellConfig } from "./config";
import { StickyTableProvider } from "./sticky";

export interface TableFooterProps
  extends HTMLAttributes<HTMLTableSectionElement>,
    Pick<TableCellConfig, "lineWrap"> {
  /**
   * This is a rename of the `disableHover` of the `TableConfig` since table
   * footers are not hoverable by default. This prop can be enabled to add the
   * row hover color within table footers, but it is not really recommended.
   */
  hoverable?: boolean;

  /**
   * Boolean if the footer should be rendered as a sticky footer that will
   * cover the table contents as the page or `TableContainer` is scrolled.
   */
  sticky?: boolean;
}

type WithRef = WithForwardedRef<HTMLTableSectionElement>;
type DefaultProps = Required<Pick<TableFooterProps, "hoverable" | "sticky">>;
type WithDefaultProps = TableFooterProps & DefaultProps & WithRef;

const block = bem("rmd-foot");

/**
 * Creates a `<tfoot>` element with some basic styles. This component will
 * disable the hover effect and line wrapping by default, but the hover effect
 * and line-wrapping can be re-enabled if desired through the `hoverable` and
 * `disableNoWrap` props.
 */
const TableFooter: FC<TableFooterProps & WithRef> = providedProps => {
  const {
    className,
    forwardedRef,
    hoverable,
    lineWrap: propLineWrap,
    children,
    sticky,
    ...props
  } = providedProps as WithDefaultProps;

  // update the table configuration with the custom overrides for the `<tfoot>`
  const {
    hAlign,
    vAlign,
    lineWrap,
    disableHover,
    disableBorders,
  } = useTableConfig({
    lineWrap: propLineWrap,
    disableHover: !hoverable,
  });

  const configuration = useMemo(
    () => ({
      header: false,
      hAlign,
      vAlign,
      lineWrap,
      disableBorders,
      disableHover,
    }),
    [hAlign, vAlign, lineWrap, disableBorders, disableHover]
  );

  return (
    <TableConfigProvider value={configuration}>
      <tfoot {...props} ref={forwardedRef} className={cn(block(), className)}>
        <StickyTableProvider value={sticky}>{children}</StickyTableProvider>
      </tfoot>
    </TableConfigProvider>
  );
};

const defaultProps: DefaultProps = {
  hoverable: false,
  sticky: false,
};

TableFooter.defaultProps = defaultProps;

if (process.env.NODE_ENV !== "production") {
  TableFooter.displayName = "TableFooter";

  let PropTypes;
  try {
    PropTypes = require("prop-types");
  } catch (e) {}

  if (PropTypes) {
    TableFooter.propTypes = {
      className: PropTypes.string,
      lineWrap: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.oneOf(["padded"]),
      ]),
      hoverable: PropTypes.bool,
      sticky: PropTypes.bool,
    };
  }
}

export default forwardRef<HTMLTableSectionElement, TableFooterProps>(
  (props, ref) => <TableFooter {...props} forwardedRef={ref} />
);
