"use client";
import { type UncontrolledDraggableOptions } from "../draggable/useDraggable.js";
import { type UseStateInitializer } from "../types.js";
import { useWindowSize } from "../useWindowSize.js";
import {
  useWindowSplitter,
  type WindowSplitterImplementation,
  type WindowSplitterOptions,
  type WindowSplitterWidgetProps,
} from "../window-splitter/useWindowSplitter.js";

/**
 * @since 6.0.0
 */
export interface LayoutWindowSplitterOptions
  extends Omit<WindowSplitterOptions, "min" | "max"> {
  /**
   * @see {@link WindowSplitterOptions.min}
   * @defaultValue `96`
   */
  min?: number;

  /**
   * This is the minimum max value that can be allowed while resizing the
   * browser. I don't know the best way to describe it, but the `max` value is
   * determined by:
   *
   * ```ts
   * const { width } = useWindowSize({ disableHeight: true });
   * const max = Math.max(maxMinimum, width * windowPercentage);
   * ```
   *
   * @defaultValue `600`
   */
  maxMinimum?: number;

  /**
   * This will be multiplied by the current window's width to determine the
   * dynamic max value for the window splitter.
   *
   * @see {@link maxMinimum}
   * @defaultValue `0.45`
   */
  windowPercentage?: number;

  /** @defaultValue `256` */
  defaultValue?: UseStateInitializer<number>;
}

/**
 * @since 6.0.0
 */
export interface ProvidedLayoutWindowSplitterProps
  extends WindowSplitterWidgetProps<HTMLButtonElement> {
  /** @defaultValue {@link WindowSplitterImplementation.value} */
  navWidth: number;
}

/**
 * @since 6.0.0
 */
export interface LayoutWindowSplitterImplementation
  extends WindowSplitterImplementation {
  splitterProps: ProvidedLayoutWindowSplitterProps;
}

/**
 * A custom window splitter implementation to be used with the
 * `LayoutWindowSplitter` that will dynamically configure the max width to be a
 * percentage of the current window's width.
 *
 * Note: This will automatically save the width in local storage as
 * `"navWidth"`. See the example below if you do not want to use local storage.
 *
 * @example
 * Without this hook
 * ```tsx
 * import { useWindowSize, useWindowSplitter } from "@react-md/core";
 * import type { ProvidedLayoutWindowSplitterProps } from "@react-md/core";
 *
 * export function useMyLayoutWindowSplitter(): ProvidedLayoutWindowSplitterProps {
 *   const { width } = useWindowSize({ disableHeight: true });
 *   const { splitterProps, value } = useWindowSplitter({
 *     min: 96,
 *     max: Math.max(maxMinimum, width * 0.45),
 *     maxMinimum: 600,
 *   });
 *
 *   return {
 *     ...splitterProps,
 *     navWidth: value,
 *   };
 * }
 *
 * function MyLayout() {
 *   const splitterProps = useMyLayoutWindowSplitter();
 *
 *   return (
 *     <LayoutWindowSplitter
 *       {...splitterProps}
 *       aria-controls="layout-nav-id"
 *     />
 *   );
 * }
 * ```
 *
 * @see {@link useResizableLayout} For a pre-built solution.
 * @since 6.0.0
 */
export function useLayoutWindowSplitter(
  options: LayoutWindowSplitterOptions = {}
): LayoutWindowSplitterImplementation {
  const {
    min = 96,
    maxMinimum = 600,
    windowPercentage = 0.45,
    defaultValue = 256,
    ...remaining
  } = options;
  const { width } = useWindowSize({ disableHeight: true });
  const implementation = useWindowSplitter({
    min,
    max: Math.max(maxMinimum, width * windowPercentage),
    defaultValue,
    // type cast so it doesn't complain about defaultValue being provided with
    // value. That's mostly for public api usage
    ...(remaining as UncontrolledDraggableOptions),
  });

  return {
    ...implementation,
    splitterProps: {
      ...implementation.splitterProps,
      navWidth: implementation.value,
    },
  };
}
