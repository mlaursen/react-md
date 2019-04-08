import { useCallback, useRef, useEffect, useMemo } from "react";
import ResizeObserverPolyfill from "resize-observer-polyfill";

/**
 * A function that will return the resize observer target element. This
 * should return an HTMLElement or null.
 */
export type GetResizeObserverTarget = () => HTMLElement | null;

/**
 * A resize observer target finder. This can either be a `document.querySeletor` string,
 * an `HTMLElement`, a function that returns an `HTMLElement`, or `null`.
 *
 * Setting this to `null` will result in a "lazy Observer". The observer will not start until it has
 * been updated to be a string or an HTMLElement.
 */
export type ResizeObserverTargetFinder =
  | string
  | HTMLElement
  | GetResizeObserverTarget
  | null;

export interface ElementSize {
  height: number;
  width: number;
  scrollHeight: number;
  scrollWidth: number;
}

export interface ResizeObserverChangeEvent extends ElementSize {
  element: HTMLElement;
}

export type ResizeObserverChangeEventHandler = (
  event: ResizeObserverChangeEvent
) => void;

/**
 * A utility function to get the current resize observer element.
 *
 * @private
 */
export function getResizeObserverTarget(target: ResizeObserverTargetFinder) {
  if (target === null) {
    return target;
  }

  switch (typeof target) {
    case "function":
      return (target as GetResizeObserverTarget)();
    case "string":
      return document.querySelector<HTMLElement>(target);
    default:
      return target as HTMLElement;
  }
}

/**
 * Checks if there has been a size change.
 *
 * @private
 */
export function isSizeChange(
  prevSize: ElementSize | null,
  nextSize: ElementSize,
  disableHeight: boolean,
  disableWidth: boolean
) {
  return (
    !prevSize ||
    (!disableWidth &&
      (prevSize.width !== nextSize.width ||
        prevSize.scrollWidth !== nextSize.scrollWidth)) ||
    (!disableHeight &&
      (prevSize.height !== nextSize.height ||
        prevSize.scrollHeight !== nextSize.scrollHeight))
  );
}

interface MeasureOptions {
  onResize: ResizeObserverChangeEventHandler;
  disableHeight?: boolean;
  disableWidth?: boolean;
  defaultSize?: ElementSize | null;
}

/**
 * Creates a memoized measure function to apply to a ResizeObserver.
 *
 * @private
 */
export function useMeasure({
  disableHeight = false,
  disableWidth = false,
  onResize,
  defaultSize = null,
}: MeasureOptions) {
  const prevSize = useRef<ElementSize | null>(defaultSize);
  const options = useRef({
    disableHeight,
    disableWidth,
    onResize,
  });
  useEffect(() => {
    options.current = {
      disableHeight,
      disableWidth,
      onResize,
    };
  });

  return useCallback((entries: ResizeObserverEntry[]) => {
    const { onResize, disableHeight, disableWidth } = options.current;
    for (const entry of entries) {
      if (!entry) {
        return;
      }

      const { height, width } = entry.contentRect;
      const { scrollHeight, scrollWidth } = entry.target;
      const nextSize = { height, width, scrollWidth, scrollHeight };
      if (
        isSizeChange(prevSize.current, nextSize, disableHeight, disableWidth)
      ) {
        prevSize.current = nextSize;
        onResize({
          ...nextSize,
          element: entry.target as HTMLElement,
        });
      }
    }
  }, []);
}

/**
 * Creates a memoized resize observer target.
 * @private
 */
export function useResizeObserverTarget(
  getTarget: ResizeObserverTargetFinder
): HTMLElement | null {
  return useMemo(() => getResizeObserverTarget(getTarget), [getTarget]);
}

export interface ResizeObserverOptions {
  disableHeight: boolean;
  disableWidth: boolean;
  onResize: ResizeObserverChangeEventHandler;
  getTarget: ResizeObserverTargetFinder;
}

/**
 * A hook that is used to trigger esize events when a target element is resized
 * via CSS or other changes.
 *
 * @param options The resize observer options.
 */
export default function useResizeObserver({
  disableHeight = false,
  disableWidth = false,
  onResize,
  getTarget,
}: ResizeObserverOptions) {
  const measure = useMeasure({ disableHeight, disableWidth, onResize });
  const observer = useMemo(() => new ResizeObserverPolyfill(measure), []);
  const target = useResizeObserverTarget(getTarget);

  useEffect(() => () => observer.disconnect(), [observer]);
  useEffect(() => {
    if (!target) {
      return;
    }

    observer.observe(target);
    return () => {
      observer.unobserve(target);
    };
  }, [target]);
}
