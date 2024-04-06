"use client";
import {
  Button,
  Snackbar,
  ToastManager,
  ToastManagerProvider,
  addToast,
  useAddToast,
} from "react-md";
import { type ReactElement } from "react";

const manager = new ToastManager();

export default function CustomToastManagerExample(): ReactElement {
  return (
    <ToastManagerProvider manager={manager}>
      <Content />
      <Snackbar
        toastDefaults={{
          theme: "secondary",
          closeButton: true,
        }}
      />
    </ToastManagerProvider>
  );
}

function Content(): ReactElement {
  const currentAddToast = useAddToast();

  return (
    <>
      <Button
        onClick={() => {
          currentAddToast({ children: "Context initiated toast." });
        }}
      >
        Context Toast
      </Button>
      <Button
        onClick={() => {
          manager.addToast({ children: "Manager initiated toast." });
        }}
      >
        Manager Toast
      </Button>
      <Button
        onClick={() => {
          addToast({ children: "Global toast.", closeButton: true });
        }}
      >
        Global Toast
      </Button>
    </>
  );
}
