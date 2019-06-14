import React, { FC } from "react";
import { FontIcon } from "@react-md/icon";
import InputToggle, { InputToggleProps } from "./InputToggle";

export interface RadioProps extends InputToggleProps {}
type DefaultProps = Required<Pick<RadioProps, "icon">>;

const Radio: FC<RadioProps> = ({ type, ...props }) => (
  <InputToggle {...props} type="radio" />
);

const defaultProps: DefaultProps = {
  icon: <FontIcon>radio_button_checked</FontIcon>,
};

Radio.defaultProps = defaultProps;

export default Radio;
