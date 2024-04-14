import { cnb } from "cnbuilder";
import { forwardRef, type HTMLAttributes } from "react";
import { bem } from "../utils/bem.js";

const styles = bem("rmd-responsive-item-container");

/** @since 6.0.0 */
export interface ResponsiveItemContainerClassNameOptions {
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
   * @example
   * Valid Aspect Ratios
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
export function responsiveItemContainer(
  options: ResponsiveItemContainerClassNameOptions = {}
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

/**
 * @since 6.0.0 Renamed from `MediaContainerProps` to
 * `ResponsiveItemContainerProps`
 * @since 6.0.0 The `height` and `width` props were removed in favor of the
 * `aspectRatio` props since the latest typescript string interpolation supports
 * enforcing the correct format.
 * @since 6.0.0 The `auto` prop was removed in favor of the new
 * {@link ResponsiveItemContainerProps.responsive} prop.
 */
export interface ResponsiveItemContainerProps
  extends HTMLAttributes<HTMLSpanElement>,
    ResponsiveItemContainerClassNameOptions {}

/**
 * **Server Component**
 *
 * @example
 * Image Example
 * ```tsx
 * import { ResponsiveItemContainer } from "@react-md/core";
 * import type { ReactElement } from "react";
 *
 * function Example(): ReactElement {
 *   return (
 *     <ResponsiveItemContainer>
 *       <img alt="" src="/some-image.png" />
 *     </ResponsiveItemContainer>
 *   );
 * }
 * ```
 *
 * @example
 * Iframe Example
 * ```tsx
 * import { ResponsiveItemContainer } from "@react-md/core";
 * import type { ReactElement } from "react";
 *
 * function Example(): ReactElement {
 *   return (
 *     <ResponsiveItemContainer>
 *       <iframe
 *         src="https://youtube.com/some-video-url"
 *         title="Some YouTube video"
 *         allowFullScreen
 *       />
 *     </ResponsiveItemContainer>
 *   );
 * }
 * ```
 *
 * @example
 * Forced Aspect Ratio
 * ```tsx
 * import { ResponsiveItemContainer } from "@react-md/core";
 * import type { ReactElement } from "react";
 *
 * function Example(): ReactElement {
 *   return (
 *     <ResponsiveItemContainer aspectRatio="16-9">
 *       <img alt="" src="/some-image.png" />
 *     </ResponsiveItemContainer>
 *   );
 * }
 * ```
 *
 * @since 6.0.0 Renamed from `MediaContainer` to
 * `ResponsiveItemContainer` and renders a `<span>` instead of a `<div>`.
 */
export const ResponsiveItemContainer = forwardRef<
  HTMLSpanElement,
  ResponsiveItemContainerProps
>(function ResponsiveItemContainer(props, ref) {
  const {
    className,
    fullWidth = false,
    aspectRatio,
    responsive = "auto",
    children,
    ...remaining
  } = props;

  return (
    <span
      {...remaining}
      ref={ref}
      className={responsiveItemContainer({
        className,
        fullWidth,
        aspectRatio,
        responsive,
      })}
    >
      {children}
    </span>
  );
});
