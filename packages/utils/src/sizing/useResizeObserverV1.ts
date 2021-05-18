import { MutableRefObject, useEffect } from "react";
import { ResizeObserver } from "@juggle/resize-observer";

/**
 * A function that will return the resize observer target element. This should
 * return an HTMLElement or null.
 */
type GetTarget<E extends HTMLElement = HTMLElement> = () => E | null;

type RefTarget<E extends HTMLElement = HTMLElement> =
  MutableRefObject<E | null>;

/**
 * The target element for the resize obsever. This can be one of:
 *
 * - null
 * - HTMLElement
 * - a document.querySelector string
 * - a ref with `{ current: null | HTMLElement }`
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
  | RefTarget<E>
  | GetTarget<E>;

/**
 * @internal
 */
const isRefTarget = (
  target: ResizeObserverTarget
): target is MutableRefObject<HTMLElement | null> =>
  !!target &&
  typeof (target as MutableRefObject<HTMLElement | null>).current !==
    "undefined";

/**
 * @internal
 */
const isFunctionTarget = (target: ResizeObserverTarget): target is GetTarget =>
  typeof target === "function";

/**
 * A utility function to get the current resize observer element.
 *
 * @internal
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
 * @internal
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
 * @internal
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
  /**
   * The height for the element that was changed.
   */
  height: number;

  /**
   * The width for the element that was changed.
   */
  width: number;

  /**
   * The scroll height for the element that was changed.
   */
  scrollHeight: number;

  /**
   * The scroll height for the element that was changed.
   */
  scrollWidth: number;
}

/**
 * The data that is provided whenever an observed element changes size.
 */
export interface ObservedResizeData extends ElementSize {
  /**
   * The element that was changed due to an observered resize event.
   */
  element: HTMLElement;
}

/**
 * A type that can be used to strongly type a callback function for a resize
 * observe onResize function. It's really just a wrapper for the main
 * `ObserverableResizeEvent`
 */
export type ObservedResizeEventHandler = (event: ObservedResizeData) => void;

export interface UseResizeObserverV1Options<
  E extends HTMLElement = HTMLElement
> {
  target: ResizeObserverTarget<E>;
  onResize: ObservedResizeEventHandler;
  disableHeight?: boolean;
  disableWidth?: boolean;
}

/**
 * @internal
 */
export const warnedOnce = {
  hook: false,
  comp: false,
};

/**
 * A hook that is used to trigger esize events when a target element is resized
 * via CSS or other changes.
 *
 * @param options - The resize observer options.
 * @deprecated 2.3.0 Use the new ref API instead
 */
export function useResizeObserverV1<E extends HTMLElement>({
  disableHeight = false,
  disableWidth = false,
  onResize,
  target,
}: UseResizeObserverV1Options<E>): void {
  if (process.env.NODE_ENV !== "production") {
    const stack = new Error().stack ?? "";
    const isComp = stack.includes("at ResizeObserver ");
    const key = (isComp ? "comp" : "hook") as keyof typeof warnedOnce;
    if (!warnedOnce[key]) {
      warnedOnce[key] = true;
      let message: string;
      if (isComp) {
        message = `The \`ResizeObserver\` component has been deprecated in favor of the new \`useResizeObserver\` hook using the \`ref\` API.`;
      } else {
        message = `The \`useResizeObserver\` hook has deprecated the ability to use an object containing a \`target\` and \`onResize\` callback.`;
        message = `${message} Switch to the new \`ref\` API by setting the \`onResize\` callback as the first argument.`;
      }

      // eslint-disable-next-line no-console
      console.warn(
        `${message} Please see https://github.com/mlaursen/react-md/pull/940 for more details.`
      );
    }
  }

  useEffect(() => {
    if (disableHeight && disableWidth) {
      return;
    }

    const resizeTarget = getResizeObserverTarget(target);
    if (!resizeTarget) {
      return;
    }

    let prevSize: ElementSize | undefined;
    const observer = new ResizeObserver((entries) => {
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
    observer.observe(resizeTarget);

    return () => {
      observer.unobserve(resizeTarget);
      observer.disconnect();
    };
  }, [target, onResize, disableHeight, disableWidth]);
}
