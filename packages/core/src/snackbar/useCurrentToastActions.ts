"use client";
import { createContext, useContext } from "react";

/**
 * A simplified version of the {@link ToastManager} that has the actions bound
 * to the current {@link QueuedToast.toastId}.
 *
 * @remarks \@since 6.0.0
 */
export interface CurrentToastActions {
  /** @see {@link ToastManager.clearTimer} */
  clearTimer(): void;
  /** @see {@link ToastManager.removeToast} */
  removeToast(transition: boolean): void;
  /** @see {@link ToastManager.startRemoveTimeout} */
  startRemoveTimeout(): void;
  /** @see {@link ToastManager.pauseRemoveTimeout} */
  pauseRemoveTimeout(): void;
  /** @see {@link ToastManager.resumeRemoveTimeout} */
  resumeRemoveTimeout(): void;
}

const context = createContext<CurrentToastActions | null>(null);
context.displayName = "CurrentToastActions";

/**
 * @remarks \@since 6.0.0
 * @internal
 */
export const { Provider: CurrentToastActionsProvider } = context;

/**
 * This is only required if you have multiple `Snackbar` implementations in your
 * app.
 *
 * @remarks \@since 6.0.0
 */
export function useCurrentToastActions(): CurrentToastActions {
  const actions = useContext(context);
  if (!actions) {
    throw new Error(
      "The `CurrentToastActionsProvider` has not been initialized"
    );
  }

  return actions;
}
