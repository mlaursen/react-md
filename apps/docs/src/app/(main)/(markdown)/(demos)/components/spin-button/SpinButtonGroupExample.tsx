"use client";

import { Box } from "@react-md/core/box/Box";
import { SpinButton } from "@react-md/core/spinbutton/SpinButton";
import { SpinButtonGroupProvider } from "@react-md/core/spinbutton/SpinButtonGroupProvider";
import { useSpinButtonGroupProvider } from "@react-md/core/spinbutton/useSpinButtonGroupProvider";
import { type ReactElement } from "react";

export default function SpinButtonGroupExample(): ReactElement {
  const { movementProps, movementContext } = useSpinButtonGroupProvider();
  return (
    <Box {...movementProps}>
      <SpinButtonGroupProvider value={movementContext}>
        <SpinButton aria-label="Hours" min={1} max={12} fallback="hh" />:
        <SpinButton aria-label="Minutes" min={0} max={59} fallback="mm" />:
        <SpinButton aria-label="Seconds" min={0} max={59} fallback="ss" />
      </SpinButtonGroupProvider>
    </Box>
  );
}
