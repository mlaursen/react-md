import { type HTMLAttributes, type ReactNode, forwardRef } from "react";

import {
  type SegmentedButtonContainerClassNameOptions,
  segmentedButtonContainer,
} from "./segmentedButtonContainerStyles.js";

/**
 * @since 6.0.0
 */
export interface SegmentedButtonContainerProps
  extends HTMLAttributes<HTMLDivElement>,
    SegmentedButtonContainerClassNameOptions {
  children: ReactNode;
}

/**
 * Simple wrapper `div` to apply the segmented button container styles. You can
 * just use the {@link segmentedButtonContainer} util function instead.
 *
 * @example Without This Component
 * ```tsx
 * import { SegmentedButton } from "@react-md/core/segmented-button/SegmentedButton";
 * import { segmentedButtonContainer } from "@react-md/core/segmented-button/SegmentedButtonContainer";
 * import type { ReactElement } from "react";
 *
 * import { CustomWrapperComponent } from "./CustomWrapperComponent.jsx";
 *
 * function Example(): ReactElement {
 *   return (
 *     <CustomWrapperComponent className={segmentedButtonContainer()}>
 *       <SegmentedButton>One</SegmentedButton>
 *       <SegmentedButton>Two</SegmentedButton>
 *       <SegmentedButton>Three</SegmentedButton>
 *     </CustomWrapperComponent>
 *   );
 * }
 * ```
 *
 * @since 6.0.0
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
      className={segmentedButtonContainer({
        className,
        disableFullWidth,
      })}
    >
      {children}
    </div>
  );
});
