import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { NonNullMutableRef } from "../types";
import type { ToastProps } from "./Toast";
import type { QueuedToast } from "./ToastProvider";
import { useToastManager, useToastQueue } from "./ToastProvider";

const noop = (): void => {
  // do nothing
};

/**
 * @internal
 * @remarks \@since 6.0.0
 */
type SetToastVisibility = (toastId: string, visible: boolean) => void;

/**
 * @internal
 * @remarks \@since 6.0.0
 */
type TimeoutRecord = Record<string, number>;

/**
 * @internal
 * @remarks \@since 6.0.0
 */
interface StartExitTimeoutOptions {
  toastId: string;
  visibleTime: number | null;
  timeouts: NonNullMutableRef<TimeoutRecord>;
  setToastVisibility: SetToastVisibility;
}

/**
 * @internal
 * @remarks \@since 6.0.0
 */
const startExitTimeout = (options: StartExitTimeoutOptions): void => {
  const { toastId, visibleTime, timeouts, setToastVisibility } = options;
  if (!visibleTime) {
    return;
  }

  window.clearTimeout(timeouts.current[toastId]);
  timeouts.current[toastId] = window.setTimeout(() => {
    setToastVisibility(toastId, false);
  }, visibleTime);
};

/**
 * @internal
 * @remarks \@since 6.0.0
 */
const clearTimeouts = (timeouts: NonNullMutableRef<TimeoutRecord>): void => {
  Object.values(timeouts.current).forEach((timeout) => {
    window.clearTimeout(timeout);
  });
  timeouts.current = {};
};

/**
 * @internal
 * @remarks \@since 6.0.0
 */
interface SnackbarOptions {
  limit?: number;
}

/**
 * @internal
 * @remarks \@since 6.0.0
 */
interface SnackbarImplementation {
  queue: readonly (ToastProps & QueuedToast)[];
  setToastVisibility: SetToastVisibility;
}

/**
 * @internal
 * @remarks \@since 6.0.0
 */
export function useSnackbar(options: SnackbarOptions): SnackbarImplementation {
  const { limit = 1 } = options;

  const manager = useToastManager();
  const toastQueue = useToastQueue();
  const queue = useMemo(() => toastQueue.slice(0, limit), [limit, toastQueue]);
  const entered = useRef<Record<string, boolean>>({});
  const [visible, setVisible] = useState(new Map<string, boolean>());
  const timeouts = useRef<TimeoutRecord>({});
  useEffect(() => {
    return () => {
      clearTimeouts(timeouts);
    };
  }, []);

  const setToastVisibility = useCallback(
    (toastId: string, visible: boolean | null) => {
      setVisible((prevVisible) => {
        const next = new Map(prevVisible);
        if (!visible) {
          delete entered.current[toastId];
        }
        if (visible === null) {
          next.delete(toastId);
        } else {
          next.set(toastId, visible);
        }
        return next;
      });
    },
    []
  );

  useEffect(() => {
    if (!queue.length) {
      return;
    }

    const callback = (event: Event): void => {
      if (event.type === "blur") {
        clearTimeouts(timeouts);
      } else {
        queue.forEach((toast) => {
          const { toastId, visibleTime } = toast;
          startExitTimeout({
            toastId,
            visibleTime,
            timeouts,
            setToastVisibility,
          });
        });
      }
    };

    window.addEventListener("blur", callback);
    window.addEventListener("focus", callback);
    return () => {
      window.removeEventListener("blur", callback);
      window.removeEventListener("focus", callback);
    };
  }, [queue, setToastVisibility]);

  const prevQueueRef = useRef(queue);
  useEffect(() => {
    const prevQueue = prevQueueRef.current;
    prevQueueRef.current = queue;
    if (!queue.length || !prevQueue.length) {
      return;
    }

    for (let i = 0; i < queue.length; i += 1) {
      const currentToast = queue[i];
      const { toastId, visibleTime, duplicates } = currentToast;
      const prevToast = prevQueue[i];
      if (
        entered.current[toastId] &&
        currentToast !== prevToast &&
        prevToast?.toastId === toastId &&
        duplicates === "restart"
      ) {
        startExitTimeout({
          toastId,
          timeouts,
          visibleTime,
          setToastVisibility,
        });
      }
    }
  }, [queue, setToastVisibility]);

  return {
    queue: queue.map((toast) => {
      const { toastId, visibleTime, onEntered = noop, onExited = noop } = toast;

      return {
        ...toast,
        toastId,
        visible: visible.get(toastId) || false,
        onEntered(appearing) {
          onEntered(appearing);
          entered.current[toastId] = true;
          startExitTimeout({
            toastId,
            timeouts,
            visibleTime,
            setToastVisibility,
          });
        },
        onExited() {
          onExited();
          if (visible.has(toastId)) {
            window.clearTimeout(timeouts.current[toastId]);
            delete timeouts.current[toastId];
            manager.removeToast(toast);
            setToastVisibility(toastId, null);
          } else {
            setToastVisibility(toastId, true);
          }
        },
      };
    }),
    setToastVisibility,
  };
}
