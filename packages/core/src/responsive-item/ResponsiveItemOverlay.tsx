import { type HTMLAttributes, type ReactElement, type Ref } from "react";

import {
  type ResponsiveItemOverlayClassNameOptions,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  type ResponsiveItemOverlayPosition,
  responsiveItemOverlay,
} from "./responsiveItemOverlayStyles.js";

/**
 * @since 6.0.0 Renamed from `MediaOverlayProps` to
 * `ResponsiveItemOverlayProps`.
 */
export interface ResponsiveItemOverlayProps
  extends
    HTMLAttributes<HTMLSpanElement>,
    ResponsiveItemOverlayClassNameOptions {
  ref?: Ref<HTMLSpanElement>;
}

/**
 * @example Simple Example
 * ```tsx
 * import { CardContent } from "@react-md/core/card/CardContent";
 * import { ResponsiveItemOverlay } from "@react-md/core/responsive-item/ResponsiveItemOverlay";
 * import { Typography } from "@react-md/core/typography/Typography";
 * import type { ReactElement } from "react";
 *
 * function Example(): ReactElement {
 *   return (
 *     <CardContent>
 *       <img alt="" src="/some-image.png" />
 *       <ResponsiveItemOverlay>
 *         <Typography type="headline-5" margin="none">
 *           This appears at the bottom by default.
 *         </Typography>
 *       </ResponsiveItemOverlay>
 *     </CardContent>
 *   );
 * }
 * ```
 *
 * @see {@link https://react-md.dev/components/responsive-item | ResponsiveItem Demos}
 * @see {@link ResponsiveItemOverlayPosition}
 * @since 6.0.0 Renamed from `MediaOverlay` to `ResponsiveItemOverlay`
 * and renders as a `<span>` instead of a `<div>`.
 */
export function ResponsiveItemOverlay(
  props: ResponsiveItemOverlayProps
): ReactElement {
  const { ref, className, children, position = "bottom", ...remaining } = props;

  return (
    <span
      {...remaining}
      ref={ref}
      className={responsiveItemOverlay({ className, position })}
    >
      {children}
    </span>
  );
}
