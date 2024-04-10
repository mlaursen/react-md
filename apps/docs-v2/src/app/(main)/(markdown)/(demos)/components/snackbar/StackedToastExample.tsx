"use client";
import { Button } from "@react-md/core/button/Button";
import { addToast } from "@react-md/core/snackbar/ToastManager";
import { type ReactElement } from "react";

export default function StackedToastExample(): ReactElement {
  return (
    <>
      <Button
        onClick={() => {
          addToast({
            children: "Hello, world!",
            stacked: true,
            action: "Action",
          });
        }}
      >
        Stacked
      </Button>
      <Button
        onClick={() => {
          addToast({
            children: "Hello, world!",
            stacked: true,
            action: "Action",
            closeButton: true,
          });
        }}
      >
        With Close Button
      </Button>
    </>
  );
}
