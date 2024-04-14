"use client";

import {
  createContext,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactElement,
  type ReactNode,
} from "react";
import {
  toastManager,
  type ToastManager,
  type ToastQueue,
} from "./ToastManager.js";

const context = createContext(toastManager);
context.displayName = "ToastManager";
const { Provider } = context;

/**
 * This is mostly an internal hook to implement the toast functionality but can
 * be used externally as well for custom toast behavior if the other hooks do
 * not support your needs.
 *
 * @see {@link useAddToast}
 * @see {@link useToastQueue}
 * @see {@link useRemoveToast}
 *
 * @returns The current `ToastManager` set in the `ToastManagerProvider`.
 * Defaults to {@link toastManager} if there are no parent providers.
 * @since 6.0.0
 */
export function useToastManager(): ToastManager {
  return useContext(context);
}

/**
 * @see {@link ToastManager.addToast}
 * @since 6.0.0
 */
export function useAddToast(): ToastManager["addToast"] {
  return useToastManager().addToast;
}

/**
 * @see {@link ToastManager.removeToast}
 * @since 6.0.0
 */
export function useRemoveToast(): ToastManager["removeToast"] {
  return useToastManager().removeToast;
}

/**
 * @param limit - the total number of toasts that can be visible at once.
 * @since 6.0.0
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
 * @since 6.0.0
 */
export interface ToastManagerProviderProps {
  children: ReactNode;

  /**
   * @defaultValue `toastManager`
   */
  manager?: ToastManager;
}

/**
 * **Client Component**
 *
 * This component can be used to implement separate instances of toasts if
 * required in your app. This probably shouldn't be required for most apps with
 * the default {@link addToast}, {@link removeToast}, and {@link clearToasts}
 * implementation.
 *
 * @see {@link ToastManager} for example usage.
 * @since 6.0.0
 */
export function ToastManagerProvider(
  props: ToastManagerProviderProps
): ReactElement {
  const { children, manager = toastManager } = props;

  return <Provider value={manager}>{children}</Provider>;
}
