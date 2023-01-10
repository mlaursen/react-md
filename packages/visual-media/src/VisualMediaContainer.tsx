import { bem } from "@react-md/core";
import { cnb } from "cnbuilder";
import type { HTMLAttributes } from "react";
import { forwardRef } from "react";

const styles = bem("rmd-visual-media-container");

/** @remarks \@since 6.0.0 */
export interface VisualMediaContainerClassNameOptions {
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
   * These values are based on the `visual-media.$aspect-ratios` map.
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
   * `visual-media.$selectors` value for their behavior.
   *
   * @defaultValue `"auto"`
   */
  responsive?: "auto" | "manual" | "container";
}

/** @remarks \@since 6.0.0 */
export function visualMediaContainer(
  options: VisualMediaContainerClassNameOptions = {}
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
 * @remarks
 * \@since 6.0.0 Renamed from `MediaContainerProps` to
 * `VisualMediaContainerProps`
 * \@since 6.0.0 The `height` and `width` props were removed in favor of the
 * `aspectRatio` props since the latest typescript string interpolation supports
 * enforcing the correct format.
 * \@since 6.0.0 The `auto` prop was removed in favor of the new
 * {@link VisualMediaContainerProps.responsive} prop.
 */
export interface VisualMediaContainerProps
  extends HTMLAttributes<HTMLSpanElement>,
    VisualMediaContainerClassNameOptions {}

/**
 * @example
 * Image Example
 * ```tsx
 * import { VisualMediaContainer } from "@react-md/visual-media";
 * import type { ReactElement } from "react";
 *
 * function Example(): ReactElement {
 *   return (
 *     <VisualMediaContainer>
 *       <img alt="" src="/some-image.png" />
 *     </VisualMediaContainer>
 *   );
 * }
 * ```
 *
 * @example
 * Iframe Example
 * ```tsx
 * import { VisualMediaContainer } from "@react-md/visual-media";
 * import type { ReactElement } from "react";
 *
 * function Example(): ReactElement {
 *   return (
 *     <VisualMediaContainer>
 *       <iframe
 *         src="https://youtube.com/some-video-url"
 *         title="Some YouTube video"
 *         allowFullScreen
 *       />
 *     </VisualMediaContainer>
 *   );
 * }
 * ```
 *
 * @example
 * Forced Aspect Ratio
 * ```tsx
 * import { VisualMediaContainer } from "@react-md/visual-media";
 * import type { ReactElement } from "react";
 *
 * function Example(): ReactElement {
 *   return (
 *     <VisualMediaContainer aspectRatio="16-9">
 *       <img alt="" src="/some-image.png" />
 *     </VisualMediaContainer>
 *   );
 * }
 * ```
 *
 * @remarks \@since 6.0.0 Renamed from `MediaContainer` to
 * `VisualMediaContainer` and renders a `<span>` instead of a `<div>`.
 */
export const VisualMediaContainer = forwardRef<
  HTMLSpanElement,
  VisualMediaContainerProps
>(function VisualMediaContainer(props, ref) {
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
      className={visualMediaContainer({
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
