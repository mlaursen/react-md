"use client";
import type { Ref, RefCallback } from "react";
import type {
  DraggableImplementation,
  DraggableKeyboardEventHandlers,
  DraggableMouseEventHandlers,
  DraggableTouchEventHandlers,
  UncontrolledDraggableOptions,
} from "../draggable";
import { useDraggable } from "../draggable";
import { useEnsuredId } from "../useEnsuredId";
import { getPercentage } from "../utils";

declare module "react" {
  interface CSSProperties {
    "--rmd-window-splitter-top"?: number | string;
    "--rmd-window-splitter-right"?: number | string;
    "--rmd-window-splitter-bottom"?: number | string;
    "--rmd-window-splitter-left"?: number | string;
    "--rmd-window-splitter-opacity"?: number | string;
    "--rmd-window-splitter-position"?: number | string;
  }
}

/**
 * @remarks \@since 6.0.0
 */
export interface WindowSplitterOptions<
  E extends HTMLElement = HTMLButtonElement,
> extends Omit<
    UncontrolledDraggableOptions<E>,
    "disableTouch" | keyof DraggableTouchEventHandlers<E>
  > {
  /**
   * An optional id to use for the window splitter.
   *
   * @defaultValue `"window-splitter-" + useId()`
   */
  id?: string;

  /**
   * An optional ref for the window splitter element. This will be merged into
   * the {@link WindowSplitterWidgetProps.ref}.
   */
  ref?: Ref<E>;
}

/**
 * @remarks \@since 6.0.0
 */
export interface WindowSplitterWidgetProps<E extends HTMLElement>
  extends Required<DraggableMouseEventHandlers<E>>,
    Required<DraggableKeyboardEventHandlers<E>> {
  "aria-orientation": "vertical" | undefined;
  "aria-valuenow": number;
  "aria-valuemin": number;
  "aria-valuemax": number;
  id: string;
  ref: RefCallback<E>;
  role: "separator";
  reversed: boolean;
  dragging: boolean;
}

/**
 * @remarks \@since 6.0.0
 */
export interface WindowSplitterImplementation<E extends HTMLElement>
  extends DraggableImplementation<E> {
  splitterProps: WindowSplitterWidgetProps<E>;
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
  const {
    id: propId,
    min,
    max,
    reversed = false,
    vertical,
    withinOffsetParent,
  } = options;

  const id = useEnsuredId(propId, "splitter");
  const draggableImplementation = useDraggable(options);
  const {
    value,
    dragging,
    draggableRef,
    dragPercentage,
    mouseEventHandlers,
    keyboardEventHandlers,
  } = draggableImplementation;

  const percentage =
    dragging && withinOffsetParent
      ? dragPercentage
      : getPercentage({ min, max, value });

  return {
    ...draggableImplementation,
    splitterProps: {
      "aria-orientation": vertical ? "vertical" : undefined,
      "aria-valuenow": Math.ceil(percentage * 100),
      "aria-valuemin": 0,
      "aria-valuemax": 100,
      id,
      ref: draggableRef,
      role: "separator",
      dragging,
      reversed,
      ...mouseEventHandlers,
      ...keyboardEventHandlers,
    },
  };
}
