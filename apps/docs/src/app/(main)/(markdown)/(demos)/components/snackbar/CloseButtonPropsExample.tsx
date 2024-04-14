"use client";
import { Button } from "@react-md/core/button/Button";
import { addToast } from "@react-md/core/snackbar/ToastManager";
import { type ReactElement } from "react";

export default function CloseButtonPropsExample(): ReactElement {
  return (
    <Button
      onClick={() => {
        addToast({
          children: "Message.",
          closeButtonProps: {
            theme: "warning",
            themeType: "outline",
            buttonType: "text",
            children: "Close",
          },
        });
      }}
    >
      Toast!
    </Button>
  );
}
