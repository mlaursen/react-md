import { cnb } from "cnbuilder";
import { type CSSProperties } from "react";

import { type DefinedCSSVariableName } from "../theme/types.js";
import { bem } from "../utils/bem.js";

const styles = bem("rmd-box");

declare module "react" {
  interface CSSProperties {
    "--rmd-box-gap"?: string | number;
    "--rmd-box-padding"?: string | number;
    "--rmd-box-item-min-size"?: string | number;
    "--rmd-box-columns"?: string | number;
    "--rmd-box-phone-columns"?: number | string;
    "--rmd-box-phone-item-min-size"?: number | string;
    "--rmd-box-tablet-columns"?: number | string;
    "--rmd-box-tablet-item-min-size"?: number | string;
    "--rmd-box-desktop-columns"?: number | string;
    "--rmd-box-desktop-item-min-size"?: number | string;
    "--rmd-box-large-desktop-columns"?: number | string;
    "--rmd-box-large-desktop-item-min-size"?: number | string;
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
export type BoxGridColumns = "fit" | "fill" | number;

/**
 * @since 6.0.0
 */
export type BoxBreakpoints = "phone" | "tablet" | "desktop" | "largeDesktop";

/**
 * @since 6.0.0
 */
export type BoxGridBreakpointColumns = {
  [key in BoxBreakpoints]?: BoxGridColumns;
};

/**
 * @since 6.0.0
 */
export type BoxGridBreakpointItemSize = {
  [key in BoxBreakpoints]?: string;
};

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
   * The default behavior for a grid is to automatically determine the number
   * of columns to render by placing as many items as possible with a specific
   * item min-width and the defined gap between items. Once the number of
   * columns has been determined, place the items in the grid and expand to the
   * full column width.
   *
   * This prop is a convenience prop to control how to display items when there
   * are not enough to span all columns without a separate SCSS file.
   *
   * i.e. 3 items were provided but 4 can be rendered.
   *
   * - `"fit"` - fill the entire width with columns and stretch columns to fill
   *   the remaining space
   * - `"fill"` - fill the entire width with columns and add empty columns to
   *   fill the remaining space
   * - `number` - ignore the auto layout behavior and specify the number of
   *   columns to use instead.
   *
   * If additional responsive behavior is required, an object can be provided
   * to define the column behavior for: phone, tablet, desktop, or
   * largeDesktop.
   *
   * @see {@link gridItemSize} for how the number of columns are determined.
   * @defaultValue `"fit"`
   */
  gridColumns?: BoxGridColumns | BoxGridBreakpointColumns;

  /**
   * This prop can be used to override the default `--rmd-box-item-min-size`
   * for the grid without a separate SCSS file. Since this is set as a CSS variable,
   * the value must be a number with a unit to work correctly. i.e. `10rem`
   * instead of `160`.
   *
   * If additional responsive behavior is required, an object can be provided
   * to define the column behavior for: phone, tablet, desktop, or
   * largeDesktop.
   *
   * @see {@link https://react-md.dev/sassdoc/box#variables-box-item-min-size}
   */
  gridItemSize?: string | BoxGridBreakpointItemSize;

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
 * @see {@link boxStyles}
 * @since 6.0.0
 */
export function box(options: BoxOptions = {}): string {
  const {
    className,
    align = "",
    grid,
    gridName = "",
    gridColumns = "fit",
    gridItemSize,
    gridAutoRows,
    justify = "",
    stacked,
    reversed,
    fullWidth,
    disableGap,
    disableWrap,
    disablePadding,
  } = options;
  let phoneColumns: BoxGridColumns | undefined;
  let phoneItemSize: string | number | undefined;
  let tabletColumns: BoxGridColumns | undefined;
  let tabletItemSize: string | number | undefined;
  let desktopColumns: BoxGridColumns | undefined;
  let desktopItemSize: string | number | undefined;
  let largeDesktopColumns: BoxGridColumns | undefined;
  let largeDesktopItemSize: string | number | undefined;
  if (gridColumns && typeof gridColumns === "object") {
    ({
      phone: phoneColumns,
      tablet: tabletColumns,
      desktop: desktopColumns,
      largeDesktop: largeDesktopColumns,
    } = gridColumns);
  }
  if (gridItemSize && typeof gridItemSize === "object") {
    ({
      phone: phoneItemSize,
      tablet: tabletItemSize,
      desktop: desktopItemSize,
      largeDesktop: largeDesktopItemSize,
    } = gridItemSize);
  }

  const isItemSizeEnabled = (
    value: string | number | undefined
  ): boolean | undefined => grid && (!!value || value === 0);
  const isColumnsEnabled = (
    value: BoxGridColumns | BoxGridBreakpointColumns | undefined
  ): boolean | undefined => grid && typeof value === "number";

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
      "grid-size": isColumnsEnabled(gridColumns),
      "grid-phone": grid && (phoneColumns || phoneItemSize),
      "grid-phone-size":
        isColumnsEnabled(phoneColumns) || isItemSizeEnabled(phoneItemSize),
      "grid-tablet": grid && (tabletColumns || tabletItemSize),
      "grid-tablet-size":
        isColumnsEnabled(tabletColumns) || isItemSizeEnabled(tabletItemSize),
      "grid-desktop": grid && (desktopColumns || desktopItemSize),
      "grid-desktop-size":
        isColumnsEnabled(desktopColumns) || isItemSizeEnabled(desktopItemSize),
      "grid-large-desktop":
        grid && (largeDesktopColumns || largeDesktopItemSize),
      "grid-large-desktop-size":
        isColumnsEnabled(largeDesktopColumns) ||
        isItemSizeEnabled(largeDesktopItemSize),
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

/**
 * @since 6.0.0
 * @internal
 */
interface ApplyOptions {
  media: keyof BoxGridBreakpointColumns | "";
  style: CSSProperties | undefined;
  type: "columns" | "size";
  value:
    | BoxGridColumns
    | BoxGridBreakpointColumns
    | string
    | BoxGridBreakpointItemSize
    | undefined;
}

/**
 * @since 6.0.0
 * @internal
 */
function applyBoxVar(options: ApplyOptions): CSSProperties | undefined {
  const { type, media, style, value } = options;
  const expectedType = type === "columns" ? "number" : "string";
  if (typeof value !== expectedType) {
    return style;
  }

  const suffix = type === "columns" ? type : "item-min-size";
  let varName: DefinedCSSVariableName = `--rmd-box-${suffix}`;
  if (media === "largeDesktop") {
    varName = `--rmd-box-large-desktop-${suffix}`;
  } else if (media) {
    varName = `--rmd-box-${media}-${suffix}`;
  }

  return {
    ...style,
    [varName]: value,
  };
}

/**
 * @since 6.0.0
 * @internal
 */
const BREAKPOINTS = ["phone", "tablet", "desktop", "largeDesktop"] as const;

/**
 * @since 6.0.0
 * @internal
 */
function applyBoxVarGroup(
  options: Pick<ApplyOptions, "value" | "style" | "type">
): CSSProperties | undefined {
  const { style: propStyle, value, type } = options;
  let style = applyBoxVar({
    type,
    style: propStyle,
    media: "",
    value,
  });
  if (value && typeof value === "object") {
    BREAKPOINTS.forEach((media) => {
      style = applyBoxVar({
        type,
        style,
        media,
        value: value[media],
      });
    });
  }
  return style;
}

/**
 * @since 6.0.0
 */
export interface BoxStyles {
  style?: CSSProperties;
  className: string;
}

/**
 * @since 6.0.0
 */
export interface BoxStylesOptions extends BoxOptions {
  style?: CSSProperties;
}

/**
 * @see {@link box}
 * @since 6.0.0
 */
export function boxStyles(options: BoxStylesOptions): BoxStyles {
  const { style: propStyle, gridColumns, gridItemSize } = options;
  let style = applyBoxVarGroup({
    type: "columns",
    style: propStyle,
    value: gridColumns,
  });
  style = applyBoxVarGroup({
    type: "size",
    style,
    value: gridItemSize,
  });

  return {
    style,
    className: box(options),
  };
}
