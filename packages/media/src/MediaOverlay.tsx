import React, { FunctionComponent, HTMLAttributes, forwardRef } from "react";
import cn from "classnames";
import { IWithForwardedRef } from "@react-md/utils";

/**
 * The overlay positions relative to the `MediaContainer` component.
 * Most of the sizes are self-explanitory, but the `middle` position
 * will be centered vertically while `center` will be centered `horizontally`.
 */
export type MediaOverlayPosition =
  | "top"
  | "right"
  | "bottom"
  | "left"
  | "middle"
  | "center"
  | "absolute-center";

export interface IMediaOverlayProps
  extends HTMLAttributes<HTMLDivElement>,
    IWithForwardedRef<HTMLDivElement> {
  /**
   * The position of the overlay within the `MediaContainer`.
   */
  position?: MediaOverlayPosition;
}

interface IMediaOverlayDefaultProps {
  position: MediaOverlayPosition;
}

type WithDefaultProps = IMediaOverlayProps & IMediaOverlayDefaultProps;

/**
 * The `MediaOverlay` component is used to create an overlay over specific media
 * items within the `MediaContainer` component. You will need to apply most of
 * your own styles as this is really just used for positioning.
 */
const MediaOverlay: FunctionComponent<IMediaOverlayProps> = providedProps => {
  const {
    className,
    children,
    position,
    forwardedRef,
    ...props
  } = providedProps as WithDefaultProps;

  return (
    <div
      {...props}
      ref={forwardedRef}
      className={cn(`rmd-media-overlay rmd-media-overlay--${position}`)}
    >
      {children}
    </div>
  );
};

const defaultProps: IMediaOverlayDefaultProps = {
  position: "bottom",
};

MediaOverlay.defaultProps = defaultProps;

if (process.env.NODE_ENV !== "production") {
  MediaOverlay.displayName = "MediaOverlay";

  let PropTypes = null;
  try {
    PropTypes = require("prop-types");
  } catch (e) {}

  if (PropTypes) {
    MediaOverlay.propTypes = {
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
  }
}

export default forwardRef<HTMLDivElement, IMediaOverlayProps>((props, ref) => (
  <MediaOverlay {...props} forwardedRef={ref} />
));
