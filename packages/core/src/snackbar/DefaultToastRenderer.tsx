"use client";
import { useEffect, useMemo, type ReactElement } from "react";
import { usePageInactive } from "../usePageInactive.js";
import { Toast, type ConfigurableToastProps } from "./Toast.js";
import { type ToastMeta } from "./ToastManager.js";
import { useToastManager } from "./ToastManagerProvider.js";
import {
  CurrentToastActionsProvider,
  type CurrentToastActions,
} from "./useCurrentToastActions.js";

const noop = (): void => {
  // do nothing
};

/**
 * @since 6.0.0
 */
export interface ToastRendererProps extends ConfigurableToastProps, ToastMeta {
  /**
   * Optional props that should be passed to each `Toast` from the `Snackbar`.
   * This is a great way to enforce each toast having a close button, a custom
   * class name, theme, etc.
   */
  toastDefaults?: ConfigurableToastProps;
}

/**
 * **Client Component**
 *
 * This is the default implementation for rendering toasts that will:
 *
 * - controls the visibility of the toast with the {@link useToast} hook
 * - add a `closeButton` if the {@link ToastRendererProps.toastDefaults} has
 *   `closeButton === true` or the `closeButtonProps` exists.
 * - add a `closeButton` if the `visibleTime` is `null` and the current toast
 *   does not have an `action` or `actionButton`
 * - ensures both the toast's `onEntered` and the {@link ToastRendererProps.toastDefaults}'s
 *   `onEntered` are called
 * - ensures both the toast's `onExited` and the {@link ToastRendererProps.toastDefaults}'s
 *   `onExited` are called
 * - always renders the {@link ToastRendererProps.toastDefaults}'s `children`
 *   'after the optional toast's `children`
 *
 * @since 6.0.0
 */
export function DefaultToastRenderer(props: ToastRendererProps): ReactElement {
  const {
    toastId,
    paused,
    visible,
    priority: _priority,
    duplicates: _duplicates,
    visibleTime,
    onExited = noop,
    onEntered = noop,
    onMouseEnter = noop,
    onMouseLeave = noop,
    toastDefaults = {},
    ...remaining
  } = props;
  const {
    closeButtonProps,
    closeButton = !!closeButtonProps || !!remaining.closeButtonProps,
    onEntered: defaultEntered = noop,
    onExited: defaultExited = noop,
    onMouseEnter: defaultMouseEnter = noop,
    onMouseLeave: defaultMouseLeave = noop,
    ...defaults
  } = toastDefaults;

  const toastManager = useToastManager();
  const currentToastActions = useMemo<CurrentToastActions>(
    () => ({
      clearTimer() {
        toastManager.clearTimer(toastId);
      },
      removeToast(transition) {
        toastManager.removeToast(toastId, transition);
      },
      startRemoveTimeout() {
        toastManager.startRemoveTimeout(toastId);
      },
      pauseRemoveTimeout() {
        toastManager.pauseRemoveTimeout(toastId);
      },
      resumeRemoveTimeout() {
        toastManager.resumeRemoveTimeout(toastId);
      },
    }),
    [toastId, toastManager]
  );
  useEffect(() => {
    return () => {
      currentToastActions.clearTimer();
    };
  }, [currentToastActions]);
  usePageInactive({
    disabled: !visible,
    onChange(active) {
      if (active) {
        currentToastActions.resumeRemoveTimeout();
      } else {
        currentToastActions.pauseRemoveTimeout();
      }
    },
  });

  return (
    <CurrentToastActionsProvider value={currentToastActions}>
      <Toast
        closeButton={
          closeButton ||
          (!visibleTime && !remaining.action && !remaining.actionButton)
        }
        closeButtonProps={closeButtonProps}
        {...defaults}
        {...remaining}
        paused={paused}
        visible={visible}
        onEntered={(appearing) => {
          defaultEntered(appearing);
          onEntered(appearing);
          currentToastActions.startRemoveTimeout();
        }}
        onExited={() => {
          defaultExited();
          onExited();
          currentToastActions.removeToast(false);
        }}
        onMouseEnter={(event) => {
          defaultMouseEnter(event);
          onMouseEnter(event);
          currentToastActions.pauseRemoveTimeout();
        }}
        onMouseLeave={(event) => {
          defaultMouseLeave(event);
          onMouseLeave(event);
          currentToastActions.resumeRemoveTimeout();
        }}
      >
        {defaults.children}
        {remaining.children}
      </Toast>
    </CurrentToastActionsProvider>
  );
}
