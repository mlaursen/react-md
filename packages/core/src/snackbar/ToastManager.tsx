import { nanoid } from "nanoid";
import { type ConfigurableToastProps } from "./Toast.js";

/**
 * @since 6.0.0
 */
export const DEFAULT_TOAST_VISIBLE_TIME = 5000;

/**
 * - `"normal"` - the toast will be added to the end of the queue
 * - `"next"` - the toast will be inserted next-in-line in the queue, waiting
 *   for the current visible toast to exit before being shown. If the toast does
 *   not support duplicates, the existing toast will be moved instead and merged
 *   with the toast.
 * - `"replace"` - if there is a currently visible toast, it will start the
 *   leave transition and display the newly added toast instead.
 * - `"immediate"` - the same behavior as `"replace"` except that if there was a
 *   currently visible toast, the toast will be shown again once the `"immediate"`
 *   toast is hidden.
 *
 * @since 6.0.0 Renamed from `MessagePriority` to `ToastPriority`
 */
export type ToastPriority = "normal" | "next" | "replace" | "immediate";

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
 * @since 6.0.0 Renamed from `DuplicateBehavior`
 */
export type ToastDuplicateBehavior = "allow" | "restart" | "update";

/**
 * @since 6.0.0
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
  priority: ToastPriority;
  duplicates: ToastDuplicateBehavior;
  visibleTime: number | null;
}

/**
 * @since 6.0.0
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
   * @see {@link ToastPriority}
   * @defaultValue `"normal"`
   */
  priority?: ToastPriority;

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
 * @since 6.0.0
 */
export interface QueuedToast extends ConfigurableToastProps, ToastMeta {}

/**
 * @since 6.0.0
 */
export type ToastQueue = readonly Readonly<QueuedToast>[];

/**
 * @since 6.0.0
 */
export type ToastCallback = (queue: ToastQueue) => void;

/**
 * @internal
 * @since 6.0.0
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
 * @since 6.0.0
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

  /**
   * Starts the exit transition for the currently shown toast and adds the next
   * toast into the queue. This requires a manual call to `this.#emit()`
   * afterwards.
   */
  #addToastImmediately = (nextToast: QueuedToast): void => {
    const [current] = this.#queue;
    this.clearTimer(current.toastId);
    this.#queue[0] = {
      ...current,
      visible: false,
    };
    if (nextToast.priority === "immediate") {
      this.#queue.splice(1, 0, nextToast, current);
    } else {
      this.#queue.splice(1, 0, nextToast);
    }
  };

  /**
   * This calls `this.#emit()` if the toast was updated
   */
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
      role = visibleTime === null ? "alert" : "status",
      priority = "normal",
      duplicates = "restart",
    } = toast;

    const existingIndex = this.#getToastIndex(toast.toastId);
    if (existingIndex !== -1 && duplicates !== "allow") {
      const existingToast = this.#queue[existingIndex];

      // reorder/move the existing toast to be the next item in the queue by:
      // - removing the toast from the queue
      // - inserting it into the next position with the updates
      if (priority === "next" && existingIndex > 1) {
        this.#queue.splice(existingIndex, 1);
        this.#queue.splice(1, 0, { ...existingToast, ...toast });
        this.#emit();
        return;
      }

      // only need to reorder the queue if it is not being shown
      if (
        (priority === "replace" || priority === "immediate") &&
        existingIndex !== 0
      ) {
        this.#queue.splice(existingIndex, 1);
        this.#addToastImmediately({
          ...existingToast,
          ...toast,
        });
        this.#emit();
        return;
      }

      const timers = this.#timers.get(toastId);
      if (existingToast.visible && duplicates === "restart" && timers) {
        this.#timers.set(toastId, { ...timers, elapsedTime: 0 });
        this.startRemoveTimeout(toastId);
      }

      this.#updateToast(existingIndex, toast);
      return;
    }

    const nextToast: QueuedToast = {
      ...toast,
      role,
      paused: false,
      visible: true,
      toastId,
      priority,
      duplicates,
      visibleTime,
    };

    const queueSize = this.#queue.length;
    if (priority === "next" && queueSize > 1) {
      this.#queue.splice(1, 0, nextToast);
    } else if (
      (priority === "replace" || priority === "immediate") &&
      queueSize > 0
    ) {
      this.#addToastImmediately(nextToast);
    } else {
      this.#queue.push(nextToast);
    }

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
    const toastIndex = this.#getToastIndex(toastId);
    if (toastIndex === -1) {
      return;
    }

    if (transition) {
      this.clearTimer(toastId);
      this.#updateToast(toastIndex, { visible: false });
      return;
    }

    this.#queue.splice(toastIndex, 1);
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
 * The default toast manager for react-md apps that will allow toasts to be
 * added without setting up the {@link ToastManagerProvider}.
 *
 * @internal
 * @since 6.0.0
 */
export const toastManager = new ToastManager();

/**
 * @see {@link ToastManager.addToast}
 * @since 6.0.0
 */
export const addToast: ToastManager["addToast"] = (toast) =>
  toastManager.addToast(toast);

/**
 * @see {@link ToastManager.startRemoveTimeout}
 * @since 6.0.0
 */
export const startRemoveToastTimeout: ToastManager["startRemoveTimeout"] = (
  toastId
) => toastManager.startRemoveTimeout(toastId);

/**
 * @see {@link ToastManager.popToast}
 * @since 6.0.0
 */
export const popToast: ToastManager["popToast"] = () => toastManager.popToast();

/**
 * @see {@link ToastManager.removeToast}
 * @since 6.0.0
 */
export const removeToast: ToastManager["removeToast"] = (toastId, transition) =>
  toastManager.removeToast(toastId, transition);

/**
 * @see {@link ToastManager.clearToasts}
 * @since 6.0.0
 */
export const clearToasts = (): void => toastManager.clearToasts();
