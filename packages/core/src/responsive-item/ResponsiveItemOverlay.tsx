import { cnb } from "cnbuilder";
import { forwardRef, type HTMLAttributes } from "react";
import { bem } from "../utils/bem.js";

const styles = bem("rmd-responsive-item-overlay");

/**
 * The overlay positions relative to the `MediaContainer` component.  Most of
 * the sizes are self-explanatory, but the `middle` position will be centered
 * vertically while `center` will be centered `horizontally`.
 *
 * @since 6.0.0 Renamed from `MediaOverlayPosition` to
 * `ResponsiveItemOverlayProps`.
 */
export type ResponsiveItemOverlayPosition =
  | "top"
  | "right"
  | "bottom"
  | "left"
  | "middle"
  | "center"
  | "absolute-center";

/** @since 6.0.0 */
export interface ResponsiveItemOverlayClassNameOptions {
  className?: string;
  /** @defaultValue `"bottom"` */
  position?: ResponsiveItemOverlayPosition;
}

/**
 * @since 6.0.0
 */
export function responsiveItemOverlay(
  options: ResponsiveItemOverlayClassNameOptions = {}
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
 * @since 6.0.0 Renamed from `MediaOverlayProps` to
 * `ResponsiveItemOverlayProps`.
 */
export interface ResponsiveItemOverlayProps
  extends HTMLAttributes<HTMLSpanElement>,
    ResponsiveItemOverlayClassNameOptions {}

/**
 * **Server Component**
 *
 * @example
 * Simple Example
 * ```tsx
 * import { ResponsiveItemContainer, ResponsiveItemOverlay } from "@react-md/core";
 * import type { ReactElement } from "react";
 *
 * function Example(): ReactElement {
 *   return (
 *     <ResponsiveItemContainer>
 *       <img alt="" src="/some-image.png" />
 *       <ResponsiveItemOverlay>
 *         <Typography type="headline-5" margin="none">
 *           This appears at the bottom by default.
 *         </Typography>
 *       </ResponsiveItemOverlay>
 *     </ResponsiveItemContainer>
 *   );
 * }
 * ```
 *
 * @see {@link ResponsiveItemOverlayPosition}
 *
 * @since 6.0.0 Renamed from `MediaOverlay` to `ResponsiveItemOverlay`
 * and renders as a `<span>` instead of a `<div>`.
 */
export const ResponsiveItemOverlay = forwardRef<
  HTMLSpanElement,
  ResponsiveItemOverlayProps
>(function ResponsiveItemOverlay(props, ref) {
  const { className, children, position = "bottom", ...remaining } = props;

  return (
    <span
      {...remaining}
      ref={ref}
      className={responsiveItemOverlay({ className, position })}
    >
      {children}
    </span>
  );
});
