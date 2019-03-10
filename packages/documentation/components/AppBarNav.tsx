import React, { FunctionComponent } from "react";
import {
  AppBarNav as RMDNav,
  AppBarNavProps as RMDNavProps,
} from "@react-md/app-bar";
import { Tooltipped, TooltippedProps } from "@react-md/tooltip";
import { RenderConditionalPortalProps } from "@react-md/portal";
import { Omit } from "@react-md/utils";

interface AppBarNavProps
  extends Omit<RMDNavProps, "id">,
    RenderConditionalPortalProps,
    Pick<TooltippedProps, "id" | "tooltip"> {
  tooltipClassName?: string;
}

const AppBarNav: FunctionComponent<AppBarNavProps> = ({
  id,
  tooltip: propTooltip,
  tooltipClassName,
  portal,
  portalInto,
  portalIntoId,
  children,
  onClick,
  onMouseEnter,
  onMouseLeave,
  ...props
}) => (
  <Tooltipped
    id={id}
    className={tooltipClassName}
    portal={portal}
    portalInto={portalInto}
    portalIntoId={portalIntoId}
    tooltip={propTooltip}
    onClick={onClick}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
  >
    {({ tooltip, containerProps }) => (
      <RMDNav {...props} {...containerProps}>
        {children}
        {tooltip}
      </RMDNav>
    )}
  </Tooltipped>
);

export default AppBarNav;
