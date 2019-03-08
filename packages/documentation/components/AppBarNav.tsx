import React, { FunctionComponent } from "react";
import { AppBarNav as RMDNav, IAppBarNavProps } from "@react-md/app-bar";
import { Tooltipped, ITooltippedProps } from "@react-md/tooltip";
import { IRenderConditionalPortalProps } from "@react-md/portal";
import { Omit } from "@react-md/utils";

interface AppBarNavProps
  extends Omit<IAppBarNavProps, "id">,
    IRenderConditionalPortalProps,
    Pick<ITooltippedProps, "id" | "tooltip"> {
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
