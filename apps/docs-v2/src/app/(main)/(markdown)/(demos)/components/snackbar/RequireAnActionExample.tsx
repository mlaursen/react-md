"use client";
import { Button } from "@react-md/core/button/Button";
import { addToast } from "@react-md/core/snackbar/ToastManager";
import { type ReactElement } from "react";

export default function RequireAnActionExample(): ReactElement {
  return (
    <Button
      onClick={() => {
        addToast({
          children: "Message",
          action: {
            children: "Must click",
            onClick: () => {
              // do something
            },
          },
          visibleTime: null,
        });
      }}
    >
      Toast!
    </Button>
  );
}
