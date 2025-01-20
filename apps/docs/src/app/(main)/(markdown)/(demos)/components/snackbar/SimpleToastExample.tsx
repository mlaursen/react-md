"use client";

import { Button } from "@react-md/core/button/Button";
import { addToast } from "@react-md/core/snackbar/ToastManager";
import { type ReactElement } from "react";

export default function SimpleToastExample(): ReactElement {
  return (
    <Button
      onClick={() => {
        addToast({ children: "Hello, world!" });
      }}
    >
      Add Toast
    </Button>
  );
}
