import { bem } from "@react-md/core";
import { cnb } from "cnbuilder";

const buttonStyles = bem("rmd-button");
const fabStyles = bem("rmd-fab");

/**
 * When this is set to `"text"`, the size of the button will be determined by
 * the content and will be more block-like. Icons can still be rendered in
 * `"text"` buttons and will have spacing automatically applied between other
 * content in the button.
 *
 * When this is set to `"icon"`, the button will be equal height/width and
 * circular.
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
 * When this is set to `"flat"`, the button will have no `background-color`,
 * `border`, and `box-shadow`. It will only set the `color` to the
 * {@link ButtonTheme}.
 *
 * When this is set to `"outline"`, the button will have no `background-color`,
 * but gain a `border` and `color` set to the {@link ButtonTheme}.
 *
 * When this is set to `"contained"`, the button will set the `background-color`
 * to the {@link ButtonTheme}, add some `box-shadow`, and set the `color` to
 * either `#000` or `#fff`. (The `color` defaults to whichever value has the
 * highest contrast ratio with the `background-color`)
 */
export type ButtonThemeType = "flat" | "outline" | "contained";

/** @remarks \@since 6.0.0 */
export interface ButtonClassNameThemeOptions {
  className?: string;

  /** @defaultValue `false` */
  disabled?: boolean;

  /**
   * @see {@link ButtonTheme} for information about the different types.
   * @defaultValue `"text"`
   */
  buttonType?: ButtonType;

  /** @defaultValue `"clear"` */
  theme?: ButtonTheme;

  /**
   * @see {@link ButtonThemeType} for information about the theming behavior.
   * @defaultValue `"flat"`
   */
  themeType?: ButtonThemeType;
}

/**
 * @remarks \@since 6.0.0
 * @internal
 */
export interface ButtonClassNameOptions extends ButtonClassNameThemeOptions {
  /** @defaultValue `false` */
  pressed?: boolean;
  pressedClassName?: string;
}

/**
 * Creates a button theme based on the button theming props. This is really just
 * used so that other elements like clickable `<div>`s or `<input type="file">`
 * can look like buttons.
 *
 * @param options - An object containing the themeable button props to generate a
 * button theme className.
 * @returns a string of class names to create an element with a button theme.
 * @remarks \@since 6.0.0 This used to be called `buttonThemeClassNames`.
 */
export function button(options: ButtonClassNameOptions = {}): string {
  const {
    theme: propTheme = "clear",
    themeType = "flat",
    buttonType = "text",
    disabled: propDisabled = false,
    pressed = false,
    pressedClassName,
    className,
  } = options;

  const theme = propTheme === "disabled" ? "clear" : propTheme;
  const disabled = propDisabled || propTheme === "disabled";
  const text = buttonType === "text";
  const icon = buttonType === "icon";
  const outline = themeType === "outline";
  const contained = themeType === "contained";
  const clear = theme === "clear";

  return cnb(
    buttonStyles({
      text,
      icon,
      disabled,
      contained: !disabled && contained,
      outline,
      pressed: contained && pressed,
      [theme]: !disabled && !clear && contained,
      [`text-${theme}`]: !disabled && !clear && !contained,
      [`outline-${theme}`]: !disabled && !clear && outline,
    }),
    pressedClassName,
    className
  );
}

/**
 * The position within the viewport for the floating action button.
 * @remarks \@since 6.0.0 This was renamed from `FABPosition`
 */
export type FloatingActionButtonPosition =
  | "bottom-left"
  | "bottom-right"
  | "top-left"
  | "top-right"
  | null;

export interface FloatingActionButtonClassNameOptions {
  className?: string;

  /** @defaultValue `null` */
  position?: FloatingActionButtonPosition;

  /**
   * @defaultValue `false`
   */
  absolute?: boolean;
}

export function fab(options: FloatingActionButtonClassNameOptions): string {
  const { className, position = null, absolute = false } = options;

  return cnb(
    fabStyles({
      tl: position === "top-left",
      tr: position === "top-right",
      bl: position === "bottom-left",
      br: position === "bottom-right",
      absolute,
    }),
    className
  );
}
