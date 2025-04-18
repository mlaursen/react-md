import { cnb } from "cnbuilder";

import { bem } from "../utils/bem.js";

const styles = bem("rmd-box");

declare module "react" {
  interface CSSProperties {
    "--rmd-box-gap"?: string | number;
    "--rmd-box-padding"?: string | number;
    "--rmd-box-item-min-size"?: string | number;
    "--rmd-box-columns"?: string | number;
  }
}

/**
 * @since 6.0.0
 */
export type BoxAlignItems =
  | "start"
  | "flex-start"
  | "center"
  | "end"
  | "flex-end"
  | "stretch";

/**
 * @since 6.0.0
 */
export type BoxJustifyContent =
  | BoxAlignItems
  | "space-around"
  | "space-between"
  | "space-evenly";

/**
 * @since 6.0.0
 */
export type BoxFlexDirection = "row" | "column";

/**
 * @since 6.0.0
 */
export interface BoxOptions {
  className?: string;

  /**
   * Set this to `true` to use `display: grid` instead of `display: flex`.
   *
   * @defaultValue `false`
   */
  grid?: boolean;

  /**
   * Set this to `true` to apply `width: 100%`. This can be useful when using
   * nested box layouts.
   *
   * @defaultValue `false`
   */
  fullWidth?: boolean;

  /**
   * Set this to `true` to prevent gap between items.
   *
   * @defaultValue `false`
   */
  disableGap?: boolean | "row" | "column";

  /**
   * Set this to `true` to set `flex-wrap: nowrap`.
   *
   * @defaultValue `false`
   */
  disableWrap?: boolean;

  /**
   * Set this to `true` to disable the default padding.
   *
   * @defaultValue `false`
   */
  disablePadding?: boolean;

  /**
   * This should match one of the names in the `$box-grids` map. So for example:
   *
   * ```scss
   * @use "react-md" with (
   *   $box-grids: (
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
   * Set this to `true` to enable equal height rows within the grid based
   * on the current `max-height`. This requires the `max-height` to be set
   * on the `Box` either by:
   *
   * - a custom class name that sets `max-height`
   * - `core.box-set-var(auto-rows-height, VALUE)` on the box or a parent element
   *
   * @defaultValue `false`
   */
  gridAutoRows?: boolean;

  /**
   * @defaultValue `""`
   */
  align?: BoxAlignItems;

  /**
   * The default value is really `center` or whatever the
   * `$box-default-align-items` is set to.
   *
   * @defaultValue `""`
   */
  justify?: BoxJustifyContent;

  /**
   * Set this to `true` to set `flex-direction: column` which will stack all
   * items in the box.
   *
   * @defaultValue `false`
   */
  stacked?: boolean;

  /**
   * Set this to `true` to reverse the `flex-direction`. i.e.
   * - `flex-direction: row-reverse`
   * - `flex-direction: column-reverse`
   *
   * @defaultValue `false`
   */
  reversed?: boolean;
}

/**
 * @since 6.0.0
 */
export function box(options: BoxOptions = {}): string {
  const {
    className,
    align = "",
    grid,
    gridName = "",
    gridColumns = "fit",
    gridAutoRows,
    justify = "",
    stacked,
    reversed,
    fullWidth,
    disableGap,
    disableWrap,
    disablePadding,
  } = options;

  return cnb(
    styles({
      gap: !disableGap,
      "gap-h": disableGap === "row",
      "gap-v": disableGap === "column",
      wrap: !disableWrap,
      padded: !disablePadding,
      column: stacked && !reversed,
      reverse: !stacked && reversed,
      "column-reverse": stacked && reversed,
      "full-width": fullWidth,
      grid,
      "grid-fill": grid && gridColumns === "fill",
      "grid-columns": grid && typeof gridColumns === "number",
      "grid-auto-rows": grid && gridAutoRows,
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
