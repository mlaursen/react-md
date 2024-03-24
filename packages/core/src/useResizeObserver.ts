"use client";
import { useEffect, type Ref, type RefCallback } from "react";
import { useEnsuredRef } from "./useEnsuredRef.js";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { type useElementSize } from "./useElementSize.js";

/**
 * @remarks \@since 6.0.0
 */
export type ResizeObserverEntryCallback = (entry: ResizeObserverEntry) => void;

/** @internal */
type Unsubscribe = () => void;

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
 * @internal
 * @remarks \@since 6.0.0 This was added to help with testing. The
 * `subscriptions` and `sharedObserver` used to be module-level variables but
 * moving to a class makes it easier to mock. Checkout the
 * `src/tests-utils/ResizeObserver.ts`
 */
export class ResizeObserverManager {
  frame: number;
  subscriptions: Map<Element, Set<TargetSubscription>>;

  /**
   * Why is there a single shared observer instead of multiple and a
   * "subscription" model?
   *
   * Note: Probably a bit of a premature optimization right now...
   *
   * @see https://github.com/WICG/resize-observer/issues/59
   * @internal
   */
  sharedObserver: ResizeObserver | undefined;

  constructor() {
    this.frame = 0;
    this.subscriptions = new Map();
  }

  subscribe = (options: SubscribeOptions): Unsubscribe => {
    const { element, onUpdate, disableHeight, disableWidth } = options;

    // lazy initialize the observer
    const observer =
      this.sharedObserver ||
      new ResizeObserver((entries) => {
        // this prevents the `ResizeObserver loop limit exceeded`
        window.cancelAnimationFrame(this.frame);
        this.frame = window.requestAnimationFrame(() => {
          this.handleResizeEntries(entries);
        });
      });
    this.sharedObserver = observer;

    const updates = this.subscriptions.get(element) || new Set();
    const subscription: TargetSubscription = {
      onUpdate,
      disableHeight,
      disableWidth,
    };
    updates.add(subscription);
    if (!this.subscriptions.has(element)) {
      this.subscriptions.set(element, updates);
    }

    observer.observe(element);

    return () => {
      observer.unobserve(element);
      updates.delete(subscription);
    };
  };

  handleResizeEntries = (entries: ResizeObserverEntry[]): void => {
    for (const entry of entries) {
      const targetSubscriptions = this.subscriptions.get(entry.target);
      // shouldn't really happen
      /* c8 ignore start */
      if (!targetSubscriptions) {
        continue;
      }
      /* c8 ignore stop */

      const entries = targetSubscriptions.values();
      for (const subscription of entries) {
        const { height, width } = entry.contentRect;
        const { scrollHeight, scrollWidth } = entry.target;
        const { onUpdate, size, disableHeight, disableWidth } = subscription;
        const isHeightChange =
          !disableHeight &&
          (!size ||
            size.height !== height ||
            size.scrollHeight !== scrollHeight);
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
}

/**
 * @internal
 * @remarks \@since 6.0.0
 */
export const resizeObserverManager = new ResizeObserverManager();

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
 * The resize observer is used to track the size changes of a specific element.
 * For most cases you can use the {@link useElementSize} instead, but this hook
 * can be used for more complex behavior with the {@link ResizeObserverEntry}.
 *
 * @remarks
 * \@since 2.3.0
 * \@since 6.0.0 The API was updated to match the `useIntersectionObserver`
 * implementation -- accepts only a single object parameter and returns a
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

    const unsubscribe = resizeObserverManager.subscribe({
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
