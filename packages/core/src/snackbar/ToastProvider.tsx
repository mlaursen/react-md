import { nanoid } from "nanoid";
import type { AriaRole, HTMLAttributes, ReactElement, ReactNode } from "react";
import { createContext, useContext, useSyncExternalStore } from "react";
import type { ButtonProps } from "../button";
import type {
  CSSTransitionClassNames,
  TransitionCallbacks,
  TransitionTimeout,
} from "../transition";
import type { PropsWithRef } from "../types";
import type { ToastContentProps } from "./ToastContent";

const noop = (): void => {
  // do nothing
};

/**
 * @remarks \@since 6.0.0
 */
export const DEFAULT_TOAST_VISIBLE_TIME = 5000;

/**
 * @remarks \@since 6.0.0
 */
export type ToastTheme =
  | "surface"
  | "primary"
  | "secondary"
  | "warning"
  | "error"
  | "success";

/**
 * @remarks \@since 6.0.0 Renamed from `DuplicateBehavior`
 */
export type ToastDuplicateBehavior = "allow" | "restart" | "update";

/**
 * @remarks \@since 6.0.0
 */
export interface ConfigurableToastProps
  extends HTMLAttributes<HTMLDivElement>,
    TransitionCallbacks {
  /**
   * Note: this default value will only be generated in the `Toast` component.
   *
   * @defaultValue `"toast-" + useId()`
   */
  id?: string;

  /**
   * @defaultValue `visibleTime === null ? "alert" : undefined`
   */
  role?: AriaRole;

  /**
   * When this is a string or React element, it will be rendered as the
   * `children` within a `Button`
   */
  action?: ButtonProps | ReactElement | string;

  /**
   * The toast's transition timeout for entering and exiting. This is **not**
   * how long the toast should remain visible.
   *
   * @defaultValue `SCALE_TIMEOUT`
   */
  timeout?: TransitionTimeout;

  /**
   * The toast's transition class names for entering and exiting.
   *
   * @defaultValue `SCALE_CLASSNAMES`
   */
  classNames?: CSSTransitionClassNames;

  /**
   * @defaultValue `"surface"`
   */
  theme?: ToastTheme;

  /**
   * Any additional props that should be provided to the `<div>` that surroundes
   * the toast `children`.
   */
  contentProps?: PropsWithRef<ToastContentProps, HTMLDivElement>;

  /**
   * @defaultValue `useIcon("close")`
   */
  closeIcon?: ReactNode;

  /**
   * Set this to `true` if a close button should be rendered to the right of the
   * `children`.
   *
   * @defaultValue `!!closeButtonProps`
   */
  closeButton?: boolean;

  /**
   * Use this prop to override most of the close button behavior. The
   */
  closeButtonProps?: ButtonProps;

  /**
   * Set this to `true` to stack the content above the {@link action}. It is not
   * recommended to enable this prop if the {@link closeButton} is enabled.
   *
   * @defaultValue `false`
   */
  stacked?: boolean;

  /**
   * If this is not provided, a `ResizeObserver` will be used to determine if
   * there are multiple lines of content.
   */
  multiline?: boolean;
}

/**
 * @remarks \@since 6.0.0
 */
export interface ToastOptions extends ConfigurableToastProps {
  /**
   * @defaultValue `nanoid()`
   */
  toastId?: string;

  /**
   *
   * @see {@link DEFAULT_TOAST_VISIBLE_TIME}
   * @defaultValue `DEFAULT_NOTIFICATION_TIME`
   */
  visibleTime?: number | null;

  duplicates?: ToastDuplicateBehavior;
}

/**
 * @remarks \@since 6.0.0
 */
export interface QueuedToast extends ToastOptions {
  /** @see {@link ToastOptions.toastId} */
  toastId: string;

  /** @see {@link ToastOptions.visibleTime} */
  visibleTime: number | null;

  duplicates: ToastDuplicateBehavior;
}

/**
 * @remarks \@since 6.0.0
 */
export type AddToast = (toast: ToastOptions) => void;
/**
 * @remarks \@since 6.0.0
 */
export type RemoveToast = (toast: ToastOptions) => void;

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
  #queue: QueuedToast[];
  #listeners: ToastCallback[];

  constructor() {
    this.#queue = [];
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

  subscribe = (callback: ToastCallback): (() => void) => {
    this.#listeners.push(callback);

    return () => {
      this.#listeners = this.#listeners.filter((cb) => cb !== callback);
    };
  };

  emit = (): void => {
    this.#queue = [...this.#queue];
    this.#listeners.forEach((callback) => {
      callback(this.#queue);
    });
  };

  addToast = (toast: ToastOptions): void => {
    const {
      toastId = nanoid(),
      visibleTime = DEFAULT_TOAST_VISIBLE_TIME,
      role = visibleTime === null ? "alert" : undefined,
      duplicates = "restart",
    } = toast;
    const existingIndex = toast.toastId
      ? this.#queue.findIndex((toast) => toast.toastId === toastId)
      : -1;
    if (existingIndex !== -1) {
      this.#queue[existingIndex] = {
        ...this.#queue[existingIndex],
        ...toast,
      };
    } else {
      this.#queue.push({
        ...toast,
        role,
        toastId,
        duplicates,
        visibleTime,
      });
    }

    this.emit();
  };

  popToast = (): void => {
    this.#queue.pop();
    this.emit();
  };

  removeToast = (toast: ToastOptions): void => {
    this.#queue = this.#queue.filter((item) => item !== toast);
    this.emit();
  };

  resetToasts = (): void => {
    this.#queue = [];
    this.emit();
  };

  getQueue = (): ToastQueue => {
    return this.#queue;
  };
}

/**
 * @remarks \@since 6.0.0
 * @internal
 */
export const toastManager = new ToastManager();
/**
 * @remarks \@since 6.0.0
 * @internal
 */
const toastManagerContext = createContext(toastManager);
toastManagerContext.displayName = "Toast";
const { Provider } = toastManagerContext;

/**
 * @remarks \@since 6.0.0
 * @internal
 */
const hideToastContext = createContext(noop);
hideToastContext.displayName = "HideToast";

/**
 * @remarks \@since 6.0.0
 * @internal
 */
export const { Provider: HideToastProvider } = hideToastContext;

/**
 * This is only required if you have multiple `Snackbar` implementations in your
 * app.
 *
 * @remarks \@since 6.0.0
 */
export function useHideToast(): () => void {
  return useContext(hideToastContext);
}

/**
 * @remarks \@since 6.0.0
 */
export const addToast = (toast: ToastOptions): void =>
  toastManager.addToast(toast);

/**
 * @remarks \@since 6.0.0
 */
export const removeToast = (toast: ToastOptions): void =>
  toastManager.removeToast(toast);

/**
 * @remarks \@since 6.0.0
 */
export const resetToasts = (): void => toastManager.resetToasts();

/**
 * @internal
 * @remarks \@since 6.0.0
 */
export function useToastManager(): ToastManager {
  return useContext(toastManagerContext);
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
export function useResetToasts(): () => void {
  return useToastManager().resetToasts;
}

/**
 * @remarks \@since 6.0.0
 */
export function useToastQueue(): ToastQueue {
  const manager = useToastManager();

  return useSyncExternalStore(
    manager.subscribe,
    manager.getQueue,
    manager.getQueue
  );
}

/**
 * @remarks \@since 6.0.0
 */
export interface ToastProviderProps {
  children: ReactNode;

  /**
   * @defaultValue `toastManager`
   */
  manager?: ToastManager;
}

/**
 * @remarks \@since 6.0.0
 */
export function ToastProvider(props: ToastProviderProps): ReactElement {
  const { children, manager = toastManager } = props;

  return <Provider value={manager}>{children}</Provider>;
}
