"use client";
import { useState } from "react";
import { getDraggableDefaultValue } from "../draggable/utils.js";
import type { UseStateInitializer, UseStateSetter } from "../types.js";
import type {
  ControlledWindowSplitterImplementation,
  ControlledWindowSplitterOptions,
} from "./useControlledWindowSplitter.js";
import { useControlledWindowSplitter } from "./useControlledWindowSplitter.js";

/**
 * @remarks \@since 6.0.0
 */
export interface WindowSplitterOptions<
  E extends HTMLElement = HTMLButtonElement,
> extends Omit<
    ControlledWindowSplitterOptions<E>,
    "value" | "setValue" | "dragging" | "setDragging"
  > {
  /**
   * @defaultValue `Math.ceil((max - min) / 2)`
   */
  defaultValue?: UseStateInitializer<number>;
}

/**
 * @remarks \@since 6.0.0
 */
export interface WindowSplitterImplementation<E extends HTMLElement>
  extends ControlledWindowSplitterImplementation<E> {
  /**
   * The current drag distance in pixels.
   */
  value: number;

  /**
   * This can be used to manually set the {@link value} if that is needed for
   * some custom behavior.
   */
  setValue: UseStateSetter<number>;

  /**
   * This will be `true` when the user is dragging the element through mouse or
   * touch.
   */
  dragging: boolean;
}

/**
 * @example
 * Main Window Splitter
 * ```tsx
 * import {
 *   useCSSVariables,
 *   useWindowSplitter,
 *   WindowSplitter,
 * } from "@react-md/core";
 * import type { ReactElement } from "react";
 * import { useMemo } from "react";
 *
 * const POSITION_VAR = "--rmd-window-splitter-position";
 *
 * function Example(): ReactElement {
 *   const { value, splitterProps } = useWindowSplitter({
 *     min: 96,
 *     max: 600,
 *     defaultValue: 256,
 *   });
 *
 *   useCSSVariables(
 *     useMemo(() => [{ name: POSITION_VAR, value: `${value}px` }], [value])
 *   );
 *
 *   return (
 *     <div
 *       style={{
 *         display: "grid",
 *         gridTemplateColumns: `var(POSITION_VAR, 96px) 1fr`,
 *       }}
 *     >
 *       <nav id="main-nav">
 *         // pretend nav content
 *       </nav>
 *       <WindowSplitter
 *         aria-label="Resize Navigation"
 *         aria-controls="main-nav"
 *         {...splitterProps}
 *       />
 *       <main>
 *         // pretend main content
 *       </main>
 *     </>
 *   );
 * }
 * ```
 *
 * Note: This implementation is missing the toggle behavior when the `"Enter"`
 * key is pressed.
 *
 * @remarks \@since 6.0.0
 * @see https://www.w3.org/WAI/ARIA/apg/patterns/windowsplitter/
 */
export function useWindowSplitter<E extends HTMLElement = HTMLButtonElement>(
  options: WindowSplitterOptions<E>
): WindowSplitterImplementation<E> {
  const { min, max, defaultValue, ...remaining } = options;
  const [value, setValue] = useState(() =>
    getDraggableDefaultValue({ min, max, defaultValue })
  );
  const [dragging, setDragging] = useState(false);
  const splitter = useControlledWindowSplitter({
    min,
    max,
    value,
    setValue,
    dragging,
    setDragging,
    ...remaining,
  });

  return {
    ...splitter,
    value,
    setValue,
    dragging,
  };
}
