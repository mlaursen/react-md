import React, { forwardRef, HTMLAttributes, ReactElement, Ref } from "react";
import { cnb } from "cnbuilder";
import { bem } from "@react-md/utils";

export interface MediaContainerProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * An optional aspect ratio height to enforce. This **must** be used alongside
   * the `width` prop.
   */
  height?: number;

  /**
   * An optional aspect ratio width to enforce. This **must** be used alongside
   * the `height` prop.
   */
  width?: number;

  /**
   * Boolean if any media element children should be updated to be responsive.
   */
  auto?: boolean;

  /**
   * Boolean if the media container should have a `width: 100%;` applied.
   */
  fullWidth?: boolean;
}

export interface MediaContainerWithAspectRatioProps
  extends MediaContainerProps {
  height: number;
  width: number;
}

const block = bem("rmd-media-container");

/**
 * The `MediaContainer` component is used to make responsive images and videos
 * within your app. This component also allows for focing a specific aspect
 * ratio for these elements with both the `height` and `width` props are
 * provided.
 */
function MediaContainer(
  {
    className,
    height,
    width,
    children,
    auto = true,
    fullWidth = false,
    ...props
  }: MediaContainerProps | MediaContainerWithAspectRatioProps,
  ref?: Ref<HTMLDivElement>
): ReactElement {
  const aspectRatio =
    height && width ? `rmd-media-container--${width}-${height}` : "";

  return (
    <div
      {...props}
      ref={ref}
      className={cnb(
        block({
          auto,
          "aspect-ratio": aspectRatio,
          "full-width": fullWidth,
        }),
        aspectRatio,
        className
      )}
    >
      {children}
    </div>
  );
}

const ForwardedMediaContainer = forwardRef<HTMLDivElement, MediaContainerProps>(
  MediaContainer
);

if (process.env.NODE_ENV !== "production") {
  try {
    const PropTypes = require("prop-types");

    ForwardedMediaContainer.propTypes = {
      auto: PropTypes.bool,
      height: PropTypes.number,
      width: PropTypes.number,
      fullWidth: PropTypes.bool,
      className: PropTypes.string,
      children: PropTypes.node,
    };
  } catch (e) {}
}

export default ForwardedMediaContainer;
