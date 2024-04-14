"use client";
import { Button } from "@react-md/core/button/Button";
import { addToast } from "@react-md/core/snackbar/ToastManager";
import { type ReactElement } from "react";

export default function ActionableToastExample(): ReactElement {
  return (
    <Button
      onClick={() => {
        addToast({
          children: "This toast has an optional action",
          action: {
            children: "Undo",
            onClick: () => {
              // do something
            },
          },
        });
      }}
    >
      Toast!
    </Button>
  );
}
