import { nanoid } from "nanoid";
import type { ReactElement, ReactNode } from "react";
import {
  createContext,
  useContext,
  useMemo,
  useSyncExternalStore,
} from "react";
import type { ConfigurableToastProps } from "./Toast";

/**
 * @remarks \@since 6.0.0
 */
export const DEFAULT_TOAST_VISIBLE_TIME = 5000;

/**
 * - `"allow"` - toasts with the same `toastId` can be added into the queue, but
 *   the leave timeout behavior might not work if multiple toasts can be shown
 *   at the same time.
 * - `"restart"` - (default) toasts that have the same `toastId` as a toast
 *   being shown will restart the exit timeout and update the toast with any
 *   differences in the toast. If the toast is not currently being shown, a new
 *   toast will not be added.
 * - `"update"` - toasts that have the same `toastId` will just update the toast
 *   with the latest content while maintaining any existing timeouts
 *
 * @remarks \@since 6.0.0 Renamed from `DuplicateBehavior`
 */
export type ToastDuplicateBehavior = "allow" | "restart" | "update";

/**
 * @remarks \@since 6.0.0
 */
export interface ToastMeta {
  /**
   * This will be `true` if the exit timeout has been paused either by hovering
   * the toast or the page has become inactive through blur or minimizing.
   */
  paused: boolean;

  /**
   * This will be `true` when the toast should be visible and `false` during the
   * exit animation.
   */
  visible: boolean;

  /**
   * The current toast's id which can be used with the:
   * - {@link ToastManager.removeToast}
   * - {@link ToastManager.startRemoveTimeout}
   * - {@link ToastManager.pauseRemoveTimeout}
   * - {@link ToastManager.resumeRemoveTimeout}
   */
  toastId: string;
  duplicates: ToastDuplicateBehavior;
  visibleTime: number | null;
}

/**
 * @remarks \@since 6.0.0
 */
export interface CreateToastOptions extends ConfigurableToastProps {
  /**
   * @defaultValue `nanoid()`
   */
  toastId?: string;

  /**
   * @see {@link ToastDuplicateBehavior}
   * @defaultValue `"restart"`
   */
  duplicates?: ToastDuplicateBehavior;

  /**
   * Set this to `null` to prevent the toast from automatically hiding,
   * otherwise set this to the number of milliseconds to remain visible.
   *
   * @see {@link DEFAULT_TOAST_VISIBLE_TIME}
   * @defaultValue `DEFAULT_TOAST_VISIBLE_TIME`
   */
  visibleTime?: number | null;
}

/**
 * @remarks \@since 6.0.0
 */
export interface QueuedToast extends ConfigurableToastProps, ToastMeta {}

/**
 * @remarks \@since 6.0.0
 */
export type AddToast = (toast: CreateToastOptions) => void;

/**
 * @remarks \@since 6.0.0
 */
export type RemoveToast = (toastId: string) => void;

/**
 * @remarks \@since 6.0.0
 */
export type ToastQueue = readonly Readonly<QueuedToast>[];

/**
 * @remarks \@since 6.0.0
 */
export type ToastCallback = (queue: ToastQueue) => void;

/**
 * @internal
 * @remarks \@since 6.0.0
 */
export interface ToastVisibilityTimers {
  inactive: boolean;
  startTime: number;
  elapsedTime: number;
  exitTimeout?: number;
}

/**
 * @see {@link ToastManagerProvider}
 *
 * @remarks \@since 6.0.0
 */
export class ToastManager {
  #queue: QueuedToast[];
  #timers: Map<string, ToastVisibilityTimers>;
  #listeners: ToastCallback[];

  constructor() {
    this.#queue = [];
    this.#timers = new Map();
    this.#listeners = [];

    // All of the class methods must be arrow functions to preserve the correct
    // `this` value. If they aren't arrow functions, I'd have to wrap each call
    // in an arrow function to work.
    //
    // i.e.
    // useSyncExternalStore(
    //   (cb) => manager.subscribe(cb),
    //   () => manager.getQueue(),
    //   () => manager.getQueue(),
    // );
  }

  #emit = (): void => {
    // shallow clone to ensure react updates
    this.#queue = [...this.#queue];
    this.#listeners.forEach((callback) => {
      callback(this.#queue);
    });
  };

  #getToastIndex = (toastId: string | undefined): number => {
    if (!toastId) {
      return -1;
    }

    return this.#queue.findIndex((toast) => toast.toastId === toastId);
  };

  #getToast = (toastId: string | undefined): QueuedToast | undefined => {
    return this.#queue[this.#getToastIndex(toastId)];
  };

  #updateToast = (
    toastIdOrIndex: string | number,
    patch: Partial<QueuedToast>
  ): void => {
    const index =
      typeof toastIdOrIndex === "number"
        ? toastIdOrIndex
        : this.#getToastIndex(toastIdOrIndex);

    if (index === -1) {
      return;
    }

    this.#queue[index] = {
      ...this.#queue[index],
      ...patch,
    };
    this.#emit();
  };

  /**
   * This is just used to subscribe to changes in the {@link useToastQueue}.
   *
   * ```tsx
   * useSyncExternalStore(
   *   toastManager.subscribe,
   *   toastManager.getQueue,
   *   toastManager.getQueue,
   * );
   * ```
   *
   * @internal
   */
  subscribe = (callback: ToastCallback): (() => void) => {
    this.#listeners.push(callback);

    return () => {
      this.#listeners = this.#listeners.filter((cb) => cb !== callback);
    };
  };

  /**
   * @see {@link subscribe}
   * @internal
   */
  getQueue = (): ToastQueue => {
    return this.#queue;
  };

  /**
   * Either adds the toast to the queue or updates an existing toast when using
   * an existing `toastId`.
   *
   * @example
   * Adding toasts
   * ```tsx
   * // create a toast when the user is offline that will not disappear
   * addToast({ toastId: "offline", visibleTime: null });
   *
   * // add a new toast that displays `"Toast"` to the queue
   * addToast({ children: "Toast!" });
   *
   * // add an online toast notification. since these three use the same toast
   * // id, the hide timer will be reset each time
   * addToast({ toastId: "online" });
   * addToast({ toastId: "online" });
   * addToast({ toastId: "online" });
   *
   * // add a server error toast to the queue where the second one will be
   * // ignored
   * addToast({
   *   toastId: "ServerError",
   *   theme: "error",
   *   duplicates: "prevent",
   * });
   * addToast({
   *   toastId: "ServerError",
   *   theme: "error",
   *   duplicates: "prevent",
   * });
   *
   * // add a toast to the queue that has an action button that says "Goodbye"
   * addToast({
   *   children: "Hello, world!",
   *   action: "Goodbye",
   * });
   *
   * // add a toast to the queue that has an action button that says "Goodbye"
   * // and a custom click handler
   * addToast({
   *   children: "Hello, world!",
   *   action: {
   *     onClick: () => {
   *       logout();
   *     },
   *     children: "Goodbye",
   *   },
   * });
   *
   * // add a toast to the queue that renders a react component in the content,
   * // a custom action button implementation (using `ToastActionButton`), and a
   * // close button
   * addToast({
   *   children: <SomeCustomComponent />,
   *   actionButton: <SomeCustomActionButton />,
   *   closeButton: true,
   * });
   * ```
   */
  addToast = (toast: CreateToastOptions): void => {
    const {
      toastId = nanoid(),
      visibleTime = DEFAULT_TOAST_VISIBLE_TIME,
      role = visibleTime === null ? "alert" : undefined,
      duplicates = "restart",
    } = toast;

    const existingIndex = this.#getToastIndex(toast.toastId);
    if (existingIndex !== -1 && duplicates !== "allow") {
      const existing = this.#queue[existingIndex];
      const timers = this.#timers.get(toastId);
      if (existing.visible && duplicates === "restart" && timers) {
        this.#timers.set(toastId, { ...timers, elapsedTime: 0 });
        this.startRemoveTimeout(toastId);
      }

      this.#updateToast(existingIndex, toast);
      return;
    }

    this.#queue.push({
      ...toast,
      role,
      paused: false,
      visible: true,
      toastId,
      duplicates,
      visibleTime,
    });
    this.#emit();
  };

  /**
   * Attempts to start the timeout for removing the toast when the `visibleTime`
   * is not null for a toast.
   *
   * @param toastId - The specific toastId to update
   */
  startRemoveTimeout = (toastId: string): void => {
    const toast = this.#getToast(toastId);
    if (!toast) {
      return;
    }

    const { visibleTime } = toast;
    if (visibleTime === null) {
      // Must manually be closed
      return;
    }

    const cached = this.#timers.get(toastId);
    const timers = (cached && { ...cached }) || {
      inactive: false,
      startTime: Date.now(),
      elapsedTime: 0,
    };
    window.clearTimeout(timers.exitTimeout);

    let duration = visibleTime;
    if (timers.elapsedTime) {
      duration -= timers.elapsedTime;
    }

    timers.inactive = false;
    timers.exitTimeout = window.setTimeout(() => {
      this.removeToast(toastId, true);
    }, duration);
    this.#timers.set(toastId, timers);
  };

  /**
   * Pauses the remove timeout for a specific toast normally with hover events
   * or the browser becoming inactive.
   *
   * @param toastId - The specific toastId to pause
   */
  pauseRemoveTimeout = (toastId: string): void => {
    const toast = this.#getToast(toastId);
    const cached = this.#timers.get(toastId);
    if (!toast || !cached || cached.inactive) {
      return;
    }

    window.clearTimeout(cached.exitTimeout);
    const timers = { ...cached };
    timers.inactive = true;
    timers.elapsedTime = Date.now() - timers.startTime + timers.elapsedTime;
    this.#timers.set(toastId, timers);
    this.#updateToast(toastId, { paused: true });
  };

  /**
   * Resumes the current remove timeout if it was paused by
   * {@link pauseRemoveTimeout}.
   *
   * @param toastId - The specific toastId to resume
   */
  resumeRemoveTimeout = (toastId: string): void => {
    const toastIndex = this.#getToastIndex(toastId);
    const timers = this.#timers.get(toastId);
    if (toastIndex === -1 || !timers?.startTime) {
      return;
    }

    this.#updateToast(toastIndex, { paused: false });
    this.startRemoveTimeout(toastId);
  };

  /**
   * Removes a toast by id from the queue without any exit animation.
   *
   * @param toastId - The specific {@link QueuedToast.toastId}
   * @param transition - Set this to `true` to remove the toast by the exit
   * transition instead of immediately.
   */
  removeToast = (toastId: string, transition: boolean): void => {
    const toastIndex = transition ? this.#getToastIndex(toastId) : -1;
    if (toastIndex !== -1) {
      this.clearTimer(toastId);
      this.#updateToast(toastIndex, { visible: false });
      return;
    }

    const filtered = this.#queue.filter((toast) => toast.toastId !== toastId);
    if (filtered.length === this.#queue.length) {
      return;
    }

    this.#queue = filtered;
    this.#emit();
  };

  /**
   * Clears any pending timers for the provided toast id. This should generally
   * be used in the `useEffect` cleanup effect for any custom toast renderer
   * implementations.
   *
   * @example
   * ```tsx
   * const { toastId } = toast;
   * const toastManager = useToastManager();
   *
   * useEffect(() => {
   *   return () => {
   *     toastManager.clearTimer(toastId):
   *   }
   * }, [toastManager, toastId]);
   * ```
   */
  clearTimer = (toastId: string): void => {
    const timer = this.#timers.get(toastId);
    window.clearTimeout(timer?.exitTimeout);
    this.#timers.delete(toastId);
  };

  /**
   * Removes first toast from the queue without any exit animation. You most
   * likely want to use {@link removeToast} instead.
   */
  popToast = (): void => {
    this.#queue.pop();
    this.#emit();
  };

  /**
   * Removes all toasts from the queue. There will be no exit animation.
   *
   * @param disableEmit - Set this to `true` to disable emitting the empty queue.
   * Mostly used for tests.
   */
  clearToasts = (disableEmit = false): void => {
    this.#queue = [];
    this.#timers.forEach((meta) => {
      window.clearTimeout(meta.exitTimeout);
    });
    this.#timers.clear();
    if (!disableEmit) {
      this.#emit();
    }
  };
}

/**
 * @remarks \@since 6.0.0
 * @internal
 */
export const toastManager = new ToastManager();

const context = createContext(toastManager);
context.displayName = "Toast";
const { Provider } = context;

/**
 * @see {@link ToastManager.addToast}
 * @remarks \@since 6.0.0
 */
export const addToast = (toast: CreateToastOptions): void =>
  toastManager.addToast(toast);

/**
 * @see {@link ToastManager.startRemoveTimeout}
 * @remarks \@since 6.0.0
 */
export const startRemoveToastTimeout = (toastId: string): void =>
  toastManager.startRemoveTimeout(toastId);

/**
 * @see {@link ToastManager.popToast}
 * @remarks \@since 6.0.0
 */
export const popToast = (): void => toastManager.popToast();

/**
 * @see {@link ToastManager.removeToast}
 * @remarks \@since 6.0.0
 */
export const removeToast = (toastId: string, transition: boolean): void =>
  toastManager.removeToast(toastId, transition);

/**
 * @see {@link ToastManager.clearToasts}
 * @remarks \@since 6.0.0
 */
export const clearToasts = (): void => toastManager.clearToasts();

/**
 * @internal
 * @remarks \@since 6.0.0
 */
export function useToastManager(): ToastManager {
  return useContext(context);
}

/**
 * @remarks \@since 6.0.0
 */
export function useAddToast(): AddToast {
  return useToastManager().addToast;
}

/**
 * @param limit - the total number of toasts that can be visible at once.
 * @remarks \@since 6.0.0
 */
export function useToastQueue(limit?: number): ToastQueue {
  const toastManager = useToastManager();

  const queue = useSyncExternalStore(
    toastManager.subscribe,
    toastManager.getQueue,
    toastManager.getQueue
  );

  return useMemo(() => {
    if (!limit) {
      return queue;
    }

    return queue.slice(0, limit);
  }, [limit, queue]);
}

/**
 * @remarks \@since 6.0.0
 */
export interface ToastManagerProviderProps {
  children: ReactNode;

  /**
   * @defaultValue `toastManager`
   */
  manager?: ToastManager;
}

/**
 * This component can be used to implement separate instances of toasts if
 * required in your app. This probably shouldn't be required for most apps with
 * the default {@link addToast}, {@link removeToast}, and {@link clearToasts}
 * implementation.
 *
 * @see {@link ToastManager} for example usage.
 * @remarks \@since 6.0.0
 */
export function ToastManagerProvider(
  props: ToastManagerProviderProps
): ReactElement {
  const { children, manager = toastManager } = props;

  return <Provider value={manager}>{children}</Provider>;
}
