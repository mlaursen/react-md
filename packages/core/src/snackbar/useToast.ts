import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from "react";
import type { UseStateSetter } from "../types";
import { usePageInactive } from "../usePageInactive";
import { useToggle } from "../useToggle";
import { useRemoveToast } from "./ToastProvider";

const noop = (): void => {
  // do nothing
};

const context = createContext(noop);
context.displayName = "HideToast";

/**
 * @remarks \@since 6.0.0
 * @internal
 */
export const { Provider: HideToastProvider } = context;

/**
 * This is only required if you have multiple `Snackbar` implementations in your
 * app.
 *
 * @remarks \@since 6.0.0
 */
export function useHideToast(): () => void {
  return useContext(context);
}

/**
 * @remarks \@since 6.0.0 Renamed from `DuplicateBehavior`
 */
export type ToastDuplicateBehavior = "allow" | "restart" | "update";

export interface ToastMeta {
  toastId: string;
  updated: number;
  duplicates: ToastDuplicateBehavior;
  visibleTime: number | null;
}

export interface ToastImplementation {
  visible: boolean;
  showToast(): void;
  hideToast(): void;
  removeToast(): void;
  startExitTimeout(): void;
  clearExitTimeout(): void;
  setToastVisibility: UseStateSetter<boolean>;
}

export function useToast(options: ToastMeta): ToastImplementation {
  const { toastId, visibleTime, duplicates, updated } = options;

  const exitTimeout = useRef<number | undefined>();
  const removeToastById = useRemoveToast();
  const {
    toggled: visible,
    disable: hideToast,
    enable: showToast,
    setToggled: setToastVisibility,
  } = useToggle(true);

  const removeToast = useCallback(() => {
    removeToastById(toastId);
  }, [removeToastById, toastId]);
  const clearExitTimeout = useCallback(() => {
    window.clearTimeout(exitTimeout.current);
  }, []);
  const startExitTimeout = useCallback(() => {
    if (visibleTime === null) {
      return;
    }

    clearExitTimeout();
    exitTimeout.current = window.setTimeout(() => {
      hideToast();
    }, visibleTime);
  }, [clearExitTimeout, hideToast, visibleTime]);

  const prevUpdatedRef = useRef(updated);
  useEffect(() => {
    const prevUpdated = prevUpdatedRef.current;
    prevUpdatedRef.current = updated;
    if (!visible || duplicates !== "restart" || updated === prevUpdated) {
      return;
    }

    startExitTimeout();
  }, [duplicates, startExitTimeout, updated, visible]);
  usePageInactive({
    disabled: !visible,
    onChange(active) {
      if (active) {
        startExitTimeout();
      } else {
        clearExitTimeout();
      }
    },
  });
  useEffect(() => {
    return () => {
      window.clearTimeout(exitTimeout.current);
    };
  }, []);

  return {
    visible,
    showToast,
    hideToast,
    removeToast,
    startExitTimeout,
    clearExitTimeout,
    setToastVisibility,
  };
}
