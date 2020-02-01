import React, { forwardRef, HTMLAttributes, ReactElement, Ref } from "react";
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
function TextFieldAddon(
  { children, className, presentational = true, ...props }: TextFieldAddonProps,
  ref?: Ref<HTMLSpanElement>
): ReactElement | null {
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

const ForwardedTextFieldAddon = forwardRef<
  HTMLSpanElement,
  TextFieldAddonProps
>(TextFieldAddon);

if (process.env.NODE_ENV !== "production") {
  try {
    const PropTypes = require("prop-types");

    ForwardedTextFieldAddon.propTypes = {
      className: PropTypes.string,
      children: PropTypes.node,
      presentational: PropTypes.bool,
    };
  } catch (e) {}
}

export default ForwardedTextFieldAddon;
