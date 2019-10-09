import React, { FC } from "react";
import { buttonThemeClassNames, ButtonThemeProps } from "@react-md/button";
import { RenderConditionalPortalProps } from "@react-md/portal";
import { useInteractionStates } from "@react-md/states";

import LinkUnstyled, { LinkUnstyledProps } from "./LinkUnstyled";

export interface LinkButtonProps
  extends LinkUnstyledProps,
    RenderConditionalPortalProps,
    ButtonThemeProps {
  target?: string;
  tooltipClassName?: string;
}

const LinkButton: FC<LinkButtonProps> = providedProps => {
  const {
    className: propClassName,
    theme,
    buttonType,
    themeType,
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
    <LinkUnstyled
      {...props}
      {...handlers}
      className={buttonThemeClassNames({
        className,
        theme,
        themeType,
        buttonType,
      })}
    >
      {ripples}
      {children}
    </LinkUnstyled>
  );
};

export default LinkButton;
