import { bem } from "@react-md/core";
import { cnb } from "cnbuilder";

const visualMediaStyles = bem("rmd-visual-media");
const visualMediaOverlayStyles = bem("rmd-visual-media-overlay");
const visualMediaContainerStyles = bem("rmd-visual-media-container");

/** @remarks \@since 6.0.0 */
export interface VisualMediaClassNameOptions {
  className?: string;

  /**
   * Set this to `true` to apply the following styles:
   * ```scss
   * max-height: 100%;
   * max-width: 100%;
   * object-fit: contain;
   * ```
   *
   * This is useful for displaying images in a full page dialog so that scroll
   * bars do not appear while maintaining the correct aspect ratio for the item.
   *
   * @defaultValue `false`
   */
  scaleToContainer?: boolean;

  /**
   * Set this to `true` to force a specific aspect ratio.
   *
   * Note: This will only work if the parent element has applied the correct
   * {@link visualMediaContainerStyles} as well.
   *
   * @defaultValue `false`
   */
  forcedAspectRatio?: boolean;
}

/** @remarks \@since 6.0.0 */
export function visualMedia(options: VisualMediaClassNameOptions = {}): string {
  const {
    className,
    scaleToContainer = false,
    forcedAspectRatio = false,
  } = options;

  return cnb(
    visualMediaStyles({
      scale: scaleToContainer,
      "aspect-ratio": forcedAspectRatio,
    }),
    className
  );
}

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
    visualMediaContainerStyles({
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
 * The overlay positions relative to the `MediaContainer` component.  Most of
 * the sizes are self-explanatory, but the `middle` position will be centered
 * vertically while `center` will be centered `horizontally`.
 */
export type MediaOverlayPosition =
  | "top"
  | "right"
  | "bottom"
  | "left"
  | "middle"
  | "center"
  | "absolute-center";

export interface VisualMediaOverlayClassNameOptions {
  className?: string;
  /** @defaultValue `"bottom"` */
  position?: MediaOverlayPosition;
}

export function visualMediaOverlay(
  options: VisualMediaOverlayClassNameOptions = {}
): string {
  const { className, position = "bottom" } = options;

  return cnb(
    visualMediaOverlayStyles({
      [position]: true,
      horizontal:
        position !== "top" && position !== "bottom" && position !== "middle",
    }),
    className
  );
}
