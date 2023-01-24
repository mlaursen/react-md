import type { SnackbarPosition } from "@react-md/core";
import { Button, Option, Select, Snackbar, useAddToast } from "@react-md/core";
import type { ReactElement } from "react";
import { useState } from "react";

const positions: readonly SnackbarPosition[] = [
  "top-left",
  "top",
  "top-right",
  "bottom-left",
  "bottom",
  "bottom-right",
];

export function ToastPositionExample(): ReactElement {
  const addToast = useAddToast();
  const [position, setPosition] = useState<SnackbarPosition>("bottom");
  return (
    <>
      <Button
        onClick={() =>
          addToast({ children: "Hello, world!", visibleTime: null })
        }
      >
        Toast
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
      <Snackbar position={position} />
    </>
  );
}
