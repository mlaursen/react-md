import { Button, Snackbar, useAddToast } from "@react-md/core";
import type { ReactElement } from "react";

export function ActionableExample(): ReactElement {
  const addToast = useAddToast();
  return (
    <>
      <Button
        onClick={() => {
          addToast({
            children: "This toast has an optional action",
            action: "Undo",
          });
        }}
      >
        Toast!
      </Button>
      <Snackbar />
    </>
  );
}
