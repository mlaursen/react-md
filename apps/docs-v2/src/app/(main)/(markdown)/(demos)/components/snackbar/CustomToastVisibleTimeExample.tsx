"use client";
import { Button } from "@react-md/core/button/Button";
import { addToast } from "@react-md/core/snackbar/ToastManager";
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
