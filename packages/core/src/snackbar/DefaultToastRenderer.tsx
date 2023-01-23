import type { ReactElement } from "react";
import type { ConfigurableToastProps } from "./Toast";
import { Toast } from "./Toast";
import type { ToastMeta } from "./useToast";
import { HideToastProvider, useToast } from "./useToast";

const noop = (): void => {
  // do nothing
};

/**
 * @remarks \@since 6.0.0
 */
export interface ToastRendererProps extends ConfigurableToastProps, ToastMeta {
  toastDefaults?: ConfigurableToastProps;
}

/**
 * @remarks \@since 6.0.0
 */
export function DefaultToastRenderer(props: ToastRendererProps): ReactElement {
  const {
    toastId,
    updated,
    duplicates,
    visibleTime,
    onExited = noop,
    onEntered = noop,
    toastDefaults = {},
    ...remaining
  } = props;
  const {
    closeButtonProps,
    closeButton = !!closeButtonProps,
    onEntered: defaultOnEntered = noop,
    onExited: defaultOnExited = noop,
    ...defaults
  } = toastDefaults;

  const { visible, hideToast, removeToast, startExitTimeout } = useToast({
    toastId,
    updated,
    duplicates,
    visibleTime,
  });

  return (
    <HideToastProvider value={hideToast}>
      <Toast
        closeButton={closeButton || (!visibleTime && !remaining.action)}
        closeButtonProps={closeButtonProps}
        {...defaults}
        {...remaining}
        visible={visible}
        onEntered={(appearing) => {
          defaultOnEntered(appearing);
          onEntered(appearing);
          startExitTimeout();
        }}
        onExited={() => {
          defaultOnExited();
          onExited();
          removeToast();
        }}
      >
        {defaults.children}
        {remaining.children}
      </Toast>
    </HideToastProvider>
  );
}
