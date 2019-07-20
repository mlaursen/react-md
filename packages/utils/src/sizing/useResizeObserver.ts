import { useEffect, MutableRefObject, useRef } from "react";
import ResizeObserverPolyfill from "resize-observer-polyfill";

// these are copied from the ResizeObserverPolyfill type definitions since the type definition
// file doesn't seem to be importing the polyfill which causes compilation errors in other packages.
// I don't really know how to fix it.

interface DOMRectReadOnly {
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
  readonly top: number;
  readonly right: number;
  readonly bottom: number;
  readonly left: number;
}

interface ResizeObserverEntry {
  readonly target: Element;
  readonly contentRect: DOMRectReadOnly;
}

/**
 * A function that will return the resize observer target element. This
 * should return an HTMLElement or null.
 */
type GetTarget = () => HTMLElement | null;

/**
 * A resize observer target finder. This can either be a `document.querySeletor` string,
 * an `HTMLElement`, a function that returns an `HTMLElement`, or `null`.
 *
 * Setting this to `null` will result in a "lazy Observer". The observer will not start until it has
 * been updated to be a string or an HTMLElement.
 */
export type FindResizeTarget = string | HTMLElement | GetTarget | null;

/**
 * A utility function to get the current resize observer element.
 *
 * @private
 */
export function getResizeObserverTarget(
  target: FindResizeTarget
): HTMLElement | null {
  if (target === null) {
    return target;
  }

  switch (typeof target) {
    case "function":
      return (target as GetTarget)();
    case "string":
      return document.querySelector<HTMLElement>(target);
    default:
      return target as HTMLElement;
  }
}

/**
 *
 * @private
 */
export function isHeightChange(
  prevSize: ElementSize | undefined,
  nextSize: ElementSize
): boolean {
  return (
    !prevSize ||
    prevSize.height !== nextSize.height ||
    prevSize.scrollHeight !== nextSize.scrollHeight
  );
}

/**
 *
 * @private
 */
export function isWidthChange(
  prevSize: ElementSize | undefined,
  nextSize: ElementSize
): boolean {
  return (
    !prevSize ||
    prevSize.width !== nextSize.width ||
    prevSize.scrollWidth !== nextSize.scrollWidth
  );
}

interface ElementSize {
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

export interface ResizeObserverOptions {
  disableHeight?: boolean;
  disableWidth?: boolean;
  onResize: ResizeObserverChangeEventHandler;
  getTarget: FindResizeTarget;
}

interface DelegatedHandler {
  onResize: MutableRefObject<ResizeObserverChangeEventHandler>;
  disableHeight: boolean;
  disableWidth: boolean;
}

/**
 * This will be a "lazy-initialized" observer that every `useResizeObserver` (and `ResizeObserver`)
 * hook into since it is more performant than creating multiple resize observer instances (see
 * link below). The way that this will work is that each element target will be put into a weakmap
 * containing a list of all resize handlers that should be run.
 *
 * Since the main "feature" of this hook is to be able to opt out of one of the sizing changes, there
 * will also be another weakmap of the previous size. Each of the target
 *
 * @see https://github.com/WICG/ResizeObserver/issues/59
 */
let observer: ResizeObserver;
const elementHandlersMap = new WeakMap<HTMLElement, DelegatedHandler[]>();
const previousSizeMap = new WeakMap<HTMLElement, ElementSize>();

/**
 * This is the shared entry measurer that will call all the resize handlers
 * for each target. It will also check if there actually was a size change based
 * on the configuration provided before calling the resize callback.
 */
function measure(entries: ResizeObserverEntry[]): void {
  for (let i = 0; i < entries.length; i += 1) {
    const entry = entries[i];
    const target = entry.target as HTMLElement;
    const handlers = elementHandlersMap.get(target) || [];
    const { height, width } = entry.contentRect;
    const { scrollHeight, scrollWidth } = target;
    const nextSize: ElementSize = {
      height,
      width,
      scrollHeight,
      scrollWidth,
    };

    const prevSize = previousSizeMap.get(target);
    const isNewHeight = isHeightChange(prevSize, nextSize);
    const isNewWidth = isWidthChange(prevSize, nextSize);
    handlers.forEach(({ onResize, disableHeight, disableWidth }) => {
      if ((isNewHeight && !disableHeight) || (isNewWidth && !disableWidth)) {
        onResize.current({
          ...nextSize,
          element: target,
        });
      }
    });
    previousSizeMap.set(target, nextSize);
  }
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
}: ResizeObserverOptions): void {
  // have to put it into an "instance variable ref" since you'll generally be
  // doing this with arrow functions and it's pretty bad for performance with
  // the measurer to observer and unobserve each render especially when the
  // callback updates the state
  const resizeHandler = useRef(onResize);
  useEffect(() => {
    resizeHandler.current = onResize;
  });

  useEffect(() => {
    const target = getResizeObserverTarget(getTarget);
    if (!target || (disableHeight && disableWidth)) {
      return;
    }

    if (!observer) {
      observer = new ResizeObserverPolyfill(measure);
    }

    observer.observe(target);
    const handlers = elementHandlersMap.get(target) || [];
    const handler = { onResize: resizeHandler, disableHeight, disableWidth };
    handlers.push(handler);
    elementHandlersMap.set(target, handlers);
    return () => {
      observer.unobserve(target);
      const currentHandlers = elementHandlersMap.get(target) || [];
      if (currentHandlers.length === 1) {
        elementHandlersMap.delete(target);
        return;
      }

      const i = currentHandlers.findIndex(h => h === handler);
      if (i !== -1) {
        currentHandlers.splice(i, 1);
      } else {
        throw new Error(
          "Unable to clean up a ResizeObserver handler since it did not exist at the time of clean up."
        );
      }
    };
  }, [disableHeight, disableWidth, getTarget]);
}
