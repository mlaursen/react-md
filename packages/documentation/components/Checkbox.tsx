import React, { FC, forwardRef } from "react";
import { Checkbox as CheckboxMD, CheckboxProps } from "@react-md/form";
import { CheckBoxSVGIcon } from "@react-md/material-icons";
import { WithForwardedRef } from "@react-md/utils";

const Checkbox: FC<CheckboxProps & WithForwardedRef<HTMLInputElement>> = ({
  forwardedRef,
  ...props
}) => <CheckboxMD {...props} ref={forwardedRef} />;

Checkbox.defaultProps = {
  icon: <CheckBoxSVGIcon />,
};

export default forwardRef<HTMLInputElement, CheckboxProps>((props, ref) => (
  <Checkbox {...props} forwardedRef={ref} />
));
