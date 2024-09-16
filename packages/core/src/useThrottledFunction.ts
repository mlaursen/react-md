"use client";
import { useEffect, useMemo, useRef } from "react";
import { type AnyFunction, type ThrottledFunction } from "./types.js";
import { useIsomorphicLayoutEffect } from "./useIsomorphicLayoutEffect.js";

/**
 * Creates a function that will only be called once every X milliseconds.
 *
 * @example Throttling Search API Requests
 * ```tsx
 * import { TextField, useThrottledFunction, useUnmounted } from "@react-md/core";
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
 *   const search = useThrottledFunction(async (q: string) => {
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
 * @see `useDebouncedFunction` for debounce behavior instead. (Call a
 * function only if it has not been called again for X milliseconds).
 * @since 6.0.0
 */
export function useThrottledFunction<F extends AnyFunction>(
  func: F,
  wait: number
): ThrottledFunction<F> {
  const args = useRef<Parameters<F>>();
  const result = useRef<ReturnType<F>>();
  const timeout = useRef<number | undefined>();
  const funcRef = useRef(func);
  const lastCalledTime = useRef(0);

  useIsomorphicLayoutEffect(() => {
    funcRef.current = func;
  });

  useEffect(() => {
    return () => {
      window.clearTimeout(timeout.current);
    };
  }, []);

  return useMemo(() => {
    const throttled: ThrottledFunction<F> = (...nextArgs) => {
      args.current = nextArgs;

      const now = Date.now();
      const remaining = wait - (now - lastCalledTime.current);
      if (remaining <= 0 || remaining > wait) {
        lastCalledTime.current = now;
        result.current = funcRef.current(...args.current);
      } else if (!timeout.current) {
        timeout.current = window.setTimeout(() => {
          lastCalledTime.current = Date.now();
          timeout.current = undefined;
          // should exist by this time
          result.current = funcRef.current(...(args.current as Parameters<F>));
        }, remaining);
      }

      return result.current as ReturnType<F>;
    };
    throttled.cancel = () => window.clearTimeout(timeout.current);

    return throttled;
  }, [wait]);
}
