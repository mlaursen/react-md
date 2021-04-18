import React, { ReactElement, ReactNode } from "react";
import { Button as RMDButton, ButtonProps } from "@react-md/button";
import { Tooltipped } from "@react-md/tooltip";

interface Props extends ButtonProps {
  id: string;
  tooltip?: ReactNode;
}

export default function Button({
  id,
  tooltip,
  onMouseEnter,
  onMouseLeave,
  onTouchStart,
  onFocus,
  onKeyDown,
  children,
  ...props
}: Props): ReactElement {
  return (
    <Tooltipped
      id={id}
      tooltip={tooltip}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onTouchStart={onTouchStart}
      onFocus={onFocus}
      onKeyDown={onKeyDown}
    >
      <RMDButton {...props}>{children}</RMDButton>
    </Tooltipped>
  );
}
