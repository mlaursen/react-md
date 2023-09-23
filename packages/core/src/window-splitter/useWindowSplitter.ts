"use client";
import type { Ref, RefCallback } from "react";
import type {
  BaseDraggableOptions,
  DraggableImplementation,
  DraggableKeyboardEventHandlers,
  DraggableMouseEventHandlers,
  DraggableStateOptions,
  DraggableTouchEventHandlers,
} from "../draggable/useDraggable.js";
import { useDraggable } from "../draggable/useDraggable.js";
import { useEnsuredId } from "../useEnsuredId.js";
import { getPercentage } from "../utils/getPercentage.js";

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
export interface BaseWindowSplitterOptions<
  E extends HTMLElement = HTMLButtonElement,
> extends Omit<BaseDraggableOptions<E>, keyof DraggableTouchEventHandlers<E>> {
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
export type WindowSplitterOptions<E extends HTMLElement = HTMLButtonElement> =
  BaseWindowSplitterOptions<E> & DraggableStateOptions;

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
export interface WindowSplitterImplementation<
  E extends HTMLElement = HTMLButtonElement,
> extends DraggableImplementation<E> {
  splitterProps: WindowSplitterWidgetProps<E>;
}

/**
 * You are most likely looking for the `useWindowSplitter` or
 * `useLocalStorageWindowSplitter` hooks instead since this is a low-level hook
 * to implement those two versions.
 *
 * @example
 * Custom Implementation
 * ```tsx
 * import { useWindowSplitter, WindowSplitterImplementation } from "@react-md/core";
 * import { useState } from "react";
 *
 * // this is pretty much the `useWindowSplitter` implementation
 * export function useMyCustomWindowSplitter(): WindowSplitterImplementation {
 *   const [dragging, setDragging] = useState(false);
 *   const [value, setValue] = useState(0);
 *   const splitter = useWindowSplitter({
 *     min: 0,
 *     max: 100,
 *     value,
 *     setValue,
 *     dragging,
 *     setDragging,
 *   });
 *
 *   return {
 *     ...splitter,
 *     value,
 *     setValue,
 *     dragging,
 *   }
 * }
 * ```
 *
 * @remarks \@since 6.0.0
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
