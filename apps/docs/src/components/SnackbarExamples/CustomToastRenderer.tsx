import type { ToastRendererProps, ToastTheme } from "@react-md/core";
import {
  Button,
  DefaultToastRenderer,
  Snackbar,
  ToastContent,
  ToastManager,
  ToastManagerProvider,
  useRemoveToast,
  wait,
} from "@react-md/core";
import { type ReactElement } from "react";
import { AsyncButton } from "src/components/AsyncButton";

const manager = new ToastManager();

type ToastId = "Undo" | "Redo" | "Offline" | "Success";

const addToast = (toastId: ToastId): void => {
  let theme: ToastTheme = "surface";
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
  // If you don't have access to the current `toastId`, you could also do:
  // const { removeToast } = useCurrentToastActions();
  // removeToast(true);

  const removeToast = useRemoveToast();

  return (
    <AsyncButton
      onClick={async () => {
        // pretend some API call or business logic
        await wait(3000);
        removeToast(toastId, true);
      }}
    >
      {toastId}
    </AsyncButton>
  );
}

function RenderToast(props: ToastRendererProps): ReactElement {
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
