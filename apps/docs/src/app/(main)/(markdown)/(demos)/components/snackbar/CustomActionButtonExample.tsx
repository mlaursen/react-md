"use client";
import { AsyncButton } from "@react-md/core/button/AsyncButton";
import { Button } from "@react-md/core/button/Button";
import { addToast } from "@react-md/core/snackbar/ToastManager";
import { useCurrentToastActions } from "@react-md/core/snackbar/useCurrentToastActions";
import { wait } from "@react-md/core/utils/wait";
import { type ReactElement } from "react";

export default function CustomActionButtonExample(): ReactElement {
  return (
    <Button
      onClick={() => {
        addToast({
          children: "Something happened.",
          actionButton: <ActionButton />,
          visibleTime: null,
        });
      }}
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
