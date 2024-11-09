import { cnb } from "cnbuilder";
import { type BoxOptions, box } from "../box/styles.js";
import { type BackgroundColor, cssUtils } from "../cssUtils.js";
import { type CssPosition } from "../types.js";
import { bem } from "../utils/bem.js";

declare module "react" {
  interface CSSProperties {
    "--rmd-app-bar-height"?: string | number;
    "--rmd-app-bar-background-color"?: string;
    "--rmd-app-bar-color"?: string;
    "--rmd-app-bar-surface-background-color"?: string;
    "--rmd-app-bar-surface-color"?: string;
  }
}

const styles = bem("rmd-app-bar");
const titleStyles = bem("rmd-app-bar-title");

export type AppBarPosition = "top" | "bottom";

/**
 * - `"clear"` - the background color will be transparent
 * - `"primary"` - defaults to the current primary theme color
 * - `"secondary"` - defaults to the current secondary theme color
 * - `"surface"` - this will use the current surface background color which
 *   defaults to `#fff` for light themes, `#242424` for dark themes, and
 *   `#424242` for dark themes when the `$disable-dark-elevation` is set to
 *   `true`
 *
 * The default dark theme surface color also depends on the `$fixed-elevation`
 * value.
 */
export type AppBarTheme = BackgroundColor | "clear";

/**
 * - `"auto"` - the height will be determined by the height of the content
 * - `"normal"` - defaults to `3.5rem` (`$height`)
 * - `"prominent"` - defaults to `7rem` (`$prominent-height`)
 * - `"dense"` - defaults to `3rem` (`$dense-height`)
 * - `"prominent-dense"` - defaults to `6rem` (`$prominent-dense-height`)
 */
export type AppBarHeight =
  | "auto"
  | "normal"
  | "prominent"
  | "dense"
  | "prominent-dense";

/** @since 6.0.0 */
export interface AppBarClassNameOptions extends Omit<BoxOptions, "fullWidth"> {
  className?: string;

  /**
   * Set this to `"fixed"` or `"sticky"` to set `position: fixed;` or
   * `position: sticky;` to the app bar. The default position will be static and
   * inline with other content.
   *
   * @defaultValue `'static'`
   */
  position?: CssPosition;

  /**
   * The position within the page to "fix" the `AppBar` when the `fixed` prop is
   * enabled.
   *
   * @defaultValue `"top"`
   */
  pagePosition?: AppBarPosition;

  /**
   * Set this to `true` to remove the box-shadow.
   *
   * @defaultValue `false`
   */
  disableElevation?: boolean;

  /**
   * The theme to apply to the `AppBar`.
   *
   * @defaultValue `"primary"`
   * @see {@link AppBarTheme}
   */
  theme?: AppBarTheme;

  /**
   * @defaultValue `stacked ? "auto" : "normal"`
   * @see {@link AppBarHeight}
   */
  height?: AppBarHeight;

  /** @see {@link CssUtilsOptions.surfaceColor} */
  surfaceColor?: "light" | "dark";

  /**
   * Set this to `true` if the app bar's positioning and width should be
   * changed whenever the scrollbar is visible on the page. This defaults to
   * `true` when the {@link position} prop is `true` so that once dialogs and menus
   * become visible the contents in the app bar do not need to be repainted.
   *
   * @since 6.0.0
   * @defaultValue `position === "fixed"`
   */
  scrollbarOffset?: boolean;
}

/**
 * Apply the `className`s for a tree component. This will be type-safe if using
 * typescript.
 *
 * @since 6.0.0
 */
export function appBar(options: AppBarClassNameOptions = {}): string {
  const {
    className,
    theme = "primary",
    stacked,
    height = stacked ? "auto" : "normal",
    position = "static",
    pagePosition = "top",
    scrollbarOffset = position === "fixed",
    align,
    grid,
    gridColumns,
    gridName,
    justify,
    reversed,
    surfaceColor,
    disableWrap = true,
    disablePadding,
    disableElevation,
  } = options;
  const surface = theme === "surface";
  const clear = theme === "clear";

  return cnb(
    styles({
      surface,
      [height]: height !== "normal",
      fixed: position !== "static",
      stacked,
      sticky: position === "sticky",
      [pagePosition]: position !== "static",
      elevated: position !== "static" && !disableElevation,
      "scrollbar-offset": scrollbarOffset,
      "static-scrollbar-offset": position === "static" && scrollbarOffset,
    }),
    box({
      align,
      stacked,
      fullWidth: true,
      grid,
      gridColumns,
      gridName,
      justify,
      reversed,
      disableWrap,
      disablePadding,
    }),
    cssUtils({
      backgroundColor: !surface && !clear ? theme : undefined,
      surfaceColor,
    }),
    className
  );
}

/**
 * - `"small"` - the first character in the title will be `1rem` (`$keyline`)
 *   from the edge of the app bar horizontally
 * - `"nav"` - this should be set when there is a nav button before the title so
 *   that the first character in the title will be `4.5rem` (`title-keyline`)
 * - `"list"` - this should be used when the title should align with the list
 *   item keyline and there is no nav icon before.
 *
 * @since 6.0.0
 */
export type AppBarTitleKeyline = "small" | "nav" | "list";

/** @since 6.0.0 */
export interface AppBarTitleClassNameOptions {
  className?: string;

  /**
   * @defaultValue `"small"`
   * @see {@link AppBarTitleKeyline}
   */
  keyline?: AppBarTitleKeyline;
}

/**
 * Apply the `className`s for a `AppBarTitle` component. This will be type-safe
 * if using typescript.
 *
 * @since 6.0.0
 */
export function appBarTitle(options: AppBarTitleClassNameOptions = {}): string {
  const { className, keyline = "small" } = options;
  return cnb(
    titleStyles({
      keyline: keyline == "list",
      "nav-keyline": keyline === "nav",
    }),
    className
  );
}
