"use client";
import {
  AsyncButton,
  Button,
  addToast,
  useCurrentToastActions,
  wait,
} from "@react-md/core";
import { type ReactElement } from "react";

export default function CustomActionButtonExample(): ReactElement {
  return (
    <Button
      onClick={() =>
        addToast({
          children: "Something happened.",
          actionButton: <ActionButton />,
          visibleTime: null,
        })
      }
    >
      Toast!
    </Button>
  );
}

function ActionButton(): ReactElement {
  const { removeToast } = useCurrentToastActions();
  return (
    <AsyncButton
      onClick={async () => {
        await wait(5000);
        removeToast(true);
      }}
      theme="secondary"
    >
      Undo
    </AsyncButton>
  );
}
