import { bem } from "@react-md/core";
import { cnb } from "cnbuilder";
import type { ElementType, HTMLAttributes, Ref } from "react";
import { forwardRef } from "react";

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
   * Set this to `true` to update the `AppBar` to have `flex-direction: column`.
   * This is useful when nesting `AppBar`s.
   *
   * @remarks \@since 6.0.0
   * @defaultValue `false`
   */
  stacked?: boolean;

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
   * @remarks \@since 6.0.0
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
    stacked = false,
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
      stacked,
      [fixedPosition]: fixed,
      "fixed-elevation": fixed && !disableFixedElevation,
      "scrollbar-offset": scrollbarOffset,
      "static-scrollbar-offset": !fixed && scrollbarOffset,
    }),
    className
  );
}

/** @remarks \@since 6.0.0 */
export type CustomAppBarComponent = ElementType<
  HTMLAttributes<HTMLDivElement> & {
    ref?: Ref<HTMLDivElement>;
    className: string;
  }
>;

/**
 * @remarks
 * \@since 6.0.0 Renamed the `component` prop to `as` and updated the default
 * value to be a `"div"` when `fixed` is `false`.
 * \@since 6.0.0 Renamed the `fixedElevation` prop to `disableFixedElevation` to
 * match naming conventions when a feature is enabled by default.
 * \@since 6.0.0 Removed the `inheritColor` and `flexWrap` props since they are
 * no longer required.
 * \@since 6.0.0 Added the {@link stacked} and {@link scrollbarOffset} props.
 */
export interface AppBarProps
  extends HTMLAttributes<HTMLDivElement>,
    AppBarClassNameOptions {
  /** @defaultValue `fixed ? "header" : "div"` */
  as?: CustomAppBarComponent;
}

/**
 * @example
 * Simple Example
 * ```tsx
 * import { AppBar, AppBarTitle } from "@react-md/app-bar";
 * import { Button } from "@react-md/core";
 * import MenuIcon from "@react-md/material-icons/MenuIcon";
 * import MoreVertIcon from "@react-md/material-icons/MoreVertIcon";
 * import type { ReactElement } from "react";
 *
 * function Example(): ReactElement {
 *   return (
 *     <AppBar>
 *       <Button aria-label="Navigation"><MenuIcon /></Button>
 *       <AppBarTitle>My Main Title</AppBarTitle>
 *       <Button aria-label="Options"><MoreVertIcon /></Button>
 *     </AppBar>
 *   );
 * }
 * ```
 *
 * @remarks \@since 6.0.0 The `AppBar` was updated to use `gap` for spacing
 * instead of requiring the `AppBarNav` and `AppBarAction` components.
 */
export const AppBar = forwardRef<HTMLDivElement, AppBarProps>(function AppBar(
  props,
  ref
) {
  const {
    className,
    height = "normal",
    theme = "primary",
    stacked = false,
    fixed = false,
    fixedPosition = "top",
    scrollbarOffset = false,
    disableFixedElevation = false,
    as: Component = fixed ? "header" : "div",
    children,
    ...remaining
  } = props;

  return (
    <Component
      {...remaining}
      className={appBar({
        theme,
        fixed,
        fixedPosition,
        disableFixedElevation,
        stacked,
        height,
        className,
        scrollbarOffset,
      })}
      ref={ref}
    >
      {children}
    </Component>
  );
});
