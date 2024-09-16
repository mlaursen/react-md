"use client";
import { useEffect, useMemo, useRef } from "react";
import { type AnyFunction, type DebouncedFunction } from "./types.js";
import { useIsomorphicLayoutEffect } from "./useIsomorphicLayoutEffect.js";

/**
 * Creates a function that will only be called if it has not been called again
 * for X milliseconds.
 *
 * @example Debounced Search API Requests
 * ```tsx
 * import { TextField, useDebouncedFunction, useUnmounted } from "@react-md/core";
 * import { useState } from "react";
 * import type { ReactElement } from "react";
 *
 * interface State {
 *   error?: unknown
 *   loading: boolean;
 *   results?: {
 *     // pretend some search results
 *     id: string;
 *     name: string;
 *   }[];
 * }
 *
 * function Example(): ReactElement {
 *   const [state, setState] = useState<State>({
 *     loading: false,
 *   });
 *   // this is only required for async actions
 *   const unmounted = useUnmounted();
 *
 *   // A new search request will be fired once every 500ms as the user types.
 *   // can't use the event here since React uses synthetic events
 *   const search = useDebouncedFunction(async (q: string) => {
 *     setState({
 *       loading: true,
 *       error: undefined,
 *       results: undefined,
 *     });
 *
 *     try {
 *       const response = await fetch('/search', {
 *         method: 'POST',
 *         headers: {
 *           'Content-Type': 'application/json',
 *         },
 *         body: JSON.stringify({ q }),
 *       });
 *       const json = await response.json();
 *
 *       if (!unmounted.current) {
 *         setState({
 *           loading: false,
 *           results: json,
 *         });
 *       }
 *     } catch (error) {
 *       if (!unmounted.current) {
 *         setState({
 *           error,
 *           loading: false,
 *         });
 *       }
 *     }
 *   }, 500);
 *
 *   return (
 *     <TextField
 *       type="search"
 *       label="Search"
 *       onChange={(event) => search(event.currentTarget.value)}
 *     />
 *   );
 * }
 * ```
 *
 * @see `useThrottledFunction` for throttle behavior instead. (Call a
 * function at most once every X milliseconds).
 * @since 6.0.0
 */
export function useDebouncedFunction<F extends AnyFunction>(
  func: F,
  wait: number
): DebouncedFunction<F> {
  const timeout = useRef<number | undefined>();
  const funcRef = useRef(func);
  useIsomorphicLayoutEffect(() => {
    funcRef.current = func;
  });

  useEffect(() => {
    return () => {
      window.clearTimeout(timeout.current);
    };
  }, []);

  return useMemo(() => {
    const debounced: DebouncedFunction<F> = (...args) => {
      window.clearTimeout(timeout.current);
      timeout.current = window.setTimeout(() => {
        funcRef.current(...args);
      }, wait);
    };
    debounced.cancel = () => window.clearTimeout(timeout.current);

    return debounced;
  }, [wait]);
}
