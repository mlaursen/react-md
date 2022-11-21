import type { Ref, RefCallback } from "react";
import { useEffect } from "react";
import { useEnsuredRef } from "./useEnsuredRef";

/**
 * @remarks \@since 6.0.0
 */
export type ResizeObserverEntryCallback = (entry: ResizeObserverEntry) => void;

/** @internal */
interface TargetSize {
  height: number;
  width: number;
  scrollHeight: number;
  scrollWidth: number;
}

/** @internal */
interface TargetSubscription {
  readonly onUpdate: ResizeObserverEntryCallback;
  readonly disableHeight: boolean;
  readonly disableWidth: boolean;

  size?: TargetSize;
}

/** @internal */
interface SubscribeOptions {
  element: Element;
  onUpdate: ResizeObserverEntryCallback;
  disableHeight: boolean;
  disableWidth: boolean;
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

/** @internal */
const subscriptions = new Map<Element, Set<TargetSubscription>>();

/**
 * @internal
 */
const handleResizeEntries: ResizeObserverCallback = (entries) => {
  for (const entry of entries) {
    const targetSubscriptions = subscriptions.get(entry.target);
    // shoudln't really happen
    if (!targetSubscriptions) {
      continue;
    }

    const entries = targetSubscriptions.values();
    for (const subscription of entries) {
      const { height, width } = entry.contentRect;
      const { scrollHeight, scrollWidth } = entry.target;
      const { onUpdate, size, disableHeight, disableWidth } = subscription;
      const isHeightChange =
        !disableHeight &&
        (!size || size.height !== height || size.scrollHeight !== scrollHeight);
      const isWidthChange =
        !disableWidth &&
        (!size || size.width !== width || size.scrollWidth !== scrollWidth);

      subscription.size = {
        height,
        width,
        scrollHeight,
        scrollWidth,
      };
      if (isHeightChange || isWidthChange) {
        onUpdate(entry);
      }
    }
  }
};

/** @internal */
type Unsubscribe = () => void;

/** @internal */
function subscribe(options: SubscribeOptions): Unsubscribe {
  const { element, onUpdate, disableHeight, disableWidth } = options;

  // lazy initialize the observer
  const observer = sharedObserver || new ResizeObserver(handleResizeEntries);
  sharedObserver = observer;

  const updates = subscriptions.get(element) || new Set();
  const subscription: TargetSubscription = {
    onUpdate,
    disableHeight,
    disableWidth,
  };
  updates.add(subscription);
  if (!subscriptions.has(element)) {
    subscriptions.set(element, updates);
  }

  observer.observe(element);

  return () => {
    observer.unobserve(element);
    updates.delete(subscription);
  };
}

/**
 * @remarks
 * \@since 2.3.0
 * \@since 6.0.0 Renamed from `UseResizeObserverOptions` and added
 * `onUpdate`/`disabled` options.
 */
export interface ResizeObserverHookOptions<E extends HTMLElement> {
  /**
   * An optional ref to merge with the ref returned by this hook.
   */
  ref?: Ref<E>;

  /**
   * **Must be wrapped in `useCallback` to prevent re-creating the
   * ResizeObserver each render.**
   *
   * This function will be called whenever the target element resizes.
   *
   * @see {@link useResizeObserver} for an example.
   */
  onUpdate: ResizeObserverEntryCallback;

  /**
   * Set this to `true` to prevent observing the element's size changes. THis is
   * equivalent to not attaching the returned ref to any element.
   *
   * @defaultValue `false`
   */
  disabled?: boolean;

  /**
   * Set this to `true` if the {@link onUpdate} should not be fired for height
   * changes.
   *
   * @defaultValue `false`
   */
  disableHeight?: boolean;

  /**
   * Set this to `true` if the {@link onUpdate} should not be fired for width
   * changes.
   *
   * @defaultValue `false`
   */
  disableWidth?: boolean;
}

/**
 * @example
 * Simple Example
 * ```tsx
 * import { useResizeObserver } from "@react-md/core";
 * import type { ReactElement } from "react";
 * import { useState } from "react";
 *
 * interface Size {
 *   height: number;
 *   width: number;
 * }
 *
 * function Example(): ReactElement {
 *   const [{ height, width }, setSize] = useState<Size>({
 *     height: 0,
 *     width: 0,
 *   });
 *   const targetRef = useResizeObserver({
 *     onResize: useCallback((entry) => {
 *       const { height, width } = entry.borderBox;
 *       setSize({ height, width });
 *     }, []),
 *   });
 *
 *   return (
 *     <div ref={targetRef}>
 *       <table>
 *         <tbody>
 *           <tr>
 *             <th scope="col">Height:</th>
 *             <td>{height}</td>
 *           </tr>
 *           <tr>
 *             <th scope="col">Width:</th>
 *             <td>{width}</td>
 *           </tr>
 *         </tbody>
 *       </table>
 *     </div>
 *   );
 * }
 * ```
 *
 * @remarks
 * \@since 2.3.0
 * \@since 6.0.0 The API was updated to match the `useIntersectionObserver`
 * implementation -- accepts only a single object paramter and returns a
 * {@link RefCallback} instead of `[nodeRef, refCallback]`
 */
export function useResizeObserver<E extends HTMLElement>(
  options: ResizeObserverHookOptions<E>
): RefCallback<E> {
  const {
    ref,
    onUpdate,
    disabled,
    disableHeight = false,
    disableWidth = false,
  } = options;

  const [targetNodeRef, refCallback] = useEnsuredRef(ref);
  useEffect(() => {
    const element = targetNodeRef.current;
    if (disabled || (disableHeight && disableWidth) || !element) {
      return;
    }

    const unsubscribe = subscribe({
      element,
      onUpdate,
      disableHeight,
      disableWidth,
    });

    return () => {
      unsubscribe();
    };
  }, [disableHeight, disableWidth, disabled, onUpdate, targetNodeRef]);

  return refCallback;
}
