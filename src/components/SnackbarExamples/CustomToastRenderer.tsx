import type { ToastRendererProps, ToastTheme } from "@react-md/core";
import {
  Button,
  HideToastProvider,
  Snackbar,
  Toast,
  ToastContent,
  ToastManager,
  ToastManagerProvider,
  useToast,
} from "@react-md/core";
import type { ReactElement } from "react";
import { AsyncButton } from "src/components/AsyncButton";
import { delay } from "src/utils/delay";

const manager = new ToastManager();

type ToastId = "Undo" | "Redo" | "Offline" | "Success";

const addToast = (toastId: ToastId): void => manager.addToast({ toastId });

function assertKnownToast(_toastId: string): asserts _toastId is ToastId {
  // pretend assertion
}

function RenderToast(props: ToastRendererProps): ReactElement {
  const {
    toastId,
    updated,
    duplicates,
    visibleTime: propVisibleTime,
    toastDefaults: _toastDefaults,
    ...remaining
  } = props;
  assertKnownToast(toastId);
  let theme: ToastTheme = "surface";
  let visibleTime = propVisibleTime;
  let closeButton = true;
  switch (toastId) {
    case "Offline":
      theme = "error";
      // pretend like you have some logic to check online status
      visibleTime = 10000;
      closeButton = false;
      break;
    case "Undo":
      theme = "warning";
      break;
    case "Success":
      theme = "success";
      break;
  }

  const { visible, hideToast, removeToast, startExitTimeout } = useToast({
    toastId,
    updated,
    duplicates,
    visibleTime,
  });

  return (
    <HideToastProvider value={hideToast}>
      <Toast
        theme={theme}
        closeButton={closeButton}
        {...remaining}
        visible={visible}
        onEntered={startExitTimeout}
        onExited={removeToast}
        disableToastContent
      >
        <ToastContent>{toastId}</ToastContent>
        {toastId !== "Offline" && toastId !== "Success" && (
          <AsyncButton
            onClick={async () => {
              // pretend some API call or business logic
              await delay(3000);
              hideToast();
            }}
          >
            {toastId}
          </AsyncButton>
        )}
      </Toast>
    </HideToastProvider>
  );
}

export function CustomToastRenderer(): ReactElement {
  return (
    <ToastManagerProvider manager={manager}>
      <Button
        onClick={() => {
          addToast("Success");
          addToast("Undo");
          addToast("Redo");
          addToast("Offline");
        }}
      >
        Toast!
      </Button>
      <Snackbar renderToast={RenderToast} />
    </ToastManagerProvider>
  );
}
