"use client";
import { Button, Tooltip, useTooltip } from "react-md";
import { type ReactElement } from "react";

export default function ForcedTooltipPositionExample(): ReactElement {
  const { elementProps, tooltipProps } = useTooltip({
    // this is the default
    position: "below",
    // position: "above",
    // position: "left",
    // position: "right",
  });

  return (
    <>
      <Button {...elementProps}>Button</Button>
      <Tooltip {...tooltipProps}>Tooltip</Tooltip>
    </>
  );
}
