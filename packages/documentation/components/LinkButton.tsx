import React, { FunctionComponent } from "react";
import { buttonThemeClassNames, ButtonThemeProps } from "@react-md/button";
import { Tooltipped, TooltippedProps } from "@react-md/tooltip";

import LinkUnstyled, { LinkUnstyledProps } from "./LinkUnstyled";
import { RenderConditionalPortalProps } from "@react-md/portal";
import { Omit } from "@react-md/utils";
import { useInteractionStates } from "@react-md/states";

export interface LinkButtonProps
  extends Omit<LinkUnstyledProps, "id">,
    RenderConditionalPortalProps,
    ButtonThemeProps,
    Pick<TooltippedProps, "id" | "tooltip"> {
  target?: string;
  tooltipClassName?: string;
}

const LinkButton: FunctionComponent<LinkButtonProps> = providedProps => {
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
    ...props
  } = providedProps;
  const { ripples, className, handlers } = useInteractionStates({
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
          {ripples}
          {children}
        </LinkUnstyled>
      )}
    </Tooltipped>
  );
};

export default LinkButton;
