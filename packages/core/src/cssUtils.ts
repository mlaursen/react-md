import { cnb } from "cnbuilder";

/**
 * - `primary -> $primary-color`
 * - `secondary -> $secondary-color`
 * - `warning -> $warning-color`
 * - `success -> $success-color`
 * - `error -> $error-color`
 *
 * @since 6.0.0
 */
export type ThemeColor =
  | "primary"
  | "secondary"
  | "warning"
  | "success"
  | "error";

/**
 * - `text-primary -> $text-primary-color`
 * - `text-secondary -> $text-secondary-color`
 * - `text-hint -> $text-hint-color`
 * - `text-disabled -> $text-disabled-color`
 *
 * @since 6.0.0
 */
export type TextColor =
  | "text-primary"
  | "text-secondary"
  | "text-hint"
  | "text-disabled"
  | `on-${ThemeColor}`;

/**
 * @since 6.0.0
 */
export type OutlineColor = ThemeColor | "greyscale" | "current-color";

/**
 * @since 6.0.0
 */
export type BackgroundColor = ThemeColor | "surface" | "current-color";

export type TextAlign = "left" | "center" | "right";
export type TextDecoration = "underline" | "overline" | "line-through" | "none";
export type TextTransform = "capitalize" | "uppercase" | "lowercase";
export type FontStyle = "italic" | "oblique" | "normal";

/**
 * The supported css `font-weight` values.
 *
 * Note: You will need to ensure that you are using a web safe font for all the
 * font weights to work, use variable fonts, or load all font weights for your
 * custom font.
 *
 * @see {@link https://www.google.com/search?q=web+safe+fonts | Web Safe Fonts}
 * @see {@link https://www.google.com/search?q=variable+fonts | Variable Fonts}
 * @since 6.0.0 This was `TextWeight` beforehand.
 */
export type FontWeight =
  | "thin"
  | "light"
  | "regular"
  | "medium"
  | "bold"
  | "semi-bold"
  | "black";

/**
 * Since the typography within react-md tries to not modify base elements, the
 * default margin applied to heading tags (h1-h6) and paragraph (p) might have
 * large margin that you don't want applied when using this component. You can
 * disable:
 *
 * - only the top margin by setting this prop to `"bottom"`
 * - only the bottom margin by setting this prop to `"top"`
 * - top and bottom margin by setting this prop to `"none"`
 * - or keep the initial behavior: `"initial"`
 *
 * @since 6.0.0
 */
export type Margin = "none" | "top" | "bottom" | "centered";

/** @since 6.0.0 */
export type TextOverflow = "allow" | "nowrap" | "ellipsis";

/** @since 6.0.0 */
export interface TextCssUtilsOptions {
  textColor?: ThemeColor | TextColor | null;

  textAlign?: TextAlign;

  textDecoration?: TextDecoration;

  textTransform?: TextTransform;

  fontWeight?: FontWeight;

  fontStyle?: FontStyle;

  /**
   * This can be used to remove margin from an element (usually typography
   * elements since the browser applies default margin for those elements).
   *
   * @see {@link Margin}
   */
  margin?: Margin;

  /**
   * Set this to `"nowrap"` to only prevent line wrap behavior or `"ellipsis"`
   * to also hide additional text with ellipsis.
   *
   * @defaultValue `"allow"`
   */
  textOverflow?: TextOverflow;
}

/**
 * @since 6.0.0
 */
export interface CssUtilsOptions extends TextCssUtilsOptions {
  className?: string;

  /**
   * Set this to `true` to allow the content to only be visible for screen
   * readers. Set this to `"focusable"` to allow the content to be visible to
   * screen readers and once focused. Set this to `"phone"` to only render the
   * the content as screen reader only text on phones.
   *
   * @defaultValue `false`
   */
  srOnly?: boolean | "focusable" | "phone";

  /**
   * Set this to `"current-color"` to inherit the current text color or a
   * specific theme color as the outline `box-shadow`.
   */
  outlineColor?: OutlineColor;

  /**
   * When this is defined, a specific theme background-color will be applied
   * along with updating the text color be either `#000` or `#fff` depending on
   * which has the highest contrast ratio.
   */
  backgroundColor?: BackgroundColor;

  /**
   * Set this to `true` if the element should act as an interaction surface
   * which will:
   * - display a pointer while hovered
   * - increase the z-index of children to enable higher contrast when
   *   `core.$interaction-disable-higher-contrast` is not `true`
   * - add a `::before` pseudo element that will:
   *   - gain the focus shadow while `:focus`-ed
   *   - add a background-color while `:hover`-ed
   *   - show no hover/focus styles while `:disabled` or `[aria-disabled="true"]`
   *
   * @defaultValue `false`
   */
  surface?: boolean;

  /**
   * Set this to `"light"` or `"dark"` to update the hover, focus, press,
   * selected, and ripple colors for the surface type. `"light"` surfaces will
   * use `#000` while `"dark"` will use `#fff`.
   */
  surfaceColor?: "light" | "dark";
}

/**
 * This is used to apply css utility functions to any element within your
 * application such as:
 * - specific theme colors as background, text, or outline color
 * - removing margin
 * - screen reader visible only text
 * - text-align, text-decoration, text-transform, font-style, font-weight
 * - disable line wrap
 *
 * @since 6.0.0
 */
export function cssUtils(options: CssUtilsOptions): string {
  const {
    className,
    srOnly,
    textColor,
    outlineColor,
    backgroundColor,
    surface,
    surfaceColor,
    margin,
    fontStyle,
    fontWeight,
    textAlign,
    textDecoration,
    textTransform,
    textOverflow,
  } = options;

  const isMarginTop = margin === "top";
  const isTextColor =
    textColor === "text-primary" ||
    textColor === "text-secondary" ||
    textColor === "text-hint" ||
    textColor === "text-disabled";

  return cnb(
    !backgroundColor && !isTextColor && textColor && `rmd-${textColor}-color`,
    !backgroundColor && isTextColor && `rmd-${textColor}-color`,
    backgroundColor && "rmd-background-container",
    backgroundColor &&
      backgroundColor !== "current-color" &&
      backgroundColor !== "surface" &&
      `rmd-${backgroundColor}-container`,
    outlineColor && "rmd-outline",
    outlineColor && `rmd-${outlineColor}-outline`,
    (isMarginTop || margin === "bottom") &&
      `rmd-no-margin-${isMarginTop ? "bottom" : "top"}`,
    margin === "none" && "rmd-no-margin",
    margin === "centered" && "rmd-centered",
    textAlign && `rmd-align-${textAlign}`,
    textDecoration && `rmd-${textDecoration}`,
    textTransform && `rmd-${textTransform}`,
    fontStyle && `rmd-${fontStyle}`,
    fontWeight && `rmd-${fontWeight}`,
    srOnly && srOnly !== "phone" && "rmd-sr-only",
    srOnly === "phone" && "rmd-phone-sr-only",
    srOnly === "focusable" && "rmd-sr-only--focusable",
    surfaceColor === "light" && "rmd-light-surface",
    surfaceColor === "dark" && "rmd-dark-surface",
    textOverflow && textOverflow !== "allow" && "rmd-nowrap",
    textOverflow === "ellipsis" && "rmd-ellipsis",
    surface && "rmd-interaction-surface",
    className
  );
}
