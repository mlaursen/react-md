"use client";
import { Button } from "@react-md/core/button/Button";
import { addToast } from "@react-md/core/snackbar/ToastManager";
import { type ReactElement } from "react";

export default function ActionAndCloseButtonExample(): ReactElement {
  return (
    <Button
      onClick={() => {
        addToast({
          children: "Message.",
          closeButton: true,
          action: {
            onClick: () => {
              // do something,
            },
            children: "Undo",
          },
        });
      }}
    >
      Toast!
    </Button>
  );
}
