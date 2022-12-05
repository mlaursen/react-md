import { cnb } from "cnbuilder";
import { bem } from "../bem";

const styles = bem("rmd-box");

export type BoxAlignItems =
  | "start"
  | "flex-start"
  | "center"
  | "end"
  | "flex-end"
  | "stretch";

export type BoxJustifyContent =
  | BoxAlignItems
  | "space-around"
  | "space-between"
  | "space-evenly";

export type BoxFlexDirection = "row" | "column";

export interface BoxOptions {
  className?: string;

  /**
   * @defaultValue `false`
   */
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
   * @defaultValue `"fit"`
   */
  gridColumns?: "fit" | "fill" | number;

  /**
   * @defaultValue `""`
   */
  align?: BoxAlignItems;

  /**
   * The default value is really `center` or whatever the `$default-align-items` is set to.
   * @defaultValue `""`
   */
  justify?: BoxJustifyContent;

  /** @defaultValue `false` */
  stacked?: boolean;

  /** @defaultValue `false` */
  reversed?: boolean;
}

export function box(options: BoxOptions = {}): string {
  const {
    grid = false,
    className,
    disableWrap = false,
    disablePadding = false,
    stacked = false,
    gridName = "",
    gridColumns = "fit",
    align = "",
    justify = "",
    reversed,
  } = options;

  return cnb(
    styles({
      wrap: !disableWrap,
      padded: !disablePadding,
      column: stacked && !reversed,
      reverse: !stacked && reversed,
      "column-reverse": stacked && reversed,
      grid,
      "grid-fill": gridColumns === "fill",
      "grid-columns": typeof gridColumns === "number",
      [gridName]: grid && gridName,
      "align-start": align === "start" || align === "flex-start",
      "align-center": align === "center",
      "align-end": align === "end" || align === "flex-end",
      "align-stretch": align === "stretch",
      "justify-center": justify === "center",
      "justify-start": justify === "start" || justify === "flex-start",
      "justify-end": justify === "end" || justify === "flex-end",
      "justify-stretch": justify === "stretch",
      "justify-around": justify === "space-around",
      "justify-between": justify === "space-between",
      "justify-evenly": justify === "space-evenly",
    }),
    className
  );
}
