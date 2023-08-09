import type { ReactElement, ReactNode } from "react";
import { Suspense } from "react";
import type { CircularProgressProps } from "../progress/CircularProgress";
import { CircularProgress } from "../progress/CircularProgress";

/**
 * @remarks \@since 6.0.0
 */
export interface CircularProgressSuspenseProps extends CircularProgressProps {
  children: ReactNode;
}

/**
 * **Server Component**
 *
 * This is just a convenience component to set the `fallback` to the
 * {@link CircularProgress} component.
 *
 * @example
 * Simple Example
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
 * @remarks \@since 6.0.0
 */
export function CircularProgressSuspense(
  props: CircularProgressSuspenseProps
): ReactElement {
  const { children, ...progressProps } = props;
  return (
    <Suspense fallback={<CircularProgress {...progressProps} />}>
      {children}
    </Suspense>
  );
}
