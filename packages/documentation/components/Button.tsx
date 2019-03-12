import React, { FunctionComponent } from "react";
import {
  Button as RMDButton,
  ButtonProps as RMDButtonProps,
} from "@react-md/button";
import { Tooltipped, TooltippedProps } from "@react-md/tooltip";
import { Omit } from "@react-md/utils";

export interface ButtonProps
  extends Omit<RMDButtonProps, "id">,
    Pick<TooltippedProps, "id" | "tooltip"> {}

const Button: FunctionComponent<ButtonProps> = ({
  id,
  tooltip: propTooltip,
  onClick,
  onMouseEnter,
  onMouseLeave,
  children,
  ...props
}) => (
  <Tooltipped
    id={id}
    tooltip={propTooltip}
    onClick={onClick}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
  >
    {({ tooltip, containerProps }) => (
      <RMDButton {...props} {...containerProps}>
        {children}
        {tooltip}
      </RMDButton>
    )}
  </Tooltipped>
);

export default Button;
