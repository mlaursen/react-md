import React, { FC, forwardRef } from "react";
import { Radio as RadioMD, RadioProps } from "@react-md/form";
import { RadioButtonCheckedSVGIcon } from "@react-md/material-icons";
import { WithForwardedRef } from "@react-md/utils";

const Radio: FC<RadioProps & WithForwardedRef<HTMLInputElement>> = ({
  forwardedRef,
  ...props
}) => <RadioMD {...props} ref={forwardedRef} />;

Radio.defaultProps = {
  icon: <RadioButtonCheckedSVGIcon />,
};

export default forwardRef<HTMLInputElement, RadioProps>((props, ref) => (
  <Radio {...props} forwardedRef={ref} />
));
