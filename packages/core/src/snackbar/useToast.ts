import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import type { UseStateSetter } from "../types";
import { usePageInactive } from "../usePageInactive";
import { useToggle } from "../useToggle";
import { useRemoveToast } from "./ToastManagerProvider";

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

/**
 * @remarks \@since 6.0.0
 */
export interface ToastMeta {
  toastId: string;
  updated: number;
  duplicates: ToastDuplicateBehavior;
  visibleTime: number | null;
}

/**
 * @remarks \@since 6.0.0
 */
export interface ToastImplementation {
  paused: boolean;
  visible: boolean;
  showToast(): void;
  hideToast(): void;
  removeToast(): void;
  startExitTimeout(): void;
  clearExitTimeout(): void;
  pauseExitTimeout(): void;
  resumeExitTimeout(): void;
  setToastVisibility: UseStateSetter<boolean>;
}

/**
 * @remarks \@since 6.0.0
 */
export function useToast(options: ToastMeta): ToastImplementation {
  const { toastId, visibleTime, duplicates, updated } = options;

  const removeToastById = useRemoveToast();
  const {
    toggled: visible,
    disable: hideToast,
    enable: showToast,
    setToggled: setToastVisibility,
  } = useToggle(true);

  const [paused, setPaused] = useState(false);
  const startTime = useRef<number | null>(null);
  const ellapsedTime = useRef<number>(0);
  const exitTimeout = useRef<number | undefined>();

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

    let duration = visibleTime;
    if (ellapsedTime.current) {
      duration -= ellapsedTime.current;
    }

    startTime.current = Date.now();
    exitTimeout.current = window.setTimeout(() => {
      hideToast();
    }, duration);
  }, [clearExitTimeout, hideToast, visibleTime]);

  const prevUpdatedRef = useRef(updated);
  useEffect(() => {
    const prevUpdated = prevUpdatedRef.current;
    prevUpdatedRef.current = updated;
    if (!visible || duplicates !== "restart" || updated === prevUpdated) {
      return;
    }

    ellapsedTime.current = 0;
    startExitTimeout();
  }, [duplicates, startExitTimeout, updated, visible]);

  // this inactive state is used so that the pause/exit can't be called while
  // the page is inactive from outside consumers (i.e., mouse enter/leave
  // events)
  const inactive = useRef(false);
  const pauseExitTimeout = useCallback(() => {
    if (!visibleTime || !startTime.current || inactive.current) {
      return;
    }

    clearExitTimeout();
    ellapsedTime.current =
      Date.now() - startTime.current + ellapsedTime.current;
    setPaused(true);
  }, [clearExitTimeout, visibleTime]);
  const resumeExitTimeout = useCallback(() => {
    if (!ellapsedTime.current || inactive.current) {
      return;
    }

    startExitTimeout();
    setPaused(false);
  }, [startExitTimeout]);

  usePageInactive({
    disabled: !visible,
    onChange(active) {
      if (active) {
        inactive.current = false;
        resumeExitTimeout();
      } else {
        pauseExitTimeout();
        inactive.current = true;
      }
    },
  });
  useEffect(() => {
    return () => {
      window.clearTimeout(exitTimeout.current);
    };
  }, []);

  return {
    paused,
    visible,
    showToast,
    hideToast,
    removeToast,
    startExitTimeout,
    clearExitTimeout,
    pauseExitTimeout,
    resumeExitTimeout,
    setToastVisibility,
  };
}
