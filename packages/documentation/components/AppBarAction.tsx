import React, { FunctionComponent, forwardRef } from "react";
import {
  AppBarAction as RMDAction,
  AppBarActionProps as RMDActionProps,
} from "@react-md/app-bar";
import { Tooltipped, TooltippedProps } from "@react-md/tooltip";
import { RenderConditionalPortalProps } from "@react-md/portal";
import { Omit, WithForwardedRef } from "@react-md/utils";

interface AppBarActionProps
  extends Omit<RMDActionProps, "id">,
    RenderConditionalPortalProps,
    Pick<TooltippedProps, "id" | "tooltip"> {
  tooltipClassName?: string;
}

const AppBarAction: FunctionComponent<
  AppBarActionProps & WithForwardedRef<HTMLButtonElement>
> = ({
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
  forwardedRef,
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
      <RMDAction {...props} {...containerProps} ref={forwardedRef}>
        {children}
        {tooltip}
      </RMDAction>
    )}
  </Tooltipped>
);

export default forwardRef<HTMLButtonElement, AppBarActionProps>(
  (props, ref) => <AppBarAction {...props} forwardedRef={ref} />
);
