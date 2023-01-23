import { Button, Snackbar, useAddToast } from "@react-md/core";
import type { ReactElement } from "react";

export function SimpleExample(): ReactElement {
  const addToast = useAddToast();
  return (
    <>
      <Button onClick={() => addToast({ children: "Hello, world!" })}>
        Toast
      </Button>
      <Snackbar />
    </>
  );
}
