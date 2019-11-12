import React, { FC, ReactNode } from "react";
import { Button as RMDButton, ButtonProps } from "@react-md/button";
import { Tooltipped } from "@react-md/tooltip";

interface Props extends ButtonProps {
  id: string;
  tooltip?: ReactNode;
}

const Button: FC<Props> = ({
  id,
  tooltip,
  onMouseEnter,
  onMouseLeave,
  onTouchStart,
  onTouchMove,
  onFocus,
  onKeyDown,
  children,
  ...props
}) => (
  <Tooltipped
    id={id}
    tooltip={tooltip}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    onTouchStart={onTouchStart}
    onTouchMove={onTouchMove}
    onFocus={onFocus}
    onKeyDown={onKeyDown}
  >
    <RMDButton {...props}>{children}</RMDButton>
  </Tooltipped>
);

export default Button;
