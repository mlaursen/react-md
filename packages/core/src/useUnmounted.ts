"use client";
import { useEffect, useRef } from "react";
import type { NonNullRef } from "./types.js";

/**
 * @example
 * Simple Example
 * ```tsx
 * import { useUnmounted } from "@react-md/core";
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
 * @remarks \@since 6.0.0
 */
export function useUnmounted(): NonNullRef<boolean> {
  const unmounted = useRef(false);
  useEffect(() => {
    unmounted.current = false;
    return () => {
      unmounted.current = true;
    };
  }, []);

  return unmounted;
}
