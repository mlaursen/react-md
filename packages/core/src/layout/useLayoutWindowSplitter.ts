"use client";
import type { UseStateInitializer } from "../types.js";
import { useWindowSize } from "../useWindowSize.js";
import type { WindowSplitterWidgetProps } from "../window-splitter/useControlledWindowSplitter.js";
import type {
  LocalStorageWindowSplitterImplementation,
  LocalStorageWindowSplitterOptions,
} from "../window-splitter/useLocalStorageWindowSplitter.js";
import { useLocalStorageWindowSplitter } from "../window-splitter/useLocalStorageWindowSplitter.js";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { useResizableLayout } from "./useResizableLayout.js";

/**
 * @remarks \@since 6.0.0
 */
export interface LayoutWindowSplitterOptions
  extends Omit<LocalStorageWindowSplitterOptions, "min" | "max" | "key"> {
  /**
   * @see {@link LocalStorageWindowSplitterImplementation.key}
   * @defaultValue `"navWidth"`
   */
  key?: string;

  /**
   * @see {@link LocalStorageWindowSplitterOptions.min}
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
 * @remarks \@since 6.0.0
 */
export interface ProvidedLayoutWindowSplitterProps
  extends WindowSplitterWidgetProps<HTMLButtonElement> {
  /** @defaultValue {@link LocalStorageWindowSplitterImplementation.value} */
  navWidth: number;
}

/**
 * @remarks \@since 6.0.0
 */
export interface LayoutWindowSplitterImplementation
  extends LocalStorageWindowSplitterImplementation {
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
 * @remarks \@since 6.0.0
 */
export function useLayoutWindowSplitter(
  options: LayoutWindowSplitterOptions = {}
): LayoutWindowSplitterImplementation {
  const {
    key = "navWidth",
    min = 96,
    maxMinimum = 600,
    windowPercentage = 0.45,
    defaultValue = 256,
    ...remaining
  } = options;
  const { width } = useWindowSize({ disableHeight: true });
  const implementation = useLocalStorageWindowSplitter({
    min,
    max: Math.max(maxMinimum, width * windowPercentage),
    key,
    defaultValue,
    ...remaining,
  });

  return {
    ...implementation,
    splitterProps: {
      ...implementation.splitterProps,
      navWidth: implementation.value,
    },
  };
}
