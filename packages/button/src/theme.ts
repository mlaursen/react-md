import cn from "classnames";

import { IButtonThemeProps } from "./types.d";

/**
 * Creates a button theme based on the button theming props. This is really just used so that
 * other elements like clickable `<div>`s or `<input type="file">` can look like buttons.
 *
 * @param props An object containing the themeable button props to generate a button theme
 * className.
 * @return a string of class names to create an element with a button theme.
 */
export default function theme(props: IButtonThemeProps): string {
  const { buttonType, themeType, theme, disabled, className } = props;
  const text = buttonType === "text";
  const icon = buttonType === "icon";
  const outline = themeType === "outline";
  const contained = themeType === "contained";
  const primary = theme === "primary";
  const secondary = theme === "secondary";
  const defaultTheme = theme === "default";
  const warning = theme === "warning";
  const error = theme === "error";

  return cn(
    "rmd-button",
    {
      "rmd-button--text": text,
      "rmd-button--icon": icon,
      "rmd-button--disabled": disabled,
      "rmd-button--hoverable": !disabled,
      "rmd-button--primary": !disabled && primary && contained,
      "rmd-button--secondary": !disabled && secondary && contained,
      "rmd-button--warning": !disabled && warning && contained,
      "rmd-button--error": !disabled && error && contained,
      "rmd-button--default": !disabled && defaultTheme && contained,
      "rmd-button--text-primary": !disabled && primary && !contained,
      "rmd-button--text-secondary": !disabled && secondary && !contained,
      "rmd-button--text-warning": !disabled && warning && !contained,
      "rmd-button--text-error": !disabled && error && !contained,
      "rmd-button--text-default": !disabled && defaultTheme && !contained,
      "rmd-button--outline-disabled": disabled && outline,
      "rmd-button--outline-primary": !disabled && primary && outline,
      "rmd-button--outline-secondary": !disabled && secondary && outline,
      "rmd-button--outline-warning": !disabled && warning && outline,
      "rmd-button--outline-error": !disabled && error && outline,
      "rmd-button--outline-default": !disabled && defaultTheme && outline,
      "rmd-button--contained": !disabled && contained,
    },
    className
  );
}
