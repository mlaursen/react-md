import React, { forwardRef, HTMLAttributes } from "react";
import cn from "classnames";
import { bem } from "@react-md/utils";

export type DialogTitleProps = HTMLAttributes<HTMLHeadingElement>;

const block = bem("rmd-dialog");

/**
 * This component adds some base styles to an `<h2>` element for a title within
 * a `Dialog`.
 */
export const DialogTitle = forwardRef<HTMLHeadingElement, DialogTitleProps>(
  function DialogTitle({ children, className, ...props }, ref) {
    return (
      <h2 {...props} ref={ref} className={cn(block("title"), className)}>
        {children}
      </h2>
    );
  }
);

/* istanbul ignore next */
if (process.env.NODE_ENV !== "production") {
  try {
    const PropTypes = require("prop-types");

    DialogTitle.propTypes = {
      className: PropTypes.string,
      children: PropTypes.node,
    };
  } catch (e) {}
}
