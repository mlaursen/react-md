"use client";
import { Button, addToast } from "@react-md/core";
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
