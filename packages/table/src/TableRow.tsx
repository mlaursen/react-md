import React, { forwardRef, HTMLAttributes } from "react";
import cn from "classnames";
import { bem } from "@react-md/utils";

import { TableRowConfiguration, useTableConfig } from "./config";

export interface TableRowProps
  extends HTMLAttributes<HTMLTableRowElement>,
    TableRowConfiguration {
  /**
   * Boolean if the current row has been selected and should apply the selected
   * background-color.
   */
  selected?: boolean;

  /**
   * Boolean if the row should be clickable and update the cursor while hovered
   * to be a pointer.
   */
  clickable?: boolean;
}

const block = bem("rmd-tr");

/**
 * Creates a `<tr>` element with some general styles that are inherited from the
 * base table configuration.
 */
export const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(
  function TableRow(
    {
      className,
      disableHover: propDisableHover,
      disableBorders: propDisableBorders,
      children,
      selected = false,
      clickable = false,
      ...props
    },
    ref
  ) {
    const { disableHover, disableBorders } = useTableConfig({
      disableHover: propDisableHover,
      disableBorders: propDisableBorders,
    });

    return (
      <tr
        {...props}
        ref={ref}
        className={cn(
          block({
            bordered: !disableBorders,
            hoverable: !disableHover,
            clickable,
            selected,
            "selected-hoverable": selected && !disableHover,
          }),
          className
        )}
      >
        {children}
      </tr>
    );
  }
);

/* istanbul ignore next */
if (process.env.NODE_ENV !== "production") {
  try {
    const PropTypes = require("prop-types");

    TableRow.propTypes = {
      className: PropTypes.string,
      children: PropTypes.node,
      disableHover: PropTypes.bool,
      disableBorders: PropTypes.bool,
      selected: PropTypes.bool,
      clickable: PropTypes.bool,
    };
  } catch (e) {}
}
