import { Button, Snackbar, useAddToast } from "@react-md/core";
import type { ReactElement } from "react";

export function IncludeCloseButtonExample(): ReactElement {
  const addToast = useAddToast();
  return (
    <>
      <Button
        onClick={() => {
          addToast({
            children: "Here's a message.",
            closeButton: true,
          });
          addToast({
            children: "This is a message with an action.",
            action: "Undo",
            closeButton: true,
          });
          addToast({
            children: "This toast must manually be dismissed.",
            visibleTime: null,
          });
          addToast({
            children: "This toast must manually be dismissed.",
            action: "Undo",
            closeButton: true,
            visibleTime: null,
          });
        }}
      >
        Toast!
      </Button>
      <Snackbar />
    </>
  );
}
