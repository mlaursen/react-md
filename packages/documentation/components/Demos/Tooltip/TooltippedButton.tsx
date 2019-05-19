import React, { FunctionComponent } from "react";
import { ButtonProps, Button } from "@react-md/button";
import { Tooltipped, TooltippedProps } from "@react-md/tooltip";

interface TooltippedButtonProps
  extends ButtonProps,
    Pick<TooltippedProps, "tooltip" | "defaultPosition" | "dense"> {
  id: string;
}

const TooltippedButton: FunctionComponent<TooltippedButtonProps> = ({
  id,
  tooltip,
  onMouseEnter,
  onMouseLeave,
  onTouchStart,
  onTouchMove,
  onFocus,
  onKeyDown,
  children,
  dense,
  defaultPosition,
  ...props
}) => (
  <Tooltipped
    id={id}
    tooltip={tooltip}
    dense={dense}
    defaultPosition={defaultPosition}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    onTouchStart={onTouchStart}
    onTouchMove={onTouchMove}
    onFocus={onFocus}
    onKeyDown={onKeyDown}
  >
    <Button {...props}>{children}</Button>
  </Tooltipped>
);

TooltippedButton.defaultProps = {
  themeType: "outline",
};

export default TooltippedButton;
