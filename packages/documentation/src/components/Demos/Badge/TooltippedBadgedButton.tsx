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
    const handlers = {
      onClick,
      onBlur,
      onFocus,
      onMouseEnter,
      onMouseLeave,
      onKeyDown,
      onTouchStart,
      onContextMenu,
    };
    const { elementProps, tooltipProps } = useTooltip({
      baseId: id,
      ...handlers,
    });

    return (
      <>
        <BadgedButton
          {...props}
          {...(tooltip ? elementProps : { id, ...handlers })}
          ref={ref}
        >
          {children}
        </BadgedButton>
        <Tooltip
          {...tooltipProps}
          style={tooltipStyle}
          className={tooltipClassName}
        >
          {tooltip}
        </Tooltip>
      </>
    );
  }
);
