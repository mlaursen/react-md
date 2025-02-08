"use client";

import { useEffect } from "react";

/**
 * This hook can be used to dynamically apply a single className to the
 * `document.documentElement` (`<html>`) using the `classList` API.
 *
 * @example Main Usage
 * ```tsx
 * function Example() {
 *   useHtmlClassName("my-class-name");
 *   return null;
 * }
 * ```
 *
 * @since 6.0.0
 */
export function useHtmlClassName(className: string): void {
  useEffect(() => {
    if (!className) {
      return;
    }

    const html = document.documentElement;
    html.classList.add(className);
    return () => {
      html.classList.remove(className);
    };
  }, [className]);
}
