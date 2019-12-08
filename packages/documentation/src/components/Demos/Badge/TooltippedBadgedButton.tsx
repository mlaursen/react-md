import React, { FC, ReactNode, CSSProperties, forwardRef } from "react";
import { Tooltipped } from "@react-md/tooltip";
import { BadgedButton } from "@react-md/badge";
import { BadgedButtonProps } from "@react-md/badge/types/BadgedButton";
import { WithForwardedRef } from "@react-md/utils";

export interface TooltippedBadgedButtonProps extends BadgedButtonProps {
  id: string;
  tooltip?: ReactNode;
  tooltipStyle?: CSSProperties;
  tooltipClassName?: string;
}

const TooltippedBadgedButton: FC<TooltippedBadgedButtonProps &
  WithForwardedRef<HTMLButtonElement>> = ({
  id,
  tooltip,
  tooltipStyle,
  tooltipClassName,
  children,
  forwardedRef,
  ...props
}) => (
  <Tooltipped
    id={id}
    tooltip={tooltip}
    style={tooltipStyle}
    className={tooltipClassName}
  >
    <BadgedButton {...props} ref={forwardedRef}>
      {children}
    </BadgedButton>
  </Tooltipped>
);

export default forwardRef<HTMLButtonElement, TooltippedBadgedButtonProps>(
  (props, ref) => <TooltippedBadgedButton {...props} forwardedRef={ref} />
);
