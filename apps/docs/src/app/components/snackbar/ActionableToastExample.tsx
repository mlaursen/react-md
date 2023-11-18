"use client";
import { Button, addToast } from "@react-md/core";
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
