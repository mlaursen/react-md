import { Button, SCALE_TIMEOUT, Snackbar, useAddToast } from "@react-md/core";
import type { ReactElement } from "react";
import { useEffect, useState } from "react";

function ActiveTime(): ReactElement {
  const [time, setTime] = useState(0);

  useEffect(() => {
    let interval: number | undefined;
    const timeout = window.setTimeout(() => {
      interval = window.setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }, SCALE_TIMEOUT.enter);

    return () => {
      window.clearTimeout(timeout);
      window.clearInterval(interval);
    };
  }, []);

  return <div>{`Visible for ${time} seconds`}</div>;
}

export function PreventingDuplicatesExample(): ReactElement {
  const addToast = useAddToast();
  const [toasted, setToasted] = useState(false);
  useEffect(() => {
    if (!toasted) {
      return;
    }

    let timeout = window.setTimeout(() => {
      addToast({
        toastId: "message-id",
        children: "This will replace the content!",
      });

      timeout = window.setTimeout(() => {
        // this will just reset the time
        addToast({ toastId: "message-id" });

        timeout = window.setTimeout(() => {
          addToast({
            toastId: "message-id",
            children: "Replacing again, but no restart",
            duplicates: "update",
          });
        }, 3000);
      }, 3000);
    }, 3000);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [addToast, toasted]);
  return (
    <>
      <Button
        disabled={toasted}
        onClick={() => {
          setToasted(true);
          addToast({
            toastId: "message-id",
            children: "Message 1",
          });
        }}
      >
        Toast!
      </Button>
      <Snackbar
        toastDefaults={{
          closeButton: true,
          children: <ActiveTime />,
          onExiting: () => {
            setToasted(false);
          },
        }}
      />
    </>
  );
}
