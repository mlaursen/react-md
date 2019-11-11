import { useEffect, MutableRefObject, useRef, useState } from "react";
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

type TargetRef<
  E extends HTMLElement = HTMLElement
> = MutableRefObject<E | null>;

/**
 * The target element for the resize obsever. This can be one of:
 * - null
 * - HTMLElement
 * - a document.querySelector string
 * - a ref with { current: null | HTMLElement }
 * - a function that returns
 *   - null
 *   - HTMLElement
 *
 * Whenever the target is resolved as `null`, the observer will be disabled.
 */
export type ResizeObserverTarget<E extends HTMLElement = HTMLElement> =
  | null
  | HTMLElement
  | string
  | TargetRef<E>
  | GetTarget;

/**
 * @private
 */
const isRefTarget = (
  target: ResizeObserverTarget
): target is MutableRefObject<HTMLElement | null> =>
  !!target &&
  typeof (target as MutableRefObject<HTMLElement | null>).current !==
    "undefined";

/**
 * @private
 */
const isFunctionTarget = (target: ResizeObserverTarget): target is GetTarget =>
  typeof target === "function";

/**
 * A utility function to get the current resize observer element.
 *
 * @private
 */
export function getResizeObserverTarget(
  target: ResizeObserverTarget
): HTMLElement | null {
  if (isRefTarget(target)) {
    return target.current;
  }

  if (isFunctionTarget(target)) {
    return target();
  }

  if (typeof target === "string") {
    return document.querySelector<HTMLElement>(target);
  }

  return target;
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

export interface ResizeObserverOptions<E extends HTMLElement = HTMLElement> {
  disableHeight?: boolean;
  disableWidth?: boolean;
  onResize: ResizeObserverChangeEventHandler;
  target: ResizeObserverTarget<E>;
}

/**
 * A hook that is used to trigger esize events when a target element is resized
 * via CSS or other changes.
 *
 * @param options The resize observer options.
 */
export default function useResizeObserver<E extends HTMLElement>({
  disableHeight = false,
  disableWidth = false,
  onResize,
  target,
}: ResizeObserverOptions<E>): void {
  useEffect(() => {
    if (disableHeight && disableWidth) {
      return;
    }

    const resizeTarget = getResizeObserverTarget(target);
    if (!resizeTarget) {
      return;
    }

    let prevSize: ElementSize | undefined;
    const observer = new ResizeObserverPolyfill(entries => {
      for (let i = 0; i < entries.length; i += 1) {
        const entry = entries[i];
        const target = entry.target as HTMLElement;
        const { height, width } = entry.contentRect;
        const { scrollHeight, scrollWidth } = target;
        const nextSize: ElementSize = {
          height,
          width,
          scrollHeight,
          scrollWidth,
        };

        const isNewHeight = isHeightChange(prevSize, nextSize);
        const isNewWidth = isWidthChange(prevSize, nextSize);
        prevSize = nextSize;
        if ((isNewHeight && !disableHeight) || (isNewWidth && !disableWidth)) {
          onResize({
            ...nextSize,
            element: target,
          });
        }
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [target, onResize, disableHeight, disableWidth]);
}
