import React, { FC } from "react";
import { Radio as RadioMD, RadioProps } from "@react-md/form";
import { RadioButtonCheckedSVGIcon } from "@react-md/material-icons";

const Radio: FC<RadioProps> = props => <RadioMD {...props} />;

Radio.defaultProps = {
  icon: <RadioButtonCheckedSVGIcon />,
};

export default Radio;
