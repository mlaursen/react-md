import React, { forwardRef } from "react";
import cn from "classnames";
import { bem } from "@react-md/utils";

import { Label, LabelProps } from "./Label";

export interface FloatingLabelProps extends LabelProps {
  /**
   * Boolean if the text input or textarea currently have a value.
   */
  valued: boolean;

  /**
   * Boolean if it should use the dense spec.
   */
  dense?: boolean;

  /**
   * Boolean if the label is currently floating over the text field.
   */
  floating?: boolean;
}

const block = bem("rmd-floating-label");

/**
 * This is an extension of the `Label` component that is used with text fields
 * and textareas to float above the input area.
 */
export const FloatingLabel = forwardRef<HTMLLabelElement, FloatingLabelProps>(
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
    },
    ref
  ) {
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
);

/* istanbul ignore next */
if (process.env.NODE_ENV !== "production") {
  try {
    const PropTypes = require("prop-types");

    FloatingLabel.propTypes = {
      className: PropTypes.string,
      dense: PropTypes.bool,
      floating: PropTypes.bool,
      error: PropTypes.bool,
      active: PropTypes.bool,
      disabled: PropTypes.bool,
      valued: PropTypes.bool.isRequired,
    };
  } catch (e) {}
}
