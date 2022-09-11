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
