import { bem } from "@react-md/core";
import { cnb } from "cnbuilder";

import type { HTMLAttributes } from "react";
import { forwardRef } from "react";

const styles = bem("rmd-visual-media-overlay");

/**
 * The overlay positions relative to the `MediaContainer` component.  Most of
 * the sizes are self-explanatory, but the `middle` position will be centered
 * vertically while `center` will be centered `horizontally`.
 *
 * @remarks \@since 6.0.0 Renamed from `MediaOverlayPosition` to
 * `VisualMediaOverlayProps`.
 */
export type VisualMediaOverlayPosition =
  | "top"
  | "right"
  | "bottom"
  | "left"
  | "middle"
  | "center"
  | "absolute-center";

/** @remarks \@since 6.0.0 */
export interface VisualMediaOverlayClassNameOptions {
  className?: string;
  /** @defaultValue `"bottom"` */
  position?: VisualMediaOverlayPosition;
}

/**
 * @remarks \@since 6.0.0
 */
export function visualMediaOverlay(
  options: VisualMediaOverlayClassNameOptions = {}
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

/**
 * @remarks \@since 6.0.0 Renamed from `MediaOverlayProps` to
 * `VisualMediaOverlayProps`.
 */
export interface VisualMediaOverlayProps
  extends HTMLAttributes<HTMLSpanElement>,
    VisualMediaOverlayClassNameOptions {}

/**
 * @example
 * Simple Example
 * ```tsx
 * import { VisualMediaContainer, VisualMediaOverlay } from "@react-md/visual-media";
 * import type { ReactElement } from "react";
 *
 * function Example(): ReactElement {
 *   return (
 *     <VisualMediaContainer>
 *       <img alt="" src="/some-image.png" />
 *       <VisualMediaOverlay>
 *         <Typography type="headline-5" margin="none">
 *           This appears at the bottom by default.
 *         </Typography>
 *       </VisualMediaOverlay>
 *     </VisualMediaContainer>
 *   );
 * }
 * ```
 *
 * @see {@link VisualMediaOverlayPosition}
 *
 * @remarks \@since 6.0.0 Renamed from `MediaOverlay` to `VisualMediaOverlay`
 * and renders as a `<span>` instead of a `<div>`.
 */
export const VisualMediaOverlay = forwardRef<
  HTMLSpanElement,
  VisualMediaOverlayProps
>(function VisualMediaOverlay(props, ref) {
  const { className, children, position = "bottom", ...remaining } = props;

  return (
    <span
      {...remaining}
      ref={ref}
      className={visualMediaOverlay({ className, position })}
    >
      {children}
    </span>
  );
});
