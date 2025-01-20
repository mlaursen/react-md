"use client";

import { useCallback, useState } from "react";

import { useSsr } from "./SsrProvider.js";
import { type ElementSize } from "./types.js";
import {
  type ResizeListenerOptions,
  useResizeListener,
} from "./useResizeListener.js";

/**
 * @since 6.0.0
 */
export interface WindowSizeOptions
  extends Omit<ResizeListenerOptions, "disabled" | "onUpdate"> {
  /**
   * The default value to use in SSR environments for the window's height.
   *
   * @defaultValue `0`
   */
  ssrHeight?: number;

  /**
   * The default value to use in SSR environments for the window's width.
   *
   * @defaultValue `0`
   */
  ssrWidth?: number;

  /**
   * Set this to `true` to ignore resize events that only updated the height.
   * The hook can be disabled by setting this and {@link disableWidth} to
   * `true`.
   *
   * @defaultValue `false`
   */
  disableHeight?: boolean;

  /**
   * Set this to `true` to ignore resize events that only updated the width.
   * The hook can be disabled by setting this and {@link disableHeight} to
   * `true`.
   *
   * @defaultValue `false`
   */
  disableWidth?: boolean;
}

/**
 * This is just a convenience wrapper around the {@link useResizeListener}.
 *
 * @example Simple Example
 * ```tsx
 * import { useWindowSize } from "@react-md/core";
 * import type { ReactElement } from "react";
 * import { useState } from "react";
 *
 * function Example(): ReactElement {
 *   const { height, width } = useWindowSize();
 *
 *   return (
 *     <>
 *       The current window size:
 *       <pre><code>{JSON.stringify(size, null, 2)}</code></pre>
 *     </>
 *   );
 * }
 * ```
 *
 * @since 6.0.0
 */
export function useWindowSize(options: WindowSizeOptions = {}): ElementSize {
  const {
    once,
    signal,
    capture,
    passive,
    throttle,
    ssrHeight = 0,
    ssrWidth = 0,
    disableWidth,
    disableHeight,
  } = options;

  const ssr = useSsr();
  const [size, setSize] = useState(() => {
    if (typeof window === "undefined" || ssr) {
      return {
        height: ssrHeight,
        width: ssrWidth,
      };
    }

    return {
      height: window.innerHeight,
      width: window.innerWidth,
    };
  });

  useResizeListener({
    once,
    signal,
    capture,
    passive,
    throttle,
    disabled: disableHeight && disableWidth,
    onUpdate: useCallback(() => {
      setSize((prevSize) => {
        const nextSize: ElementSize = {
          height: window.innerHeight,
          width: window.innerWidth,
        };

        const isHeightChange =
          !disableHeight && prevSize.height !== nextSize.height;
        const isWidthChange =
          !disableWidth && prevSize.width !== nextSize.width;

        return isHeightChange || isWidthChange ? nextSize : prevSize;
      });
    }, [disableHeight, disableWidth]),
  });

  return size;
}
