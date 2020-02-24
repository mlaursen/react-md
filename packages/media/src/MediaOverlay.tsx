import React, { forwardRef, HTMLAttributes, ReactElement, Ref } from "react";
import { cnb } from "cnbuilder";

/**
 * The overlay positions relative to the `MediaContainer` component.  Most of
 * the sizes are self-explanitory, but the `middle` position will be centered
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
function MediaOverlay(
  { className, children, position = "bottom", ...props }: MediaOverlayProps,
  ref?: Ref<HTMLDivElement>
): ReactElement {
  return (
    <div
      {...props}
      ref={ref}
      className={cnb(
        `rmd-media-overlay rmd-media-overlay--${position}`,
        className
      )}
    >
      {children}
    </div>
  );
}

const ForwardedMediaOverlay = forwardRef<HTMLDivElement, MediaOverlayProps>(
  MediaOverlay
);

if (process.env.NODE_ENV !== "production") {
  try {
    const PropTypes = require("prop-types");
    ForwardedMediaOverlay.propTypes = {
      className: PropTypes.string,
      position: PropTypes.oneOf([
        "top",
        "right",
        "bottom",
        "left",
        "center",
        "middle",
        "absolute-center",
      ]),
    };
  } catch (e) {}
}

export default ForwardedMediaOverlay;
