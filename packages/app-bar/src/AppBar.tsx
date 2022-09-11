import { bem } from "@react-md/core";
import { cnb } from "cnbuilder";
import type { ElementType, HTMLAttributes, Ref } from "react";
import { forwardRef } from "react";
import type { AppBarHeight, AppBarPosition, AppBarTheme } from "./types";

const styles = bem("rmd-app-bar");

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

export interface AppBarProps
  extends HTMLAttributes<HTMLDivElement>,
    AppBarClassNameOptions {
  /** @defaultValue `"header"` */
  as?: CustomAppBarComponent;
}

export const AppBar = forwardRef<HTMLDivElement, AppBarProps>(function AppBar(
  props,
  ref
) {
  const {
    as: Component = "header",
    className,
    height = "normal",
    theme = "primary",
    stacked = false,
    fixed = false,
    fixedPosition = "top",
    scrollbarOffset = false,
    disableFixedElevation = false,
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
