import { Suspense, type ReactElement, type ReactNode } from "react";
import {
  CircularProgress,
  type CircularProgressProps,
} from "../progress/CircularProgress.js";

/**
 * @since 6.0.0
 */
export interface CircularProgressSuspenseProps extends CircularProgressProps {
  /**
   * @defaultValue `"Loading"`
   */
  "aria-label"?: string;
  children: ReactNode;
}

/**
 * This is just a convenience component to set the `fallback` to the
 * {@link CircularProgress} component.
 *
 * @example Simple Example
 * ```tsx
 * import { CircularProgressSuspense } from "@react-md/core";
 * import type { ReactElement } from "react";
 * import { lazy } from "react";
 *
 * const Component = lazy(() => import('./Some/Path/To/Component'));
 *
 * function Example(): ReactElement {
 *   return (
 *     <CircularProgressSuspense>
 *       <Component />
 *     </CircularProgressSuspense>
 *   );
 * }
 * ```
 *
 * @since 6.0.0
 */
export function CircularProgressSuspense(
  props: CircularProgressSuspenseProps
): ReactElement {
  const {
    children,
    "aria-labelledby": ariaLabelledBy,
    "aria-label": ariaLabel = ariaLabelledBy ? undefined : "Loading",
    ...progressProps
  } = props;
  return (
    <Suspense
      fallback={
        <CircularProgress
          aria-label={ariaLabel as string}
          aria-labelledby={ariaLabelledBy}
          {...progressProps}
        />
      }
    >
      {children}
    </Suspense>
  );
}
