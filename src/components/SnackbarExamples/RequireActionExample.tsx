import { Button, Snackbar, useAddToast } from "@react-md/core";
import type { ReactElement } from "react";

export function RequireActionExample(): ReactElement {
  const addToast = useAddToast();
  return (
    <>
      <Button
        onClick={() => {
          addToast({
            children: "This requires an action",
            action: "Continue?",
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
