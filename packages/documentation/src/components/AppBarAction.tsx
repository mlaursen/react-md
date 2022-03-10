import type { ReactElement, ReactNode } from "react";
import type { AppBarActionProps } from "@react-md/app-bar";
import { AppBarAction as RMDAppBarAction } from "@react-md/app-bar";
import { Tooltip, useTooltip } from "@react-md/tooltip";

interface Props extends AppBarActionProps {
  id: string;
  tooltip?: ReactNode;
}

export default function AppBarAction({
  id,
  tooltip,
  children,
  onClick,
  onBlur,
  onFocus,
  onKeyDown,
  onMouseEnter,
  onMouseLeave,
  onTouchStart,
  onContextMenu,
  ...props
}: Props): ReactElement {
  const { elementProps, tooltipProps } = useTooltip({
    baseId: id,
    disabled: !tooltip,
    onClick,
    onBlur,
    onFocus,
    onKeyDown,
    onMouseEnter,
    onMouseLeave,
    onTouchStart,
    onContextMenu,
  });

  return (
    <>
      <RMDAppBarAction {...props} {...elementProps}>
        {children}
      </RMDAppBarAction>
      <Tooltip {...tooltipProps}>{tooltip}</Tooltip>
    </>
  );
}
