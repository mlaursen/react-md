import React, { FC, forwardRef, HTMLAttributes, useMemo } from "react";
import cn from "classnames";
import { WithForwardedRef } from "@react-md/utils";

import { TableConfigProvider, TableConfig, useTableConfig } from "./config";

export interface TableBodyProps
  extends HTMLAttributes<HTMLTableSectionElement>,
    Omit<TableConfig, "header"> {}

type WithRef = WithForwardedRef<HTMLTableSectionElement>;

/**
 * Creates a `<tbody>` element that also allows for overriding all the child
 * `TableCell` components with additional styling behavior.
 */
const TableBody: FC<TableBodyProps & WithRef> = ({
  className,
  forwardedRef,
  children,
  hAlign: propHAlign,
  vAlign: propVAlign,
  lineWrap: propLineWrap,
  disableHover: propDisableHover,
  disableBorders: propDisableBorders,
  ...props
}) => {
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
      <tbody
        {...props}
        ref={forwardedRef}
        className={cn("rmd-tbody", className)}
      >
        {children}
      </tbody>
    </TableConfigProvider>
  );
};

if (process.env.NODE_ENV !== "production") {
  TableBody.displayName = "TableBody";

  let PropTypes;
  try {
    PropTypes = require("prop-types");
  } catch (e) {}

  if (PropTypes) {
    TableBody.propTypes = {
      className: PropTypes.string,
      children: PropTypes.node,
      forwardedRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
      lineWrap: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.oneOf(["padded"]),
      ]),
      hAlign: PropTypes.oneOf(["left", "center", "right"]),
      vAlign: PropTypes.oneOf(["top", "middle", "bottom"]),
      disableHover: PropTypes.bool,
      disableBorders: PropTypes.bool,
    };
  }
}

export default forwardRef<HTMLTableSectionElement, TableBodyProps>(
  (props, ref) => <TableBody {...props} forwardedRef={ref} />
);
