import { forwardRef, type HTMLAttributes } from "react";
import {
  responsiveItem,
  type ResponsiveItemClassNameOptions,
} from "./responsiveItemStyles.js";

/**
 * @since 6.0.0 Renamed from `MediaContainerProps` to
 * `ResponsiveItemProps`
 * @since 6.0.0 The `height` and `width` props were removed in favor of the
 * `aspectRatio` props since the latest typescript string interpolation supports
 * enforcing the correct format.
 * @since 6.0.0 The `auto` prop was removed in favor of the new
 * {@link ResponsiveItemProps.responsive} prop.
 */
export interface ResponsiveItemProps
  extends HTMLAttributes<HTMLSpanElement>,
    ResponsiveItemClassNameOptions {}

/**
 * @example Image Example
 * ```tsx
 * import { ResponsiveItem } from "@react-md/core";
 * import type { ReactElement } from "react";
 *
 * function Example(): ReactElement {
 *   return (
 *     <ResponsiveItem>
 *       <img alt="" src="/some-image.png" />
 *     </ResponsiveItem>
 *   );
 * }
 * ```
 *
 * @example Iframe Example
 * ```tsx
 * import { ResponsiveItem } from "@react-md/core";
 * import type { ReactElement } from "react";
 *
 * function Example(): ReactElement {
 *   return (
 *     <ResponsiveItem>
 *       <iframe
 *         src="https://youtube.com/some-video-url"
 *         title="Some YouTube video"
 *         allowFullScreen
 *       />
 *     </ResponsiveItem>
 *   );
 * }
 * ```
 *
 * @example Forced Aspect Ratio
 * ```tsx
 * import { ResponsiveItem } from "@react-md/core";
 * import type { ReactElement } from "react";
 *
 * function Example(): ReactElement {
 *   return (
 *     <ResponsiveItem aspectRatio="16-9">
 *       <img alt="" src="/some-image.png" />
 *     </ResponsiveItem>
 *   );
 * }
 * ```
 *
 * @since 6.0.0 Renamed from `MediaContainer` to
 * `ResponsiveItem` and renders a `<span>` instead of a `<div>`.
 */
export const ResponsiveItem = forwardRef<HTMLSpanElement, ResponsiveItemProps>(
  function ResponsiveItem(props, ref) {
    const {
      className,
      fullWidth = false,
      aspectRatio,
      responsive = "auto",
      children,
      ...remaining
    } = props;

    return (
      <span
        {...remaining}
        ref={ref}
        className={responsiveItem({
          className,
          fullWidth,
          aspectRatio,
          responsive,
        })}
      >
        {children}
      </span>
    );
  }
);
