import { Button, Snackbar, useAddToast } from "@react-md/core";
import type { ReactElement } from "react";

export function UsingThemesExample(): ReactElement {
  const addToast = useAddToast();
  return (
    <>
      <Button
        onClick={() => {
          addToast({
            children: "Surface theme (default)",
            theme: "surface",
          });
          addToast({
            children: "Primary theme",
            theme: "primary",
          });
          addToast({
            children: "Secondary theme",
            theme: "secondary",
          });
          addToast({
            children: "Error theme",
            theme: "error",
          });
          addToast({
            children: "Warning theme",
            theme: "warning",
          });
          addToast({
            children: "Success theme",
            theme: "success",
          });
        }}
      >
        Toast!
      </Button>
      <Snackbar />
    </>
  );
}
