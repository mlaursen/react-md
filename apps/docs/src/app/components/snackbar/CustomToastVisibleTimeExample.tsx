"use client";
import { Button, addToast } from "@react-md/core";
import { type ReactElement } from "react";

export default function CustomToastVisibleTimeExample(): ReactElement {
  return (
    <Button
      onClick={() => {
        addToast({
          children: "Wait 3 seconds instead of 5",
          visibleTime: 3000,
        });
      }}
    >
      Toast!
    </Button>
  );
}
