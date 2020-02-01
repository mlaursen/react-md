import React, { forwardRef, ReactElement, Ref } from "react";
import cn from "classnames";
import { bem } from "@react-md/utils";

import Label, { LabelProps } from "./Label";

export interface FloatingLabelProps extends LabelProps {
  /**
   * Boolean if the text input or textarea currently have a value.
   */
  valued: boolean;

  dense?: boolean;
  floating?: boolean;
}

const block = bem("rmd-floating-label");

/**
 * This is an extension of the `Label` component that is used with text fields
 * and textareas to float above the input area.
 *
 * @private
 */
function FloatingLabel(
  {
    className,
    dense,
    valued,
    floating,
    error = false,
    active = false,
    disabled = false,
    ...props
  }: FloatingLabelProps,
  ref?: Ref<HTMLLabelElement>
): ReactElement {
  return (
    <Label
      {...props}
      ref={ref}
      className={cn(
        block({
          dense,
          active: floating,
          inactive: valued && !active && !error && !disabled,
        }),
        className
      )}
      error={error}
      active={active}
      disabled={disabled}
    />
  );
}

const ForwardedFloatingLabel = forwardRef<HTMLLabelElement, FloatingLabelProps>(
  FloatingLabel
);

if (process.env.NODE_ENV !== "production") {
  try {
    const PropTypes = require("prop-types");

    ForwardedFloatingLabel.propTypes = {
      error: PropTypes.bool,
      active: PropTypes.bool,
      disabled: PropTypes.bool,
      valued: PropTypes.bool.isRequired,
    };
  } catch (e) {}
}

export default ForwardedFloatingLabel;
