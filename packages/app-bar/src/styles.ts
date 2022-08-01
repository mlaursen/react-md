import { cnb } from "cnbuilder";
import { bem } from "@react-md/core";

const styles = bem("rmd-app-bar");

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
export type AppBarTheme = "clear" | "primary" | "secondary" | "surface";

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

/** @remarks \@since 6.0.0 */
export interface AppBarClassNameOptions {
  className?: string;

  /**
   * Set this to `true` if the `AppBar` should use `position: fixed`.
   *
   * @defaultValue `false`
   */
  fixed?: boolean;

  /**
   * The position within the page to "fix" the `AppBar` when the `fixed` prop is
   * enabled.
   *
   * @defaultValue `"top"`
   */
  fixedPosition?: AppBarPosition;

  /**
   * Set this to `true` if enabling the {@link fixed} prop should not include
   * box-shadow.
   *
   * @defaultValue `false`
   */
  disableFixedElevation?: boolean;

  /**
   * The theme to apply to the `AppBar`.
   *
   * @defaultValue `"primary"`
   * @see {@link AppBarTheme}
   */
  theme?: AppBarTheme;

  /**
   * @defaultValue `"normal"`
   * @see {@link AppBarHeight}
   */
  height?: AppBarHeight;

  /**
   * Set this to `true` if the app bar's positioning and width should be
   * changed whenever the scrollbar is visible on the page. This defaults to
   * `true` when the {@link fixed} prop is `true` so that once dialogs and menus
   * become visible the contents in the app bar do not need to be repainted.
   *
   * @defaultValue `fixed`
   */
  scrollbarOffset?: boolean;
}

/**
 * Apply the `className`s for a tree component. This will be type-safe if using
 * typescript.
 *
 * @remarks \@since 6.0.0
 */
export function appBar(options: AppBarClassNameOptions = {}): string {
  const {
    className,
    height = "normal",
    theme = "primary",
    fixed = false,
    fixedPosition = "top",
    scrollbarOffset = fixed,
    disableFixedElevation = false,
  } = options;
  return cnb(
    styles({
      [theme]: theme !== "clear",
      [height]: height !== "normal",
      fixed,
      [fixedPosition]: fixed,
      "fixed-elevation": fixed && !disableFixedElevation,
      "scrollbar-offset": scrollbarOffset,
      "static-scrollbar-offset": !fixed && scrollbarOffset,
    }),
    className
  );
}

/**
 * - `"small"` - the first character in the title will be `1rem` (`$keyline`)
 *   from the edge of the app bar horizontally
 * - `"nav"` - this should be set when there is a nav button before the title so
 *   that the first character in the title will be `4.5rem` (`title-keyline`)
 * - `"title"` - this should be used when the title should align with the list
 *   item keyline and there is no nav icon before.
 *
 * @remarks \@since 6.0.0
 */
export type AppBarTitleKeyline = "small" | "nav" | "title";

/** @remarks \@since 6.0.0 */
export interface AppBarTitleClassNameOptions {
  className?: string;

  /**
   * @defaultValue `"small"`
   * @see {@link AppBarTitleKeyline}
   */
  keyline?: AppBarTitleKeyline;

  /**
   * Set this to `true` if the title should no longer allow text wrap behavior
   * and instead truncate with trailing ellipsis.
   *
   * @defaultValue `false`
   */
  noWrap?: boolean;
}

/**
 * Apply the `className`s for a tree component. This will be type-safe if using
 * typescript.
 *
 * @remarks \@since 6.0.0
 */
export function appBarTitle(options: AppBarTitleClassNameOptions = {}): string {
  const { className, keyline = "small", noWrap = false } = options;
  return cnb(
    styles("title", {
      keyline: keyline == "title",
      "no-wrap": noWrap,
      "nav-keyline": keyline === "nav",
    }),
    className
  );
}
