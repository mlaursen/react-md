import React, { forwardRef, HTMLAttributes } from "react";
import cn from "classnames";
import { bem } from "@react-md/utils";

export interface TextFieldAddonProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * Boolean if the addon should be presentational only and prevent pointer
   * events.
   */
  presentational?: boolean;
}

const block = bem("rmd-text-field-addon");

/**
 * This component is used to add an an icon before or after the text field with
 * correct styling.
 */
export const TextFieldAddon = forwardRef<HTMLSpanElement, TextFieldAddonProps>(
  function TextFieldAddon(
    { children, className, presentational = true, ...props },
    ref
  ) {
    if (!children) {
      return null;
    }

    return (
      <span
        {...props}
        ref={ref}
        className={cn(block({ presentational }), className)}
      >
        {children}
      </span>
    );
  }
);

/* istanbul ignore next */
if (process.env.NODE_ENV !== "production") {
  try {
    const PropTypes = require("prop-types");

    TextFieldAddon.propTypes = {
      className: PropTypes.string,
      children: PropTypes.node,
      presentational: PropTypes.bool,
    };
  } catch (e) {}
}
