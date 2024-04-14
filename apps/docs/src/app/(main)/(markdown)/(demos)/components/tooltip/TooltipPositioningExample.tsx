"use client";
import { Button } from "@react-md/core/button/Button";
import { Tooltip } from "@react-md/core/tooltip/Tooltip";
import { useTooltip } from "@react-md/core/tooltip/useTooltip";
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
