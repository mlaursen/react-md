import { ReactElement, ReactNode } from "react";
import { AppBarNav as RMDAppBarNav, AppBarNavProps } from "@react-md/app-bar";
import { Tooltip, useTooltip } from "@react-md/tooltip";

interface Props extends AppBarNavProps {
  id: string;
  tooltip?: ReactNode;
}

export default function AppBarNav({
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
      <RMDAppBarNav {...props} {...(tooltip ? elementProps : { id })}>
        {children}
      </RMDAppBarNav>
      <Tooltip {...tooltipProps}>{tooltip}</Tooltip>
    </>
  );
}
