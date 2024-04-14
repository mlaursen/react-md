"use client";
import { useEffect } from "react";

const noop = (): void => {
  // do nothing
};

/**
 * When this is set to `"focus"`, the change handler will be fired whenever the
 * window gains or loses focus.
 *
 * When this is set to `visibility`, the change handler will be fired when the
 * browser is no longer partially visible or becomes partially visible.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/visibilityState
 * @since 6.0.0
 */
export type PageInactiveType = "focus" | "visibility";

/**
 * @since 6.0.0
 */
export interface PageInactiveOptions {
  /**
   * @see {@link PageInactiveType}
   * @defaultValue `"focus"`
   */
  type?: PageInactiveType;

  /**
   * @defaultValue `false`
   */
  disabled?: boolean;

  /**
   * This will be called whenever the page activity changes based on the
   * {@link PageInactiveType}.
   */
  onChange(active: boolean): void;

  /**
   * This will be fired whenever the {@link disabled} state is `true` which can
   * be useful for clearing pending timers or resetting state.
   *
   * Since this is passed to a `useEffect` as a dependency, you might have to
   * wrap this in a `useCallback` if unexpected re-rendering or errors occurs.
   *
   * @defaultValue `() => {}`
   */
  onDisabledCleanup?(): void;
}

/**
 * @example
 * ```ts
 * import { usePageInactive } from "@react-md/core";
 * import { useCallback, useEffect, useRef, useState } from "react";
 *
 * function Example(): null {
 *   const [visible, setVisible] = useState(false);
 *   const timeout = useRef<number | undefined>();
 *   const startTimeout = useCallback(() => {
 *     timeout.current = window.setTimeout(() => {
 *       setVisible(false);
 *     }, 10000);
 *   }, []);
 *
 *   usePageInactive({
 *     onChange(active) {
 *       if (!active) {
 *         window.clearTimeout(timeout.current);
 *         setVisible(false);
 *       } else {
 *         startTimeout();
 *       }
 *     }
 *   });
 *
 *   // pretend implementation
 *   return null;
 * }
 * ```
 * @since 6.0.0
 */
export function usePageInactive(options: PageInactiveOptions): void {
  const {
    type = "focus",
    disabled,
    onChange,
    onDisabledCleanup = noop,
  } = options;
  useEffect(() => {
    if (disabled) {
      onDisabledCleanup();
      return;
    }

    const callback = (event: Event): void => {
      let active = document.visibilityState === "visible";
      if (event.type === "blur") {
        active = false;
      } else if (event.type === "focus") {
        active = true;
      }

      onChange(active);
    };

    document.addEventListener("visibilitychange", callback);
    if (type === "focus") {
      window.addEventListener("blur", callback);
      window.addEventListener("focus", callback);
    }

    return () => {
      document.removeEventListener("visibilitychange", callback);
      window.removeEventListener("blur", callback);
      window.removeEventListener("focus", callback);
    };
  }, [disabled, onChange, onDisabledCleanup, type]);
}
