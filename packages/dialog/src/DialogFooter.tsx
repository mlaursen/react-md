import React, { forwardRef, HTMLAttributes } from "react";
import cn from "classnames";
import { bem } from "@react-md/utils";

export interface DialogFooterProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * An optional alignment for the content within the footer. Since the majority
   * of dialog footers are used to contain action buttons, the default alignment
   * is near the end.
   */
  align?:
    | "none"
    | "start"
    | "end"
    | "between"
    | "stacked-start"
    | "stacked-end";
}

const block = bem("rmd-dialog");

export const DialogFooter = forwardRef<HTMLDivElement, DialogFooterProps>(
  function DialogFooter({ children, className, align = "end", ...props }, ref) {
    return (
      <footer
        {...props}
        ref={ref}
        className={cn(
          block("footer", {
            flex: align !== "none",
            [align]: align !== "none",
          }),
          className
        )}
      >
        {children}
      </footer>
    );
  }
);

/* istanbul ignore next */
if (process.env.NODE_ENV !== "production") {
  try {
    const PropTypes = require("prop-types");

    DialogFooter.propTypes = {
      className: PropTypes.string,
      children: PropTypes.node,
      align: PropTypes.oneOf([
        "none",
        "start",
        "end",
        "between",
        "stacked-start",
        "stacked-end",
      ]),
    };
  } catch (e) {}
}
