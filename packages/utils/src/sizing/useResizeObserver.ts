import { Ref } from "react";
import { ResizeObserver } from "@juggle/resize-observer";

import { EnsuredRefs, useEnsuredRef } from "../useEnsuredRef";
import { useIsomorphicLayoutEffect } from "../useIsomorphicLayoutEffect";
import {
  useResizeObserverV1,
  UseResizeObserverV1Options,
} from "./useResizeObserverV1";

/**
 * @remarks \@since 2.3.0
 */
export interface UseResizeObserverOptions<E extends HTMLElement> {
  /**
   * An optional ref to merge with the returned ref handler function
   */
  ref?: Ref<E | null>;

  /**
   * Boolean if the `onResize` callback should not be triggered if only the
   * height has changed for the watched element.
   */
  disableHeight?: boolean;

  /**
   * Boolean if the `onResize` callback should not be triggered if only the
   * width has changed for the watched element.
   */
  disableWidth?: boolean;
}

/**
 * @remarks \@since 2.3.0
 */
export interface ResizeObserverElementSize {
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
 * @remarks \@since 2.3.0
 */
export interface ResizeObserverElementData<E extends HTMLElement = HTMLElement>
  extends ResizeObserverElementSize {
  /**
   * The element that changed due to the resize observer.
   */
  element: E;
}

/**
 * The callback that is triggered each time an element's size change has been
 * observered.
 * @remarks \@since 2.3.0
 */
export type OnResizeObserverChange<E extends HTMLElement = HTMLElement> = (
  resizeData: ResizeObserverElementData<E>
) => void;

/**
 * @internal
 */
interface ResizeObserverSubscription<E extends HTMLElement> {
  readonly target: E;
  readonly handler: OnResizeObserverChange<E>;
  readonly disableHeight: boolean;
  readonly disableWidth: boolean;
  prevSize: ResizeObserverElementSize | undefined;
}

/**
 * @internal
 */
function isHeightChange(
  prevSize: ResizeObserverElementSize | undefined,
  nextSize: ResizeObserverElementSize
): boolean {
  return (
    !prevSize ||
    prevSize.height !== nextSize.height ||
    prevSize.scrollHeight !== nextSize.scrollHeight
  );
}

/**
 * @internal
 */
function isWidthChange(
  prevSize: ResizeObserverElementSize | undefined,
  nextSize: ResizeObserverElementSize
): boolean {
  return (
    !prevSize ||
    prevSize.width !== nextSize.width ||
    prevSize.scrollWidth !== nextSize.scrollWidth
  );
}

/**
 * Why is there a single shared observer instead of multiple and a
 * "subscription" model?
 *
 * Note: Probably a bit of a premature optimization right now...
 *
 * @see https://github.com/WICG/resize-observer/issues/59
 * @internal
 */
let sharedObserver: ResizeObserver | undefined;

/**
 *
 * @internal
 */
const subscriptions: ResizeObserverSubscription<HTMLElement>[] = [];

/**
 * Lazy initializes the shared resize observer which will loop through all the
 * subscriptions when a resize event is called.
 *
 * @internal
 */
function init(): void {
  if (sharedObserver || typeof document === "undefined") {
    return;
  }

  sharedObserver = new ResizeObserver((entries) => {
    // Note: might need to wait until an requestAnimationFrame has completed to
    // fix the resize observer loop exceeded error if switching to
    // `useIsomorphicLayoutEffect` and a shared observer didn't fix that error:
    // https://stackoverflow.com/questions/49384120/resizeobserver-loop-limit-exceeded
    for (let i = 0; i < entries.length; i += 1) {
      const entry = entries[i];
      const currentSubscriptions = subscriptions.filter(
        ({ target }) => target === entry.target
      );
      if (!currentSubscriptions.length) {
        return;
      }

      const { height, width } = entry.contentRect;
      const { scrollHeight, scrollWidth } = entry.target;
      const nextSize: ResizeObserverElementSize = {
        height,
        width,
        scrollHeight,
        scrollWidth,
      };

      for (let j = 0; j < currentSubscriptions.length; j += 1) {
        const subscription = currentSubscriptions[j];
        const { handler, prevSize, disableHeight, disableWidth } = subscription;
        const isNewHeight = isHeightChange(prevSize, nextSize);
        const isNewWidth = isWidthChange(prevSize, nextSize);
        if ((isNewHeight && !disableHeight) || (isNewWidth && !disableWidth)) {
          subscription.prevSize = nextSize;
          handler({
            ...nextSize,
            element: entry.target as typeof subscription.target,
          });
        }
      }
    }
  });
}

/**
 *
 * @internal
 */
function subscribe<E extends HTMLElement>(
  target: E,
  onResize: OnResizeObserverChange<E>,
  disableHeight: boolean,
  disableWidth: boolean
): void {
  const exists = subscriptions.find((sub) => sub.target === target);
  subscriptions.push({
    target,
    handler: onResize as OnResizeObserverChange<HTMLElement>,
    disableWidth,
    disableHeight,
    prevSize: undefined,
  });

  if (!exists) {
    // I'll silently fail non-initialized observers for now until it becomes an
    // issue... But how will I ever know?
    sharedObserver?.observe(target);
  }
}

/**
 *
 * @internal
 */
function unsubscribe<E extends HTMLElement>(
  target: E,
  onResize: OnResizeObserverChange<E>,
  disableHeight: boolean,
  disableWidth: boolean
): void {
  const i = subscriptions.findIndex(
    (sub) =>
      sub.target === target &&
      sub.handler === onResize &&
      sub.disableWidth === disableWidth &&
      sub.disableHeight === disableHeight
  );
  if (i !== -1) {
    subscriptions.splice(i, 1);
  }

  const remaining = subscriptions.some((sub) => sub.target === target);
  if (!remaining) {
    // I'll silently fail non-initialized observers for now until it becomes an
    // issue... But how will I ever know?
    sharedObserver?.unobserve(target);
  }
}

/**
 * This uses the deprecated v1 behavior of providing a `target` element for the
 * resize observer. It is recommended to use the newer API that returns a ref
 * handler instead.
 *
 * @deprecated 2.3.0
 */
export function useResizeObserver<E extends HTMLElement>(
  options: UseResizeObserverV1Options<E>
): void;

/**
 * The new resize observer API that returns a `refHandler` to attach to a DOM
 * node instead of using the weird `target` API.
 *
 * @remarks \@since 2.3.0
 * @param onResize - The resize handler to call when the element has changed
 * height or width. If you notice performance issues or other oddities, it is
 * recommended to wrap this function in `useCallback`.
 * @param options - Any additional options to use for the resize observer.
 */
export function useResizeObserver<E extends HTMLElement>(
  onResize: OnResizeObserverChange<E>,
  options?: UseResizeObserverOptions<E>
): EnsuredRefs<E>;

/**
 * This is currently a version that supports the "v1" and "v2" behavior of the
 * resize observer. **This hook with crash if you switch between the v1 and v2
 * behavior** during runtime.
 *
 * Please migrate to the v2 behavior with the ref handler when possible.
 *
 * @remarks \@since 2.3.0
 */
export function useResizeObserver<E extends HTMLElement>(
  arg1: UseResizeObserverV1Options<E> | OnResizeObserverChange<E>,
  arg2: UseResizeObserverOptions<E> = {}
): EnsuredRefs<E> | void {
  // the app **should** crash if the user is switching between v1 and v2 behavior
  /* eslint-disable react-hooks/rules-of-hooks */
  if (typeof arg1 !== "function") {
    useResizeObserverV1(arg1);
    return;
  }

  const onResize = arg1;
  const { ref: propRef, disableHeight = false, disableWidth = false } = arg2;

  const [ref, refHandler] = useEnsuredRef<E>(propRef);

  useIsomorphicLayoutEffect(() => {
    const target = ref.current;
    if ((disableHeight && disableWidth) || !target) {
      return;
    }

    init();
    subscribe(target, onResize, disableHeight, disableWidth);
    return () => {
      unsubscribe(target, onResize, disableHeight, disableWidth);
    };
  }, [disableHeight, disableWidth, onResize]);

  return [ref, refHandler];
}
