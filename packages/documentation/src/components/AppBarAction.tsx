import { ReactElement, ReactNode } from "react";
import {
  AppBarAction as RMDAppBarAction,
  AppBarActionProps,
} from "@react-md/app-bar";
import { Tooltip, useTooltip } from "@react-md/tooltip";

interface Props extends AppBarActionProps {
  id: string;
  tooltip?: ReactNode;
}

export default function AppBarAction({
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
      <RMDAppBarAction {...props} {...(tooltip ? elementProps : { id })}>
        {children}
      </RMDAppBarAction>
      <Tooltip {...tooltipProps}>{tooltip}</Tooltip>
    </>
  );
}
