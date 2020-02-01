import React, {
  forwardRef,
  HTMLAttributes,
  ReactElement,
  Ref,
  useMemo,
} from "react";
import cn from "classnames";
import { TableConfig, TableConfigProvider, useTableConfig } from "./config";

export interface TableBodyProps
  extends HTMLAttributes<HTMLTableSectionElement>,
    Omit<TableConfig, "header"> {}

/**
 * Creates a `<tbody>` element that also allows for overriding all the child
 * `TableCell` components with additional styling behavior.
 */
function TableBody(
  {
    className,
    children,
    hAlign: propHAlign,
    vAlign: propVAlign,
    lineWrap: propLineWrap,
    disableHover: propDisableHover,
    disableBorders: propDisableBorders,
    ...props
  }: TableBodyProps,
  ref?: Ref<HTMLTableSectionElement>
): ReactElement {
  // update the table configuration with the custom overrides for the `<thead>`
  const {
    hAlign,
    vAlign,
    lineWrap,
    disableHover,
    disableBorders,
  } = useTableConfig({
    hAlign: propHAlign,
    vAlign: propVAlign,
    lineWrap: propLineWrap,
    disableHover: propDisableHover,
    disableBorders: propDisableBorders,
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
      <tbody {...props} ref={ref} className={cn("rmd-tbody", className)}>
        {children}
      </tbody>
    </TableConfigProvider>
  );
}

const ForwardedTableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>(
  TableBody
);

if (process.env.NODE_ENV !== "production") {
  try {
    const PropTypes = require("prop-types");

    ForwardedTableBody.propTypes = {
      className: PropTypes.string,
      children: PropTypes.node,
      lineWrap: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.oneOf(["padded"]),
      ]),
      hAlign: PropTypes.oneOf(["left", "center", "right"]),
      vAlign: PropTypes.oneOf(["top", "middle", "bottom"]),
      disableHover: PropTypes.bool,
      disableBorders: PropTypes.bool,
    };
  } catch (e) {}
}

export default ForwardedTableBody;
