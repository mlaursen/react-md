"use client";

import { type RefCallback, useCallback, useRef, useState } from "react";

import { type ElementSize, type UseStateInitializer } from "./types.js";
import {
  type ResizeObserverHookOptions,
  useResizeObserver,
} from "./useResizeObserver.js";

/**
 * @since 6.0.0
 */
export interface ElementSizeOptions<E extends HTMLElement>
  extends Omit<ResizeObserverHookOptions<E>, "onUpdate"> {
  /** @defaultValue `{ height: 0, width: 0 }` */
  defaultValue?: UseStateInitializer<ElementSize>;
}

/**
 * @since 6.0.0
 */
export interface ElementSizeImplementation<E extends HTMLElement>
  extends ElementSize {
  elementRef: RefCallback<E>;

  /**
   * This will be `true` once the resize observer's callback is triggered at
   * least once.
   *
   * This was added so that generating custom properties that have a reasonable
   * default value set in css don't cause major layout shifts when a default
   * value cannot be provided.
   *
   * @example
   * ```tsx
   * const { height, width, observedOnce } = useElementSize();
   * useCSSVariables(useMemo(() => {
   *   if (!observedOnce) {
   *     return []
   *   }
   *
   *   // something that uses the element's height, width, or both
   *   return [{ var: "--something", value: height / width * 0.5 }];
   * }, [height, width, observedOnce]));
   * ```
   */
  observedOnce: boolean;
}

/**
 * A small wrapper around the {@link useResizeObserver} hook to calculate the
 * element's size.
 *
 * @example Simple Example
 * ```tsx
 * import { useElementSize } from "@react-md/core/useElementSize";
 * import { type ReactElement } from "react";
 *
 * function Example(): ReactElement {
 *   const { height, width, elementRef } = useElementSize();
 *
 *   return (
 *     <div ref={elementRef}>
 *       {`height: ${height}, width: ${width}`}
 *     </div>
 *   );
 * }
 * ```
 *
 * @since 6.0.0
 */
export function useElementSize<E extends HTMLElement>(
  options: ElementSizeOptions<E> = {}
): ElementSizeImplementation<E> {
  const { defaultValue } = options;

  const observedOnce = useRef(false);
  const [size, setSize] = useState<ElementSize>(() => {
    if (typeof defaultValue === "function") {
      return defaultValue();
    }

    return (
      defaultValue ?? {
        height: 0,
        width: 0,
      }
    );
  });

  const elementRef = useResizeObserver({
    ...options,
    onUpdate: useCallback((entry) => {
      observedOnce.current = true;
      const size = entry.borderBoxSize[0];

      setSize({
        height: size.blockSize,
        width: size.inlineSize,
      });
    }, []),
  });

  return {
    ...size,
    elementRef,
    observedOnce: observedOnce.current,
  };
}
