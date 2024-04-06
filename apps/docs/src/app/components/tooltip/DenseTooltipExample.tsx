"use client";
import { Button, Tooltip, useTooltip } from "react-md";
import { type ReactElement } from "react";

export default function DenseTooltipExample(): ReactElement {
  const { elementProps, tooltipProps } = useTooltip({
    dense: true,
  });

  return (
    <>
      <Button {...elementProps}>Button</Button>
      <Tooltip {...tooltipProps}>Tooltip</Tooltip>
    </>
  );
}
