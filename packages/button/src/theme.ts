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
  const text = buttonType === "text" || !buttonType;
  const icon = buttonType === "icon";
  const outline = themeType === "outline";
  const contained = themeType === "contained";
  const clear = theme === "clear";

  return cn(
    "rmd-button",
    {
      "rmd-button--text": text,
      "rmd-button--icon": icon,
      "rmd-button--disabled": disabled,
      "rmd-button--contained": !disabled && contained,
      "rmd-button--outline": outline,
      [`rmd-button--${theme}`]: !disabled && !clear && contained,
      [`rmd-button--text-${theme}`]: !disabled && !clear && !contained,
      [`rmd-button--outline-${theme}`]: !disabled && !clear && outline,
    },
    className
  );
}
