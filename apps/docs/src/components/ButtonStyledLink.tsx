import {
  type ButtonClassNameThemeOptions,
  button,
} from "@react-md/core/button/styles";
import { cssUtils } from "@react-md/core/cssUtils";
import { type ReactElement } from "react";

import { LinkUnstyled, type LinkUnstyledProps } from "./LinkUnstyled.jsx";

export interface ButtonStyledLinkProps
  extends LinkUnstyledProps,
    ButtonClassNameThemeOptions {}

export function ButtonStyledLink(props: ButtonStyledLinkProps): ReactElement {
  const {
    theme,
    themeType,
    buttonType,
    className,
    disabled,
    children,
    ...remaining
  } = props;

  return (
    <LinkUnstyled
      {...remaining}
      className={button({
        theme,
        themeType,
        buttonType,
        disabled,
        className: cssUtils({ textDecoration: "none", className }),
      })}
    >
      {children}
    </LinkUnstyled>
  );
}
