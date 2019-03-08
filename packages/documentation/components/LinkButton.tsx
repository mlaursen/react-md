import React, { FunctionComponent } from "react";
import { buttonThemeClassNames, IButtonThemeProps } from "@react-md/button";
import { Tooltipped, ITooltippedProps } from "@react-md/tooltip";

import LinkUnstyled, { ILinkUnstyledProps } from "./LinkUnstyled";
import { IRenderConditionalPortalProps } from "@react-md/portal";
import { Omit } from "@react-md/utils";
import { useInteractionStates } from "@react-md/states";

export interface ILinkButtonProps
  extends Omit<ILinkUnstyledProps, "id">,
    IRenderConditionalPortalProps,
    IButtonThemeProps,
    Pick<ITooltippedProps, "id" | "tooltip"> {
  target?: string;
  tooltipClassName?: string;
}

const LinkButton: FunctionComponent<ILinkButtonProps> = providedProps => {
  const {
    id,
    className: propClassName,
    theme,
    buttonType,
    themeType,
    tooltip: propTooltip,
    tooltipClassName,
    portal,
    portalInto,
    portalIntoId,
    children,
    // onClick,
    // onMouseEnter,
    // onMouseLeave,
    ...props
  } = providedProps;
  const { ripples, className, handlers } = useInteractionStates({
    id,
    handlers: props,
    className: buttonThemeClassNames(providedProps),
  });
  return (
    <Tooltipped
      id={id}
      className={tooltipClassName}
      portal={portal}
      portalInto={portalInto}
      portalIntoId={portalIntoId}
      tooltip={propTooltip}
      {...handlers}
    >
      {({ tooltip, containerProps }) => (
        <LinkUnstyled
          {...props}
          {...containerProps}
          className={buttonThemeClassNames({
            className,
            theme,
            themeType,
            buttonType,
          })}
        >
          {tooltip}
          {children}
        </LinkUnstyled>
      )}
    </Tooltipped>
  );
};

export default LinkButton;
