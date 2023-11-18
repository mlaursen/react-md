"use client";
import { Button, addToast } from "@react-md/core";
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
