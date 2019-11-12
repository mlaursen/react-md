import React, { FC } from "react";
import { buttonThemeClassNames, ButtonThemeProps } from "@react-md/button";
import { useInteractionStates } from "@react-md/states";

import LinkUnstyled, { LinkUnstyledProps } from "./LinkUnstyled";

export interface LinkButtonProps extends LinkUnstyledProps, ButtonThemeProps {
  target?: string;
  tooltipClassName?: string;
}

const LinkButton: FC<LinkButtonProps> = providedProps => {
  const {
    className: _className,
    theme,
    buttonType,
    themeType,
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
