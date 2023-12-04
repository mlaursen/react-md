"use client";
import { useCallback, useState, type RefCallback } from "react";
import { type ElementSize, type UseStateInitializer } from "./types.js";
import {
  useResizeObserver,
  type ResizeObserverHookOptions,
} from "./useResizeObserver.js";

/**
 * @remarks \@since 6.0.0
 */
export interface ElementSizeOptions<E extends HTMLElement>
  extends Omit<ResizeObserverHookOptions<E>, "onUpdate"> {
  /** @defaultValue `{ height: Infinity, width: Infinity }` */
  defaultValue?: UseStateInitializer<ElementSize>;
}

/**
 * @remarks \@since 6.0.0
 */
export interface ElementSizeImplementation<E extends HTMLElement>
  extends ElementSize {
  elementRef: RefCallback<E>;
}

/**
 * A small wrapper around the {@link useResizeObserver} hook to calculate the
 * element's size.
 *
 * @example
 * Simple Example
 * ```tsx
 * import { useElementSize } from "@react-md/core";
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
 * @remarks \@since 6.0.0
 */
export function useElementSize<E extends HTMLElement>(
  options: ElementSizeOptions<E> = {}
): ElementSizeImplementation<E> {
  const { defaultValue } = options;

  const [size, setSize] = useState<ElementSize>(() => {
    if (typeof defaultValue === "function") {
      return defaultValue();
    }

    return (
      defaultValue ?? {
        height: Infinity,
        width: Infinity,
      }
    );
  });

  const elementRef = useResizeObserver({
    ...options,
    onUpdate: useCallback((entry) => {
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
  };
}
