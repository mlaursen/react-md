import React, { FC, forwardRef } from "react";
import { FontIcon } from "@react-md/icon";
import { WithForwardedRef } from "@react-md/utils";

import InputToggle, { InputToggleProps } from "./InputToggle";

export type CheckboxProps = InputToggleProps;

/**
 * The `Checkbox` component is just a wrapper for the `InputToggle` that
 * defaults to reasonable defaults for a checkbox input.
 */
const Checkbox: FC<CheckboxProps & WithForwardedRef<HTMLInputElement>> = ({
  forwardedRef,
  ...props
}) => <InputToggle {...props} ref={forwardedRef} type="checkbox" />;

Checkbox.defaultProps = {
  icon: <FontIcon>check_box_outline</FontIcon>,
};

if (process.env.NODE_ENV !== "production") {
  Checkbox.displayName = "Checkbox";
}

export default forwardRef<HTMLInputElement, CheckboxProps>((props, ref) => (
  <Checkbox {...props} forwardedRef={ref} />
));
