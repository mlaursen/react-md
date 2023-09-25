import { button, type ButtonClassNameThemeOptions } from "@react-md/core";
import { cnb } from "cnbuilder";
import type { ReactElement } from "react";
import styles from "./ButtonStyledLink.module.scss";
import { LinkUnstyled, type LinkUnstyledProps } from "./LinkUnstyled.js";

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
        className: cnb(styles.container, className),
      })}
    >
      {children}
    </LinkUnstyled>
  );
}
