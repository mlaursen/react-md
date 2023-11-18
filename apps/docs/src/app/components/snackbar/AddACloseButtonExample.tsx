"use client";
import { Button, addToast } from "@react-md/core";
import { type ReactElement } from "react";

export default function AddACloseButtonExample(): ReactElement {
  return (
    <Button
      onClick={() => {
        addToast({ children: "Message.", closeButton: true });
      }}
    >
      Toast!
    </Button>
  );
}
