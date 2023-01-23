import type { ReactElement } from "react";
import type { ToastProps } from "./Toast";
import { Toast } from "./Toast";
import type { ConfigurableToastProps, QueuedToast } from "./ToastProvider";
import { HideToastProvider } from "./ToastProvider";

/**
 * @remarks \@since 6.0.0
 */
export interface CustomToastRendererProps {
  toast: ToastProps & QueuedToast;
  toastProps?: ConfigurableToastProps;
  hideToast(): void;
}

/**
 * A very simple default implementation that wraps the `Toast` in the
 * {@link HideToastProvider} and enables a close button if the
 * {@link QueuedToast.visibleTime} is `null` and there is no
 * {@link ToastProps.action}.
 *
 * @remarks \@since 6.0.0
 */
export function DefaultToastRenderer(
  props: CustomToastRendererProps
): ReactElement {
  const { toast, hideToast, toastProps = {} } = props;
  const { toastId, visibleTime, duplicates: _duplicates, ...overrides } = toast;

  return (
    <HideToastProvider key={toastId} value={hideToast}>
      <Toast
        {...toastProps}
        closeButton={
          toastProps.closeButton ||
          !!toastProps.closeButtonProps ||
          (!visibleTime && !overrides.action)
        }
        {...overrides}
        onEntered={(appearing) => {
          toastProps.onEntered?.(appearing);
          overrides.onEntered?.(appearing);
        }}
        onExited={() => {
          toastProps.onExited?.();
          overrides.onExited?.();
        }}
      >
        {overrides.children}
        {toastProps.children}
      </Toast>
    </HideToastProvider>
  );
}
