import type { CSSProperties, ReactNode } from "react";
import { forwardRef } from "react";
import type { BadgedButtonProps } from "@react-md/badge";
import { BadgedButton } from "@react-md/badge";
import { Tooltip, useTooltip } from "@react-md/tooltip";

export interface TooltippedBadgedButtonProps extends BadgedButtonProps {
  id: string;
  tooltip?: ReactNode;
  tooltipStyle?: CSSProperties;
  tooltipClassName?: string;
}

export default forwardRef<HTMLButtonElement, TooltippedBadgedButtonProps>(
  function TooltippedBadgedButton(
    {
      id,
      tooltip,
      tooltipStyle,
      tooltipClassName,
      onClick,
      onBlur,
      onFocus,
      onKeyDown,
      onMouseEnter,
      onMouseLeave,
      onTouchStart,
      onContextMenu,
      children,
      ...props
    },
    ref
  ) {
    const { elementProps, tooltipProps } = useTooltip({
      baseId: id,
      disabled: !tooltip,
      style: tooltipStyle,
      onClick,
      onBlur,
      onFocus,
      onMouseEnter,
      onMouseLeave,
      onKeyDown,
      onTouchStart,
      onContextMenu,
    });

    return (
      <>
        <BadgedButton {...props} {...elementProps} ref={ref}>
          {children}
        </BadgedButton>
        <Tooltip {...tooltipProps} className={tooltipClassName}>
          {tooltip}
        </Tooltip>
      </>
    );
  }
);
