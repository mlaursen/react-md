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
  gridAutoType?: "fit" | "fill";

  /**
   * @defaultValue `""`
   */
  alignItems?: BoxAlignItems;

  /**
   * The default value is really `center` or whatever the `$default-align-items` is set to.
   * @defaultValue `""`
   */
  justifyContent?: BoxJustifyContent;

  /** @defaultValue `"row"` */
  flexDirection?: BoxFlexDirection;
}

export function box(options: BoxOptions = {}): string {
  const {
    grid = false,
    className,
    disableWrap = false,
    disablePadding = false,
    gridName = "",
    gridAutoType = "fit",
    alignItems = "",
    justifyContent = "",
    flexDirection = "row",
  } = options;

  return cnb(
    styles({
      wrap: !disableWrap,
      padded: !disablePadding,
      "flex-column": flexDirection === "column",
      grid,
      "grid-fill": gridAutoType === "fill",
      [gridName]: grid && gridName,
      "align-start": alignItems === "start" || alignItems === "flex-start",
      "align-center": alignItems === "center",
      "align-end": alignItems === "end" || alignItems === "flex-end",
      "align-stretch": alignItems === "stretch",
      "justify-center": justifyContent === "center",
      "justify-start":
        justifyContent === "start" || justifyContent === "flex-start",
      "justify-end": justifyContent === "end" || justifyContent === "flex-end",
      "justify-stretch": justifyContent === "stretch",
      "justify-around": justifyContent === "space-around",
      "justify-between": justifyContent === "space-between",
      "justify-evenly": justifyContent === "space-evenly",
    }),
    className
  );
}
