"use client";
import { Button, addToast } from "@react-md/core";
import { type ReactElement } from "react";

export default function MultipleLinesToastExample(): ReactElement {
  return (
    <Button
      onClick={() => {
        addToast({
          children: (
            <>
              <p>This a toast that has multiple lines.</p>
              <p>Pretty exciting.</p>
            </>
          ),
        });
      }}
    >
      Add Toast
    </Button>
  );
}
