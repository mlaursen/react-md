import { Suspense, type ReactElement, type ReactNode } from "react";

/**
 * @remarks \@since 6.0.0
 */
export interface NullSuspenseProps {
  children: ReactNode;
}

/**
 * **Server Component**
 *
 * This is just a convenience component to set the `fallback` to `null`.
 *
 * @example
 * Simple Example
 * ```tsx
 * import { NullSuspense } from "@react-md/core";
 * import type { ReactElement } from "react";
 * import { lazy } from "react";
 *
 * const Component = lazy(() => import('./Some/Path/To/Component'));
 *
 * function Example() {
 *   return (
 *     <NullSuspense>
 *       <Component />
 *     </NullSuspense>
 *   );
 * }
 * ```
 *
 * @remarks \@since 6.0.0
 */
export function NullSuspense(props: NullSuspenseProps): ReactElement {
  const { children } = props;

  return <Suspense fallback={null}>{children}</Suspense>;
}
