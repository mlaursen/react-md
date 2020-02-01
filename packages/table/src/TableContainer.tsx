import React, { forwardRef, HTMLAttributes, ReactElement, Ref } from "react";
import cn from "classnames";

export type TableContainerProps = HTMLAttributes<HTMLDivElement>;

/**
 * An extremely "useful" component that should be used with the `Table`
 * component if you want to make a responsive table within the page. If you
 * don't want to use this component, you can just apply `overflow: auto` to a
 * parent element of the table.
 */
function TableContainer(
  { className, children, ...props }: TableContainerProps,
  ref?: Ref<HTMLDivElement>
): ReactElement {
  return (
    <div {...props} ref={ref} className={cn("rmd-table-container", className)}>
      {children}
    </div>
  );
}

const ForwardedTableContainer = forwardRef<HTMLDivElement, TableContainerProps>(
  TableContainer
);

if (process.env.NODE_ENV !== "production") {
  try {
    const PropTypes = require("prop-types");

    ForwardedTableContainer.propTypes = {
      className: PropTypes.string,
      children: PropTypes.node,
    };
  } catch (e) {}
}

export default ForwardedTableContainer;
