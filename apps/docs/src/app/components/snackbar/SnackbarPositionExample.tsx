"use client";
import {
  Button,
  Option,
  Select,
  Snackbar,
  ToastManager,
  ToastManagerProvider,
  type SnackbarPosition,
} from "@react-md/core";
import { useState, type ReactElement } from "react";

export default function SnackbarPositionExample(): ReactElement {
  const [position, setPosition] = useState<SnackbarPosition>("bottom");
  return (
    <ToastManagerProvider manager={manager}>
      <Button
        onClick={() => {
          manager.addToast({
            children: "Hello, world!",
            visibleTime: null,
          });
        }}
      >
        Toast!
      </Button>
      <Button
        theme="warning"
        themeType="outline"
        onClick={() => {
          manager.clearToasts();
        }}
      >
        Remove all toasts
      </Button>
      <Select
        label="Position"
        value={position}
        onChange={(event) => setPosition(event.currentTarget.value)}
      >
        {positions.map((position) => (
          <Option key={position} value={position}>
            {position}
          </Option>
        ))}
      </Select>
      <Snackbar position={position} limit={3} />
    </ToastManagerProvider>
  );
}

const manager = new ToastManager();
const positions: readonly SnackbarPosition[] = [
  "bottom",
  "bottom-left",
  "bottom-right",
  "top",
  "top-left",
  "top-right",
];
