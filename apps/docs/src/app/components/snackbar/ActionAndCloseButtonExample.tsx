"use client";
import { Button, addToast } from "@react-md/core";
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
