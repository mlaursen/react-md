"use client";

import { AsyncButton } from "@react-md/core/button/AsyncButton";
import { Button } from "@react-md/core/button/Button";
import { type BackgroundColor } from "@react-md/core/cssUtils";
import {
  DefaultToastRenderer,
  type ToastRendererProps,
} from "@react-md/core/snackbar/DefaultToastRenderer";
import { Snackbar } from "@react-md/core/snackbar/Snackbar";
import { ToastContent } from "@react-md/core/snackbar/ToastContent";
import { ToastManager } from "@react-md/core/snackbar/ToastManager";
import {
  ToastManagerProvider,
  useRemoveToast,
} from "@react-md/core/snackbar/ToastManagerProvider";
import { useCurrentToastActions } from "@react-md/core/snackbar/useCurrentToastActions";
import { wait } from "@react-md/core/utils/wait";
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
      visibleTime = 10_000;
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
