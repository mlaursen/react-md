import { Button, Snackbar, useAddToast } from "@react-md/core";
import type { ReactElement } from "react";

export function MultipleLinesExample(): ReactElement {
  const addToast = useAddToast();
  return (
    <>
      <Button
        onClick={() => {
          addToast({
            children: (
              <>
                <p>This a toast that has multiple lines.</p>
                <p>Pretty exciting.</p>
              </>
            ),
          });
          addToast({
            children: (
              <>
                <p>This a toast that has multiple lines.</p>
                <p>Pretty exciting.</p>
              </>
            ),
            closeButton: true,
          });
          addToast({
            children: (
              <>
                <p>This a toast that has multiple lines.</p>
                <p>Pretty exciting.</p>
              </>
            ),
            action: "Dismiss",
            closeButton: true,
          });
          addToast({
            children: (
              <>
                <p>This a toast that has multiple lines.</p>
                <p>Pretty exciting.</p>
              </>
            ),
            action: "Dismiss",
            stacked: true,
          });
          addToast({
            children: (
              <>
                <p>This a toast that has multiple lines.</p>
                <p>Pretty exciting.</p>
              </>
            ),
            action: "Dismiss",
            stacked: true,
            closeButton: true,
          });
        }}
      >
        Toast
      </Button>
      <Snackbar />
    </>
  );
}
