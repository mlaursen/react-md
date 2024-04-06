"use client";
import {
  AsyncButton,
  Button,
  DefaultToastRenderer,
  Snackbar,
  ToastContent,
  ToastManager,
  ToastManagerProvider,
  useRemoveToast,
  wait,
  type BackgroundColor,
  type ToastRendererProps,
  useCurrentToastActions,
} from "react-md";
import { type ReactElement } from "react";

export default function CustomToastRendererExample(): ReactElement {
  return (
    <ToastManagerProvider manager={manager}>
      <Button
        onClick={() => {
          addToast("Offline");
          addToast("Success");
          addToast("Undo");
          addToast("Redo");
        }}
      >
        Toast!
      </Button>
      <Snackbar renderToast={CustomToastRenderer} />
    </ToastManagerProvider>
  );
}

type ToastId = "Undo" | "Redo" | "Offline" | "Success";

const addToast = (toastId: ToastId): void => {
  let theme: BackgroundColor = "surface";
  let visibleTime: number | undefined | null;
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

  manager.addToast({
    toastId,
    theme,
    visibleTime,
    closeButton,
  });
};

function assertKnownToast(_toastId: string): asserts _toastId is ToastId {
  // pretend assertion
}

function AsyncAction({ toastId }: { toastId: ToastId }): ReactElement {
  // If the current `toastId` is not available for some reason, use the
  // `removeToast` returned from `useCurrentToastActions` instead.
  const removeToast = useRemoveToast();
  const { pauseRemoveTimeout } = useCurrentToastActions();

  return (
    <AsyncButton
      onClick={async () => {
        pauseRemoveTimeout();
        // pretend some API call or business logic
        await wait(3000);

        // Use `false` if the toast exit transition should not occur when
        // removing the toast
        removeToast(toastId, true);
      }}
    >
      {toastId}
    </AsyncButton>
  );
}

function CustomToastRenderer(props: ToastRendererProps): ReactElement {
  const { toastId } = props;
  assertKnownToast(toastId);

  return (
    <DefaultToastRenderer {...props} disableToastContent>
      <ToastContent>{toastId}</ToastContent>
      {toastId !== "Offline" && toastId !== "Success" && (
        <AsyncAction toastId={toastId} />
      )}
    </DefaultToastRenderer>
  );
}

const manager = new ToastManager();
