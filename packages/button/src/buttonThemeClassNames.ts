import cn from "classnames";
import { bem } from "@react-md/theme";

import { ButtonThemeProps } from "./types.d";

const block = bem("rmd-button");

/**
 * Creates a button theme based on the button theming props. This is really just used so that
 * other elements like clickable `<div>`s or `<input type="file">` can look like buttons.
 *
 * @param props An object containing the themeable button props to generate a button theme
 * className.
 * @return a string of class names to create an element with a button theme.
 */
export default function buttonThemeClassNames(props: ButtonThemeProps): string {
  const {
    buttonType = "text",
    themeType = "flat",
    theme = "primary",
    disabled,
    className,
  } = props;
  const text = buttonType === "text";
  const icon = buttonType === "icon";
  const outline = themeType === "outline";
  const contained = themeType === "contained";
  const clear = theme === "clear";

  return cn(
    block({
      text,
      icon,
      disabled,
      contained: !disabled && contained,
      outline,
      [theme]: !disabled && !clear && contained,
      [`text-${theme}`]: !disabled && !clear && !contained,
      [`outline-${theme}`]: !disabled && !clear && outline,
    }),
    className
  );
}
