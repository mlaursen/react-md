import {
  type HTMLAttributes,
  type ReactElement,
  type ReactNode,
  type Ref,
} from "react";

import {
  type SegmentedButtonContainerClassNameOptions,
  segmentedButtonContainer,
} from "./segmentedButtonContainerStyles.js";

/**
 * @since 6.0.0
 */
export interface SegmentedButtonContainerProps
  extends
    HTMLAttributes<HTMLDivElement>,
    SegmentedButtonContainerClassNameOptions {
  ref?: Ref<HTMLDivElement>;

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
 * import { CustomWrapperComponent } from "./CustomWrapperComponent.js";
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
 * @see {@link https://react-md.dev/components/segmented-button | SegmentedButton Demos}
 * @since 6.0.0
 */
export function SegmentedButtonContainer(
  props: SegmentedButtonContainerProps
): ReactElement {
  const { ref, className, disableFullWidth, children, ...remaining } = props;

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
}
