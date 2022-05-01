import type { HTMLAttributes } from "react";
import { forwardRef } from "react";
import cn from "classnames";

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

export interface MediaOverlayProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * The position of the overlay within the `MediaContainer`.
   */
  position?: MediaOverlayPosition;
}

/**
 * The `MediaOverlay` component is used to create an overlay over specific media
 * items within the `MediaContainer` component. You will need to apply most of
 * your own styles as this is really just used for positioning.
 */
export const MediaOverlay = forwardRef<HTMLDivElement, MediaOverlayProps>(
  function MediaOverlay(
    { className, children, position = "bottom", ...props },
    ref
  ) {
    return (
      <div
        {...props}
        ref={ref}
        className={cn(
          `rmd-media-overlay rmd-media-overlay--${position}`,
          className
        )}
      >
        {children}
      </div>
    );
  }
);
