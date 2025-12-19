"use client";

import { type RefObject, useEffect, useRef } from "react";

/**
 * @example Simple Example
 * ```tsx
 * import { useUnmounted } from "@react-md/core/useUnmounted";
 * import { useEffect, useState } from "react";
 *
 * function Example(): ReactElement {
 *   const [state, setState] = useState({ loading: false });
 *   const unmounted = useUnmounted();
 *
 *   useEffect(() => {
 *     async function load(): void {
 *       const result = await fetch('/some-api');
 *       const json = await response.json();
 *       if (!unmounted.current) {
 *         setState({ loading: false, result: json });
 *       }
 *     }
 *
 *     setState({ loading: true });
 *     load();
 *   }, [unmounted]);
 *
 *   return null;
 * }
 * ```
 * @since 6.0.0
 */
export function useUnmounted(): RefObject<boolean> {
  const unmounted = useRef(false);
  useEffect(() => {
    unmounted.current = false;
    return () => {
      unmounted.current = true;
    };
  }, []);

  return unmounted;
}
