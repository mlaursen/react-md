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

const noop = (): void => {
  // do nothing
};

/**
 * @remarks \@since 6.0.0
 */
export interface WindowSplitterOptions<E extends HTMLElement>
  extends Omit<
    UncontrolledDraggableOptions<E>,
    "disableTouch" | keyof DraggableTouchEventHandlers<E>
  > {
  /**
   * An optional id to use for the window splitter.
   *
   * @defaultValue `"window-splitter-" + useId()`
   */
  id?: string;
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
}

/**
 * @remarks \@since 6.0.0
 */
export interface WindowSplitterImplementation<E extends HTMLElement>
  extends DraggableImplementation<E> {
  splitterProps: Readonly<WindowSplitterWidgetProps<E>>;
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
 *   const { value, dragging, splitterProps } = useWindowSplitter({
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
 *         {...splitterProps}
 *         aria-label="Resize Navigation"
 *         aria-controls="main-nav"
 *         dragging={dragging}
 *       />
 *       <main>
 *         // pretend main content
 *       </main>
 *     </>
 *   );
 * }
 * ```
 *
 * TODO:
 * - maybe add a default implementation into the Layout component?
 * - figure out the best way to "reset" it?
 * - need to provide an `aria-controls`, `aria-label`/`aria-labelledby`
 *
 * @remarks \@since 6.0.0
 * @see {@link https://www.w3.org/WAI/ARIA/apg/patterns/windowsplitter/}
 */
export function useWindowSplitter<E extends HTMLElement>(
  options: WindowSplitterOptions<E>
): WindowSplitterImplementation<E> {
  const {
    id: propId,
    ref: propRef,
    min,
    max,
    step = 1,
    vertical = false,
    defaultValue,
    onKeyDown = noop,
    onMouseUp = noop,
    onMouseDown = noop,
    onMouseMove = noop,
    localStorageKey = "",
    localStorageManual,
    disableDraggingClassName = false,
  } = options;

  const id = useEnsuredId(propId, "splitter");
  const draggableImplementation = useDraggable({
    ref: propRef,
    min,
    max,
    step,
    vertical,
    defaultValue,
    onKeyDown(event) {
      onKeyDown(event);

      if (event.key === "Enter") {
        event.preventDefault();
        event.stopPropagation();
        // TODO
      }
    },
    onMouseUp,
    onMouseDown,
    onMouseMove,
    localStorageKey,
    localStorageManual,
    disableDraggingClassName,
  });
  const {
    value,
    dragging,
    draggableRef,
    dragPercentage,
    mouseEventHandlers,
    keyboardEventHandlers,
  } = draggableImplementation;

  const percentage = dragging
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
      ...mouseEventHandlers,
      ...keyboardEventHandlers,
    },
  };
}
