import React, {
  forwardRef,
  HTMLAttributes,
  ReactElement,
  Ref,
  useMemo,
} from "react";
import { cnb } from "cnbuilder";
import { bem } from "@react-md/utils";

import { TableCellConfig, TableConfigProvider, useTableConfig } from "./config";
import { TableFooterProvider } from "./footer";
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
   * Boolean if the footer should be rendered as a sticky footer that will cover
   * the table contents as the page or `TableContainer` is scrolled.
   */
  sticky?: boolean;
}

const block = bem("rmd-foot");

/**
 * Creates a `<tfoot>` element with some basic styles. This component will
 * disable the hover effect and line wrapping by default, but the hover effect
 * and line-wrapping can be re-enabled if desired through the `hoverable` and
 * `disableNoWrap` props.
 */
function TableFooter(
  {
    className,
    hoverable = false,
    lineWrap: propLineWrap,
    children,
    sticky = false,
    ...props
  }: TableFooterProps,
  ref?: Ref<HTMLTableSectionElement>
): ReactElement {
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
      <TableFooterProvider value>
        <tfoot {...props} ref={ref} className={cnb(block(), className)}>
          <StickyTableProvider value={sticky}>{children}</StickyTableProvider>
        </tfoot>
      </TableFooterProvider>
    </TableConfigProvider>
  );
}

const ForwardedTableFooter = forwardRef<
  HTMLTableSectionElement,
  TableFooterProps
>(TableFooter);

if (process.env.NODE_ENV !== "production") {
  try {
    const PropTypes = require("prop-types");

    ForwardedTableFooter.propTypes = {
      className: PropTypes.string,
      lineWrap: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.oneOf(["padded"]),
      ]),
      hoverable: PropTypes.bool,
      sticky: PropTypes.bool,
    };
  } catch (e) {}
}

export default ForwardedTableFooter;
