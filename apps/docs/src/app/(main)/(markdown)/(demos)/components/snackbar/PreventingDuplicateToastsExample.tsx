"use client";

import { AsyncButton } from "@react-md/core/button/AsyncButton";
import { Snackbar } from "@react-md/core/snackbar/Snackbar";
import { ToastManager } from "@react-md/core/snackbar/ToastManager";
import { ToastManagerProvider } from "@react-md/core/snackbar/ToastManagerProvider";
import { DEFAULT_SCALE_TIMEOUT } from "@react-md/core/transition/useScaleTransition";
import { type UseStateSetter } from "@react-md/core/types";
import { type ReactElement, useEffect, useState } from "react";

const TOAST_ID = "toast-id-1";
const manager = new ToastManager();

export default function PreventingDuplicateToastsExample(): ReactElement {
  const [running, setRunning] = useMultipleToasts();
  return (
    <ToastManagerProvider manager={manager}>
      <AsyncButton
        loading={running}
        onClick={() => {
          setRunning(true);
          manager.addToast({
            toastId: TOAST_ID,
            children: "Message 1",
          });
        }}
      >
        Toast!
      </AsyncButton>
      <Snackbar
        toastDefaults={{
          children: <ActiveTime />,
          closeButton: true,
          onExited: () => {
            setRunning(false);
          },
        }}
      />
    </ToastManagerProvider>
  );
}

function useMultipleToasts(): [
  running: boolean,
  setRunning: UseStateSetter<boolean>,
] {
  const [running, setRunning] = useState(false);
  useEffect(() => {
    if (!running) {
      return;
    }

    let timeout = window.setTimeout(() => {
      manager.addToast({
        toastId: TOAST_ID,
        children: "This will replace the content!",
      });

      timeout = window.setTimeout(() => {
        // this will just reset the time
        manager.addToast({ toastId: TOAST_ID });

        timeout = window.setTimeout(() => {
          manager.addToast({
            toastId: TOAST_ID,
            children: "Replacing again, but no restart",
            duplicates: "update",
          });
        }, 3000);
      }, 3000);
    }, 3000);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [running]);

  return [running, setRunning];
}

function ActiveTime(): ReactElement {
  const [time, setTime] = useState(0);

  useEffect(() => {
    let interval: number | undefined;
    const timeout = window.setTimeout(() => {
      interval = window.setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }, DEFAULT_SCALE_TIMEOUT.enter);

    return () => {
      window.clearTimeout(timeout);
      window.clearInterval(interval);
    };
  }, []);

  return <div>{`Visible for ${time} seconds`}</div>;
}
