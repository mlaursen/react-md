"use client";

import { Button } from "@react-md/core/button/Button";
import { addToast } from "@react-md/core/snackbar/ToastManager";
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
