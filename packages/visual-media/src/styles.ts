import { bem } from "@react-md/core";
import { cnb } from "cnbuilder";

const visualMediaStyles = bem("rmd-visual-media");
const visualMediaOverlayStyles = bem("rmd-visual-media-overlay");
const visualMediaContainerStyles = bem("rmd-visual-media-container");

export interface VisualMediaClassNameOptions {
  className?: string;
  forcedAspectRatio?: boolean;
}

export function visualMedia(options: VisualMediaClassNameOptions = {}): string {
  const { className, forcedAspectRatio = false } = options;

  return cnb(
    visualMediaStyles({ "aspect-ratio": forcedAspectRatio }),
    className
  );
}

export interface VisualMediaContainerClassNameOptions {
  className?: string;
  fullWidth?: boolean;
  aspectRatio?: `${number}-${number}`;
  disableAuto?: boolean;
}

export function visualMediaContainer(
  options: VisualMediaContainerClassNameOptions = {}
): string {
  const {
    className,
    fullWidth = false,
    aspectRatio = "",
    disableAuto = false,
  } = options;

  return cnb(
    visualMediaContainerStyles({
      auto: !disableAuto,
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
