"use client";

import { type ReactElement, type ReactNode, useEffect, useState } from "react";

import { useSsr } from "./SsrProvider.js";

/** @since 6.0.0 */
export interface NoSsrProps {
  children: ReactNode;
}

/**
 * **Client Component**
 *
 * A small wrapper that can be used to render children client side only. The
 * main use-case are for components that rely on browser API to work correctly.
 *
 * @example Simple Example
 * ```tsx
 * import { CoreProviders, NoSsr, Typography } from "@react-md/core";
 * import type { ReactElement } from "react";
 *
 * function Example(): ReactElement {
 *   return (
 *     <>
 *       <Typography>This is always rendered.</Typography>
 *       <NoSsr>
 *         <Typography>
 *           This is only rendered client-side after rehydrating.
 *         </Typography>
 *       </NoSsr>
 *     </>
 *   );
 * }
 *
 * function App(): ReactElement {
 *   return (
 *     <CoreProviders ssr>
 *       <Example />
 *     </CoreProviders>
 *   );
 * }
 * ```
 *
 * @since 6.0.0
 */
export function NoSsr(props: NoSsrProps): ReactElement {
  const { children } = props;
  const ssr = useSsr();
  const [rendered, setRendered] = useState(!ssr);
  useEffect(() => {
    setRendered(true);
  }, []);

  return <>{rendered && children}</>;
}
