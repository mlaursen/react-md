"use client";
import { Button, addToast } from "@react-md/core";
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
