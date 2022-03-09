import type { ReactElement, ReactNode } from "react";
import type { ButtonProps } from "@react-md/button";
import { Button } from "@react-md/button";
import type { TooltipHookOptions } from "@react-md/tooltip";
import { Tooltip, useTooltip } from "@react-md/tooltip";

interface TooltippedButtonProps
  extends ButtonProps,
    Pick<
      TooltipHookOptions<HTMLButtonElement>,
      "defaultPosition" | "dense" | "position" | "focusTime" | "touchTime"
    > {
  id: string;
  tooltip?: ReactNode;
}

export default function TooltippedButton({
  id,
  tooltip,
  onClick,
  onBlur,
  onFocus,
  onKeyDown,
  onMouseEnter,
  onMouseLeave,
  onTouchStart,
  children,
  dense,
  position,
  defaultPosition,
  focusTime,
  touchTime,
  ...props
}: TooltippedButtonProps): ReactElement {
  const { elementProps, tooltipProps } = useTooltip({
    baseId: id,
    dense,
    onClick,
    onBlur,
    onFocus,
    onKeyDown,
    onMouseEnter,
    onMouseLeave,
    onTouchStart,
    position,
    focusTime,
    touchTime,
    defaultPosition,
  });

  return (
    <>
      <Button {...props} {...elementProps}>
        {children}
      </Button>
      <Tooltip {...tooltipProps}>{tooltip}</Tooltip>
    </>
  );
}

TooltippedButton.defaultProps = {
  themeType: "outline",
};
