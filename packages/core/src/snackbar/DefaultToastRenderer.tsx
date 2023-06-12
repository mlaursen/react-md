import type { ReactElement } from "react";
import { useCallback, useEffect } from "react";
import { usePageInactive } from "../usePageInactive";
import type { ConfigurableToastProps } from "./Toast";
import { Toast } from "./Toast";
import type { ToastMeta } from "./ToastManagerProvider";
import { useToastManager } from "./ToastManagerProvider";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { RemoveToastProvider } from "./useRemoveToast";

const noop = (): void => {
  // do nothing
};

/**
 * @remarks \@since 6.0.0
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
 * @remarks \@since 6.0.0
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
    closeButton = !!closeButtonProps,
    onEntered: defaultEntered = noop,
    onExited: defaultExited = noop,
    onMouseEnter: defaultMouseEnter = noop,
    onMouseLeave: defaultMouseLeave = noop,
    ...defaults
  } = toastDefaults;

  const toastManager = useToastManager();
  useEffect(() => {
    return () => {
      toastManager.clearTimer(toastId);
    };
  }, [toastManager, toastId]);
  usePageInactive({
    disabled: !visible,
    onChange(active) {
      if (active) {
        toastManager.resumeRemoveTimeout(toastId);
      } else {
        toastManager.pauseRemoveTimeout(toastId);
      }
    },
  });

  return (
    <RemoveToastProvider
      value={useCallback(() => {
        toastManager.removeToast(toastId, true);
      }, [toastManager, toastId])}
    >
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
          toastManager.startRemoveTimeout(toastId);
        }}
        onExited={() => {
          defaultExited();
          onExited();
          toastManager.removeToast(toastId, false);
        }}
        onMouseEnter={(event) => {
          defaultMouseEnter(event);
          onMouseEnter(event);
          toastManager.pauseRemoveTimeout(toastId);
        }}
        onMouseLeave={(event) => {
          defaultMouseLeave(event);
          onMouseLeave(event);
          toastManager.resumeRemoveTimeout(toastId);
        }}
      >
        {defaults.children}
        {remaining.children}
      </Toast>
    </RemoveToastProvider>
  );
}
