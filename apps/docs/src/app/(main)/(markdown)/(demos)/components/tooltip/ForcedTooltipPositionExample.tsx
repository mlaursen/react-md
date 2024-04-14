"use client";
import { Button } from "@react-md/core/button/Button";
import { Tooltip } from "@react-md/core/tooltip/Tooltip";
import { useTooltip } from "@react-md/core/tooltip/useTooltip";
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
