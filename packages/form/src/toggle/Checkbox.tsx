import React, { forwardRef } from "react";
import { useIcon } from "@react-md/icon";

import { InputToggle, InputToggleProps } from "./InputToggle";

/** @remarks \@since 2.8.5 */
export interface IndeterminateCheckboxProps {
  /**
   * If the indeterminate prop is enabled, the this prop must be a
   * space-delimited string of **all** the checkboxes that it controls.
   */
  "aria-controls"?: string;

  /**
   * Boolean if the checkbox can have an indeterminate state. This is used when
   * there is a checkbox group where a single checkbox and select/deselect all
   * related checkboxes. This should be enabled when not all the related
   * checkboxes have been checked.
   */
  indeterminate?: boolean;
}

export interface CheckboxProps
  extends InputToggleProps,
    IndeterminateCheckboxProps {}

/**
 * The `Checkbox` component is just a wrapper for the `InputToggle` that
 * defaults to reasonable defaults for a checkbox input.
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox({ icon: propIcon, indeterminate = false, ...props }, ref) {
    const icon = useIcon("checkbox", propIcon);

    return (
      <InputToggle
        {...props}
        icon={icon}
        ref={ref}
        type="checkbox"
        indeterminate={indeterminate}
      />
    );
  }
);

/* istanbul ignore next */
if (process.env.NODE_ENV !== "production") {
  try {
    const PropTypes = require("prop-types");

    Checkbox.propTypes = {
      indeterminate: PropTypes.bool,
      icon: PropTypes.node,
    };
  } catch (e) {}
}
