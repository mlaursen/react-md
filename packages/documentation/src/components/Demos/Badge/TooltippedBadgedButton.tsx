import { CSSProperties, forwardRef, ReactNode } from "react";
import { BadgedButton, BadgedButtonProps } from "@react-md/badge";
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
        <BadgedButton
          {...props}
          {...(tooltip ? elementProps : { id })}
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
