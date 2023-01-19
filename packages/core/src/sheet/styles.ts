import { cnb } from "cnbuilder";
import { bem } from "../utils";

const styles = bem("rmd-sheet");

/**
 * The location that the sheet should be located within the viewport.
 */
export type SheetPosition = "top" | "right" | "bottom" | "left";

/**
 * The size to use for sheets that have been positioned left or right. The
 * default supported values are:
 *
 * - none - the size is based on content, but is still limited to the viewport
 *   width so that the horizontal scrolling will not occur within the page. No
 *   limits added to sizing.
 * - touch - the `min-width` is set to be the entire viewport width minus a
 *   touchable area and `max-width` is set to `20rem` and is normally
 *   recommended for mobile devices.
 * - static - the width is set to a static `16rem` and generally used for
 *   landscape tablets and desktops.
 * - media - automatically switches between "touch" and "static" based on css
 *   media queries. (this is the default)
 */
export type SheetHorizontalSize = "none" | "media" | "touch" | "static";

/**
 * The size to use for sheets that have been positioned top or bottom. The
 * supported sizes are:
 *
 * - none - the size is based on content and is limited to the viewport
 *   height.
 * - touch - the size is based on content and is limited to the viewport
 *   height with a touchable area to close the sheet.
 * - recommended - the material design recommended sizing that forces a
 *   max-height of 50vh and min-height of 3.5rem
 */
export type SheetVerticalSize = "none" | "touch" | "recommended";

/** @remarks \@since 6.0.0 */
export interface BaseSheetClassNameOptions {
  className?: string;

  /**
   * @defaultValue `"left"`
   */
  position?: SheetPosition;

  /**
   * @defaultValue `"media"`
   */
  horizontalSize?: SheetHorizontalSize;

  /**
   * @defaultValue `"recommended"`
   */
  verticalSize?: SheetVerticalSize;
}

/**
 * @remarks \@since 6.0.0
 * @internal
 */
export interface SheetClassNameOptions extends BaseSheetClassNameOptions {
  offscreen?: boolean;
  disableOverlay?: boolean;
}

/** @remarks \@since 6.0.0 */
export function sheet(options: SheetClassNameOptions): string {
  const {
    position = "left",
    horizontalSize = "media",
    verticalSize = "recommended",
    offscreen = false,
    disableOverlay,
    className,
  } = options;
  const horizontal = position === "left" || position === "right";

  return cnb(
    styles({
      horizontal,
      vertical: !horizontal,
      raised: !disableOverlay,
      offscreen,
      [position]: true,
      [`${horizontalSize}-width`]: horizontal,
      "viewport-height": !horizontal && verticalSize === "none",
      "touchable-height": !horizontal && verticalSize === "touch",
      "recommended-height": !horizontal && verticalSize === "recommended",
    }),
    className
  );
}
