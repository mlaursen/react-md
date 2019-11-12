import React, { FC, forwardRef } from "react";
import { FontIcon } from "@react-md/icon";
import { WithForwardedRef } from "@react-md/utils";

import InputToggle, { InputToggleProps } from "./InputToggle";

export interface CheckboxProps extends InputToggleProps {
  /**
   * If the indeterminate prop is enabled, the this prop must be a space-delimited
   * string of **all** the checkboxes that it controls.
   */
  "aria-controls"?: string;

  /**
   * Boolean if the checkbox can have an indeterminate state. This is used when
   * there is a checkbox group where a single checkbox and select/deselect all
   * related checkboxes. This should be enabled when not all the related checkboxes
   * have been checked.
   */
  indeterminate?: boolean;
}

/**
 * The `Checkbox` component is just a wrapper for the `InputToggle` that
 * defaults to reasonable defaults for a checkbox input.
 */
const Checkbox: FC<CheckboxProps & WithForwardedRef<HTMLInputElement>> = ({
  forwardedRef,
  ...props
}) => <InputToggle {...props} ref={forwardedRef} type="checkbox" />;

Checkbox.defaultProps = {
  indeterminate: false,
  icon: <FontIcon>check_box</FontIcon>,
};

if (process.env.NODE_ENV !== "production") {
  Checkbox.displayName = "Checkbox";

  let PropTypes;
  try {
    PropTypes = require("prop-types");
  } catch (e) {}

  if (PropTypes) {
    Checkbox.propTypes = {
      indeterminate: PropTypes.bool,
      icon: PropTypes.node,
      forwardedRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    };
  }
}

export default forwardRef<HTMLInputElement, CheckboxProps>((props, ref) => (
  <Checkbox {...props} forwardedRef={ref} />
));
