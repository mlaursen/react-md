import React, { forwardRef, HTMLAttributes } from "react";
import cn from "classnames";

export type CaptionProps = HTMLAttributes<HTMLTableCaptionElement>;

/**
 * This component is really just a simple wrapper for applying the `<caption>`
 * typography styles and probably doesn't have much real use if you don't use
 * captions.
 */
export const Caption = forwardRef<HTMLTableCaptionElement, CaptionProps>(
  function Caption({ className, children, ...props }, ref) {
    return (
      <caption {...props} ref={ref} className={cn("rmd-caption", className)}>
        {children}
      </caption>
    );
  }
);

/* istanbul ignore next */
if (process.env.NODE_ENV !== "production") {
  try {
    const PropTypes = require("prop-types");

    Caption.propTypes = {
      className: PropTypes.string,
      children: PropTypes.node,
    };
  } catch (e) {}
}
