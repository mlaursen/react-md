import { cnb } from "cnbuilder";
import { bem } from "@react-md/core";

const styles = bem("rmd-app-bar");

export type AppBarPosition = "top" | "bottom";
export type AppBarTheme = "clear" | "primary" | "secondary" | "surface";
export type AppBarHeight =
  | "auto"
  | "normal"
  | "prominent"
  | "dense"
  | "prominent-dense";

export interface AppBarClassNameOptions {
  className?: string;

  /**
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
   * @defaultValue `false`
   */
  disableFixedElevation?: boolean;

  /**
   * The theme to apply to the `AppBar`.
   *
   * @defaultValue `"primary"`
   */
  theme?: AppBarTheme;

  /**
   * @defaultValue `"normal"`
   */
  height?: AppBarHeight;

  /**
   * @defaultValue `fixed`
   */
  scrollbarOffset?: boolean;
}

export function getAppBarClassName(
  options: AppBarClassNameOptions = {}
): string {
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
    }),
    className
  );
}

export interface AppBarTitleClassNameOptions {
  className?: string;
  /**
   * @defaultValue `"small"`
   */
  keyline?: "small" | "nav" | "title";
  noWrap?: boolean;
}

export function getAppBarTitleClassName(
  options: AppBarTitleClassNameOptions = {}
): string {
  const { className, keyline = "small", noWrap = false } = options;
  return cnb(
    styles("title", {
      keyline: keyline == "title",
      "nav-keyline": keyline === "nav",
      "no-wrap": noWrap,
    }),
    className
  );
}
