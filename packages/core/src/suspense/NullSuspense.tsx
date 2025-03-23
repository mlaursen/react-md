import { type ReactElement, type ReactNode, Suspense } from "react";

/**
 * @since 6.0.0
 */
export interface NullSuspenseProps {
  children: ReactNode;
}

/**
 * This is just a convenience component to set the `fallback` to `null`.
 *
 * @example Simple Example
 * ```tsx
 * import { NullSuspense } from "@react-md/core/suspense/NullSuspense";
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
 * @see {@link https://next.react-md.dev/components/suspense|Suspense Demos}
 * @since 6.0.0
 */
export function NullSuspense(props: NullSuspenseProps): ReactElement {
  const { children } = props;

  return <Suspense fallback={null}>{children}</Suspense>;
}
