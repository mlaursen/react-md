import { ReactElement, ReactNode } from "react";
import { Button as RMDButton, ButtonProps } from "@react-md/button";
import { Tooltip, useTooltip } from "@react-md/tooltip";

interface Props extends ButtonProps {
  id: string;
  tooltip?: ReactNode;
}

export default function Button({
  id,
  tooltip,
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
}: Props): ReactElement {
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
      <RMDButton {...props} {...(tooltip ? elementProps : { id })}>
        {children}
      </RMDButton>
      <Tooltip {...tooltipProps}>{tooltip}</Tooltip>
    </>
  );
}
