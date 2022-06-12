import { cnb } from "cnbuilder";
import type { CSSProperties } from "react";
import { bem } from "../bem";

const styles = bem("rmd-box");

type FlexCSSProperties = Pick<CSSProperties, "alignItems" | "justifyContent">;

export interface BoxOptions extends FlexCSSProperties {
  className?: string;

  grid?: boolean;

  /**
   * @defaultValue `false`
   */
  disableWrap?: boolean;

  /**
   * @defaultValue `false`
   */
  disablePadding?: boolean;

  /**
   * This is a grid configuration
   * This should match one of the names in the `$grids` map. So for example:
   *
   * ```scss
   * @use "react-md" with (
   *   $grids: (
   *     small: (
   *       min: 5rem
   *     ),
   *     medium: (
   *       min: 7rem,
   *       gap: 0.5rem,
   *       padding: 2rem,
   *     ),
   *   ),
   * );
   * ```
   *
   * The `gridName` should be `"small" | "medium"`.
   *
   * @defaultValue `""`
   */
  gridName?: string;

  /**
   * @defaultValue `""`
   */
  alignItems?: "start" | "center" | "end" | "stretch";
  /**
   * The default value is really `center` or whatever the `$default-align-items` is set to.
   * @defaultValue `""`
   */
  justifyContent?:
    | "start"
    | "center"
    | "end"
    | "stretch"
    | "space-around"
    | "space-between"
    | "space-evenly";

  column?: boolean;
}

export function box(options: BoxOptions = {}): string {
  const {
    grid = false,
    className,
    disableWrap = false,
    disablePadding = false,
    gridName = "",
    alignItems = "",
    justifyContent = "",
    column = false,
  } = options;

  return cnb(
    styles({
      wrap: !disableWrap,
      padded: !disablePadding,
      grid,
      [gridName]: grid && gridName,
      "align-start": alignItems === "start",
      "align-center": alignItems === "center",
      "align-end": alignItems === "end",
      "align-stretch": alignItems === "stretch",
      "justify-center": justifyContent === "center",
      "justify-start": justifyContent === "start",
      "justify-end": justifyContent === "end",
      "justify-stretch": justifyContent === "stretch",
      "justify-around": justifyContent === "space-around",
      "justify-between": justifyContent === "space-between",
      "justify-evenly": justifyContent === "space-evenly",
      column,
    }),
    className
  );
}
