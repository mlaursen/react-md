import type { ReactElement } from "react";
import type { ButtonThemeProps } from "@react-md/button";
import { buttonThemeClassNames } from "@react-md/button";
import { useInteractionStates } from "@react-md/states";

import type { LinkUnstyledProps } from "./LinkUnstyled";
import LinkUnstyled from "./LinkUnstyled";

export interface LinkButtonProps extends LinkUnstyledProps, ButtonThemeProps {
  target?: string;
  tooltipClassName?: string;
}

export default function LinkButton(
  providedProps: LinkButtonProps
): ReactElement {
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
}
