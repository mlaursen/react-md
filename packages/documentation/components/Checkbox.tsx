import React, { FC } from "react";
import { Checkbox as CheckboxMD, CheckboxProps } from "@react-md/form";
import { CheckBoxSVGIcon } from "@react-md/material-icons";

const Checkbox: FC<CheckboxProps> = props => <CheckboxMD {...props} />;

Checkbox.defaultProps = {
  icon: <CheckBoxSVGIcon />,
};

export default Checkbox;
