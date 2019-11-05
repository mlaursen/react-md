import React, { FC } from "react";
import { Select as RMDSelect, SelectProps } from "@react-md/form";
import { ArrowDropDownSVGIcon } from "@react-md/material-icons";

const Select: FC<SelectProps> = props => <RMDSelect {...props} />;

Select.defaultProps = {
  rightChildren: <ArrowDropDownSVGIcon />,
};

export default Select;
