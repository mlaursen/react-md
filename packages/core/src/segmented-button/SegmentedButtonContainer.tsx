import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import {
  segmentedButtonContainerStyles,
  type SegmentedButtonContainerClassNameOptions,
} from "./segmentedButtonContainerStyles.js";

/**
 * @remarks \@since 6.0.0
 */
export interface SegmentedButtonContainerProps
  extends HTMLAttributes<HTMLDivElement>,
    SegmentedButtonContainerClassNameOptions {
  children: ReactNode;
}

/**
 * **Server Component**
 *
 * Simple wrapper `div` to apply the segmented button container styles. You can
 * just use the {@link segmentedButtonContainerStyles} util function instead.
 *
 * @example
 * Without This Component
 * ```tsx
 * import {
 *   SegmentedButton,
 *   segmentedButtonContainerStyles,
 * } from "@react-md/core";
 * import type { ReactElement } from "react";
 *
 * import { CustomWrapperComponent } from "./CustomWrapperComponent.jsx";
 *
 * function Example(): ReactElement {
 *   return (
 *     <CustomWrapperComponent className={segmentedButtonContainerStyles()}>
 *       <SegmentedButton>One</SegmentedButton>
 *       <SegmentedButton>Two</SegmentedButton>
 *       <SegmentedButton>Three</SegmentedButton>
 *     </CustomWrapperComponent>
 *   );
 * }
 * ```
 *
 * @remarks \@since 6.0.0
 */
export const SegmentedButtonContainer = forwardRef<
  HTMLDivElement,
  SegmentedButtonContainerProps
>(function SegmentedButtonContainer(props, ref) {
  const { className, disableFullWidth, children, ...remaining } = props;

  return (
    <div
      {...remaining}
      ref={ref}
      className={segmentedButtonContainerStyles({
        className,
        disableFullWidth,
      })}
    >
      {children}
    </div>
  );
});
