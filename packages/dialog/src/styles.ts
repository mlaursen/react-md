import { bem } from "@react-md/core";
import { cnb } from "cnbuilder";

const dialogStyles = bem("rmd-dialog");
const sheetStyles = bem("rmd-sheet");

export interface MergeableClassName {
  className?: string;
}

export interface DialogClassNameOptions extends MergeableClassName {
  /**
   * @defaultValue `"centered"`
   */
  type?: "full-page" | "centered" | "custom";
}

export function dialog(options: DialogClassNameOptions): string {
  const { type = "centered", className } = options;

  return cnb(
    dialogStyles({
      centered: type === "centered",
      "full-page": type === "full-page",
    }),
    className
  );
}

export function dialogHeader(options: MergeableClassName): string {
  const { className } = options;

  return cnb(dialogStyles("header"), className);
}

export interface DialogContentCLassNameOptions extends MergeableClassName {
  /** @defaultValue `false` */
  disablePadding?: boolean;
}

export function dialogContent(options: DialogContentCLassNameOptions): string {
  const { className, disablePadding = false } = options;

  return cnb(dialogStyles("content", { padded: !disablePadding }), className);
}

/**
 * An optional alignment for the content within the footer. Since the majority
 * of dialog footers are used to contain action buttons, the default alignment
 * is near the end.
 *
 * @remarks \@since 3.1.0
 */
export type DialogFooterAlignment =
  | "none"
  | "start"
  | "end"
  | "between"
  | "stacked-start"
  | "stacked-end";

export interface DialogFooterClassNameOptions extends MergeableClassName {
  /** @defaultValue `"end"` */
  align?: DialogFooterAlignment;
}

export function dialogFooter(options: DialogFooterClassNameOptions): string {
  const { align = "end", className } = options;

  return cnb(
    dialogStyles("footer", {
      flex: align !== "none",
      "flex-v": align === "stacked-start" || align === "stacked-end",
      start: align === "start" || align === "stacked-start",
      between: align === "between",
      end: align === "end" || align === "stacked-end",
    }),
    className
  );
}

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

export interface BaseSheetClassNameOptions extends MergeableClassName {
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
    sheetStyles({
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
