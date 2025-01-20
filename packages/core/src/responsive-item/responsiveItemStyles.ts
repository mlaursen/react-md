import { cnb } from "cnbuilder";

import { bem } from "../utils/bem.js";

const styles = bem("rmd-responsive-item");

/** @since 6.0.0 */
export interface ResponsiveItemClassNameOptions {
  className?: string;

  /**
   * Set this to `true` if the container should gain the following styles:
   *
   * ```scss
   * display: block;
   * width: 100%;
   * ```
   *
   * @defaultValue `false`
   */
  fullWidth?: boolean;

  /**
   * Set this to a custom aspect ratio to use.
   *
   * @example Valid Aspect Ratios
   * ```tsx
   * aspectRatio="16-9"
   * aspectRatio="9-16"
   * aspectRatio="3-4"
   * aspectRatio="4-3"
   * aspectRatio="1-1"
   * ```
   *
   * These values are based on the `core.$responsive-item-aspect-ratios` map.
   *
   * @defaultValue `""`
   */
  aspectRatio?: `${number}-${number}`;

  /**
   * Set this to `"manual"` if you want to manually specify which elements are
   * responsive items using custom class names. You probably don't really want
   * to use this.
   *
   * Set this to `"auto"` to automatically update all visual media that appear
   * as a child in this component to a responsive item.
   *
   * Set this to `"container"` to automatically update all visual media that
   * appear as a child in this component to be a responsive item that scales to
   * the container's dimensions.
   *
   * Note: The `"auto"` and `"container"` values use the
   * `core.$responsive-item-selectors` value for their behavior.
   *
   * @defaultValue `"auto"`
   */
  responsive?: "auto" | "manual" | "container";
}

/** @since 6.0.0 */
export function responsiveItem(
  options: ResponsiveItemClassNameOptions = {}
): string {
  const {
    className,
    fullWidth = false,
    aspectRatio = "",
    responsive = "auto",
  } = options;

  return cnb(
    styles({
      auto: responsive !== "manual",
      "auto-scale": responsive === "container",
      "aspect-ratio": aspectRatio,
      [aspectRatio]: aspectRatio,
      "full-width": fullWidth,
    }),
    className
  );
}
