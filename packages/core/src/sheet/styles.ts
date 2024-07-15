import { cnb } from "cnbuilder";
import {
  type CSSTransitionClassNames,
  type TransitionTimeout,
} from "../transition/types.js";
import { bem } from "../utils/bem.js";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { type BaseDialogProps } from "../dialog/Dialog.js";

declare module "react" {
  interface CSSProperties {
    "--rmd-sheet-height"?: string | number;
    "--rmd-sheet-width"?: string | number;
    "--rmd-sheet-max-height"?: string | number;
    "--rmd-sheet-touch-width"?: string | number;
    "--rmd-sheet-touch-max-height"?: string | number;
    "--rmd-sheet-static-width"?: string | number;
    "--rmd-sheet-transform-offscreen"?: string | number;
    "--rmd-sheet-z-index"?: number;
  }
}

export const DEFAULT_SHEET_TIMEOUT: Readonly<TransitionTimeout> = {
  enter: 200,
  exit: 150,
};

export const DEFAULT_SHEET_CLASSNAMES: Readonly<CSSTransitionClassNames> = {
  appear: "rmd-sheet--offscreen",
  appearActive: "rmd-sheet--enter rmd-sheet--visible",
  enter: "rmd-sheet--offscreen",
  enterActive: "rmd-sheet--enter rmd-sheet--visible",
  exit: "rmd-sheet--exit",
  exitActive: "rmd-sheet--offscreen",
  exitDone: "rmd-sheet--offscreen rmd-sheet--hidden",
};

const styles = bem("rmd-sheet");

/**
 * The location that the sheet should be located within the viewport.
 */
export type SheetPosition = "top" | "right" | "bottom" | "left";

/**
 * The size to use for sheets that have been positioned left or right. The
 * default supported values are:
 *
 * - `"none"` - the size is based on content, but is still limited to the
 *   viewport width so that the horizontal scrolling will not occur within the
 *   page. No limits added to sizing.
 * - `"touch"` - the `width` is set to be the entire viewport width minus a
 *   touchable area and is normally recommended for mobile devices.
 * - `"static"` - the `width` is set to a static `16rem` and generally used for
 *   landscape tablets and desktops.
 * - `"media"` - automatically switches between "touch" and "static" based on
 *   css media queries. (this is the default)
 */
export type SheetHorizontalSize = "none" | "media" | "touch" | "static";

/**
 * The size to use for sheets that have been positioned top or bottom. The
 * supported sizes are:
 *
 * - `"none"` - the size is based on content and is limited to the viewport
 *   height
 * - `"touch"` - the size is based on content and is limited to the viewport
 *   height minus a small touchable area
 * - `"recommended"` - the material design recommended sizing that forces a
 *   `max-height` of 50vh and `min-height` of 3.5rem
 */
export type SheetVerticalSize = "none" | "touch" | "recommended";

/** @since 6.0.0 */
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
 * @since 6.0.0
 * @internal
 */
export interface SheetClassNameOptions extends BaseSheetClassNameOptions {
  /**
   * Set this to `true` if the sheet is rendered, but not visible.
   *
   * This isn't actually used since it is hard coded in {@link DEFAULT_SHEET_CLASSNAMES}.
   *
   * @defaultValue `false`
   */
  offscreen?: boolean;

  /**
   * Set this to `true` to disable the overlay behind the sheet and any
   * additional box-shadow that would be applied to the sheet.
   *
   * @see {@link BaseDialogProps.disableOverlay}
   * @defaultValue `false`
   */
  disableOverlay?: boolean;
}

/** @since 6.0.0 */
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
      "media-width": horizontal && horizontalSize === "media",
      "touch-width": horizontal && horizontalSize === "touch",
      "static-width": horizontal && horizontalSize === "static",
      "viewport-height": !horizontal && verticalSize === "none",
      "touchable-height": !horizontal && verticalSize === "touch",
      "recommended-height": !horizontal && verticalSize === "recommended",
    }),
    className
  );
}
