import React, { CSSProperties, forwardRef, ReactNode } from "react";
import { BadgedButton, BadgedButtonProps } from "@react-md/badge";
import { Tooltipped } from "@react-md/tooltip";

export interface TooltippedBadgedButtonProps extends BadgedButtonProps {
  id: string;
  tooltip?: ReactNode;
  tooltipStyle?: CSSProperties;
  tooltipClassName?: string;
}

export default forwardRef<HTMLButtonElement, TooltippedBadgedButtonProps>(
  function TooltippedBadgedButton(
    { id, tooltip, tooltipStyle, tooltipClassName, children, ...props },
    ref
  ) {
    return (
      <Tooltipped
        id={id}
        tooltip={tooltip}
        style={tooltipStyle}
        className={tooltipClassName}
      >
        <BadgedButton {...props} ref={ref}>
          {children}
        </BadgedButton>
      </Tooltipped>
    );
  }
);
