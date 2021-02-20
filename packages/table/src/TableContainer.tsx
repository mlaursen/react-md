import React, { forwardRef, HTMLAttributes } from "react";
import cn from "classnames";

export type TableContainerProps = HTMLAttributes<HTMLDivElement>;

/**
 * An extremely "useful" component that should be used with the `Table`
 * component if you want to make a responsive table within the page. If you
 * don't want to use this component, you can just apply `overflow: auto` to a
 * parent element of the table.
 */
export const TableContainer = forwardRef<HTMLDivElement, TableContainerProps>(
  function TableContainer({ className, children, ...props }, ref) {
    return (
      <div
        {...props}
        ref={ref}
        className={cn("rmd-table-container", className)}
      >
        {children}
      </div>
    );
  }
);

/* istanbul ignore next */
if (process.env.NODE_ENV !== "production") {
  try {
    const PropTypes = require("prop-types");

    TableContainer.propTypes = {
      className: PropTypes.string,
      children: PropTypes.node,
    };
  } catch (e) {}
}
