import { cnb } from "cnbuilder";
import { bem } from "../utils/bem.js";

const styles = bem("rmd-responsive-item-overlay");

/**
 * The overlay positions relative to the `MediaContainer` component.  Most of
 * the sizes are self-explanatory, but the `middle` position will be centered
 * vertically while `center` will be centered `horizontally`.
 *
 * @since 6.0.0 Renamed from `MediaOverlayPosition` to
 * `ResponsiveItemOverlayProps`.
 */
export type ResponsiveItemOverlayPosition =
  | "top"
  | "right"
  | "bottom"
  | "left"
  | "middle"
  | "center"
  | "absolute-center";

/** @since 6.0.0 */
export interface ResponsiveItemOverlayClassNameOptions {
  className?: string;
  /** @defaultValue `"bottom"` */
  position?: ResponsiveItemOverlayPosition;
}

/**
 * @since 6.0.0
 */
export function responsiveItemOverlay(
  options: ResponsiveItemOverlayClassNameOptions = {}
): string {
  const { className, position = "bottom" } = options;

  return cnb(
    styles({
      [position]: true,
      horizontal:
        position !== "top" && position !== "bottom" && position !== "middle",
    }),
    className
  );
}
