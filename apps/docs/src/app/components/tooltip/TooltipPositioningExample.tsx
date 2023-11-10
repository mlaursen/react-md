"use client";
import { Button, Tooltip, useTooltip } from "@react-md/core";
import { type ReactElement } from "react";

export default function TooltipPositioningExample(): ReactElement {
  const { elementProps, tooltipProps } = useTooltip({
    // this is the default
    defaultPosition: "below",
    // defaultPosition: "above",
    // defaultPosition: "left",
    // defaultPosition: "right",
  });

  return (
    <>
      <Button {...elementProps}>Button</Button>
      <Tooltip {...tooltipProps}>Tooltip</Tooltip>
    </>
  );
}
