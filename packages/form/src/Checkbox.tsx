import React, { FC } from "react";
import { FontIcon } from "@react-md/icon";
import InputToggle, { InputToggleProps } from "./InputToggle";

export interface CheckboxProps extends InputToggleProps {}
type DefaultProps = Required<Pick<CheckboxProps, "icon">>;

/**
 * The `Checkbox` component is just a wrapper for the `InputToggle` that
 * defaults to resonable defaults for a checkbox toggle.
 */
const Checkbox: FC<CheckboxProps> = ({ type, ...props }) => (
  <InputToggle {...props} type="checkbox" />
);

const defaultProps: DefaultProps = {
  icon: <FontIcon>check_box_outline</FontIcon>,
};

Checkbox.defaultProps = defaultProps;

export default Checkbox;
