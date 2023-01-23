import { nanoid } from "nanoid";
import type { ReactElement, ReactNode } from "react";
import {
  createContext,
  useContext,
  useMemo,
  useSyncExternalStore,
} from "react";
import type { ConfigurableToastProps } from "./Toast";
import type { ToastDuplicateBehavior, ToastMeta } from "./useToast";

/**
 * @remarks \@since 6.0.0
 */
export const DEFAULT_TOAST_VISIBLE_TIME = 5000;

/**
 * @remarks \@since 6.0.0 Renamed from `MessagePriority` to `ToastPriority`
 */
export type ToastPriority = "normal" | "immediate" | "replace";

/**
 * @remarks \@since 6.0.0
 */
export interface CreateToastOptions extends ConfigurableToastProps {
  /**
   * @defaultValue `nanoid()`
   */
  toastId?: string;

  /**
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
 * @remarks \@since 6.0.0
 */
export class ToastManager {
  // TODO: switch back to native private fields once I can change the root tsconfig
  private _queue: QueuedToast[];
  private _listeners: ToastCallback[];

  constructor() {
    this._queue = [];
    this._listeners = [];

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

  private _emit = (): void => {
    this._queue = [...this._queue];
    this._listeners.forEach((callback) => {
      callback(this._queue);
    });
  };

  subscribe = (callback: ToastCallback): (() => void) => {
    this._listeners.push(callback);

    return () => {
      this._listeners = this._listeners.filter((cb) => cb !== callback);
    };
  };

  addToast = (toast: CreateToastOptions): void => {
    const {
      toastId = nanoid(),
      visibleTime = DEFAULT_TOAST_VISIBLE_TIME,
      role = visibleTime === null ? "alert" : undefined,
      duplicates = "restart",
    } = toast;
    const existingIndex = toast.toastId
      ? this._queue.findIndex((toast) => toast.toastId === toastId)
      : -1;
    if (existingIndex !== -1) {
      this._queue[existingIndex] = {
        ...this._queue[existingIndex],
        ...toast,
        updated: Date.now(),
      };
    } else {
      this._queue.push({
        ...toast,
        updated: Date.now(),
        role,
        toastId,
        duplicates,
        visibleTime,
      });
    }

    this._emit();
  };

  popToast = (): void => {
    this._queue.pop();
    this._emit();
  };

  removeToast = (toastId: string): void => {
    this._queue = this._queue.filter((toast) => toast.toastId !== toastId);
    this._emit();
  };

  clearToasts = (): void => {
    this._queue = [];
    this._emit();
  };

  getQueue = (): ToastQueue => {
    return this._queue;
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
 * @remarks \@since 6.0.0
 */
export const addToast = (toast: CreateToastOptions): void =>
  toastManager.addToast(toast);

/**
 * @remarks \@since 6.0.0
 */
export const removeToast = (toastId: string): void =>
  toastManager.removeToast(toastId);

/**
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
 * @remarks \@since 6.0.0
 */
export function useRemoveToast(): RemoveToast {
  return useToastManager().removeToast;
}

/**
 * @remarks \@since 6.0.0
 */
export function useClearToasts(): () => void {
  return useToastManager().clearToasts;
}

/**
 * @param limit - the total number of toasts that can be visible at once.
 * @remarks \@since 6.0.0
 */
export function useToastQueue(limit?: number): ToastQueue {
  const manager = useToastManager();

  const queue = useSyncExternalStore(
    manager.subscribe,
    manager.getQueue,
    manager.getQueue
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
 * requried in your app. This probably shouldn't be required for most apps with
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
