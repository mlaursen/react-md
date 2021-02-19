import cn from "classnames";
import { bem } from "@react-md/utils";

/**
 * One of the valid button types that can be used
 */
export type ButtonType = "text" | "icon";

/**
 * One of the valid material design default button themes that can be used. This
 * will update the general look and feel by updating the colors within the
 * button while the `ButtonThemeType` will update the borders or box shadow.
 */
export type ButtonTheme =
  | "clear"
  | "primary"
  | "secondary"
  | "warning"
  | "error"
  | "disabled";

/**
 * One of the valid material design "themed" button types that can be used. This
 * will update the general look and feel by adding borders or box shadow to the
 * button while the `ButtonTheme` will update the colors.
 */
export type ButtonThemeType = "flat" | "outline" | "contained";

/**
 * This is an interface of all the button's customizable theme props. This is
 * mainly used if you want to add a button theme to another component and have
 * it configurable via props.
 */
export interface ButtonThemeProps {
  /**
   * An optional className to also apply to the button for additional theming
   * and styling. This will be merged with the `Button.theme` class name styles.
   */
  className?: string;

  /**
   * Enabling this prop will apply the disabled styles to a `Button`. When this
   * is also applied to the button component, the button will be updated so that
   * it can no longer be interacted with.
   */
  disabled?: boolean;

  /**
   * This is the specific material design button type to use. This can either be
   * set to "text" or "icon". When this is set to "text", the styles applied
   * will make buttons with just text or text with icons render nicely. When
   * this is set to "icon", the styles applied will make icon only buttons
   * render nicely.
   */
  buttonType?: ButtonType;

  /**
   * The material design theme to apply to the button. The theme prop will
   * update the look and feel of the button by applying different background
   * and/or foreground colors.
   */
  theme?: ButtonTheme;

  /**
   * The material design theme type to apply. The themeTYpe prop will update the
   * look and feel of the button by applying different border or box shadow.
   */
  themeType?: ButtonThemeType;
}

const block = bem("rmd-button");

/**
 * Creates a button theme based on the button theming props. This is really just
 * used so that other elements like clickable `<div>`s or `<input type="file">`
 * can look like buttons.
 *
 * @param props - An object containing the themeable button props to generate a
 * button theme className.
 * @returns a string of class names to create an element with a button theme.
 */
export function buttonThemeClassNames({
  theme: propTheme = "clear",
  themeType = "flat",
  buttonType = "text",
  disabled: propDisabled = false,
  className,
}: ButtonThemeProps): string {
  const theme = propTheme === "disabled" ? "clear" : propTheme;
  const disabled = propDisabled || propTheme === "disabled";
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
