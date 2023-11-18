"use client";
import { Button, addToast } from "@react-md/core";
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
