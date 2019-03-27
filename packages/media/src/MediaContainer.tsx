import React, { FunctionComponent, HTMLAttributes, forwardRef } from "react";
import cn from "classnames";
import { bem } from "@react-md/theme";
import { WithForwardedRef } from "@react-md/utils";

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
}

export interface MediaContainerWithAspectRatioProps
  extends MediaContainerProps {
  height: number;
  width: number;
}

type WithRef = WithForwardedRef<HTMLDivElement>;
type DefaultProps = Required<Pick<MediaContainerProps, "auto">>;

const block = bem("rmd-media-container");

/**
 * The `MediaContainer` component is used to make responsive images and videos
 * within your app. This component also allows for focing a specific aspect ratio
 * for these elements with both the `height` and `width` props are provided.
 */
const MediaContainer: FunctionComponent<
  (MediaContainerProps | MediaContainerWithAspectRatioProps) & WithRef
> = ({ className, height, width, children, forwardedRef, auto, ...props }) => {
  const aspectRatio =
    height && width ? `rmd-media-container--${width}-${height}` : "";

  return (
    <div
      {...props}
      ref={forwardedRef}
      className={cn(
        block({ auto, "aspect-ratio": aspectRatio }),
        aspectRatio,
        className
      )}
    >
      {children}
    </div>
  );
};

const defaultProps: DefaultProps = {
  auto: true,
};

MediaContainer.defaultProps = defaultProps;

if (process.env.NODE_ENV !== "production") {
  MediaContainer.displayName = "MediaContainer";

  let PropTypes = null;
  try {
    PropTypes = require("prop-types");
  } catch (e) {}

  if (PropTypes) {
    MediaContainer.propTypes = {
      auto: PropTypes.bool,
      height: PropTypes.number,
      width: PropTypes.number,
    };
  }
}

export default forwardRef<HTMLDivElement, MediaContainerProps>((props, ref) => (
  <MediaContainer {...props} forwardedRef={ref} />
));
