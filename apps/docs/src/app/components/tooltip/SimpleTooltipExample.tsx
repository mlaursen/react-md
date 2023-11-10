"use client";
import { Button, Tooltip, useTooltip } from "@react-md/core";
import { type ReactElement } from "react";

export default function SimpleTooltipExample(): ReactElement {
  const { elementProps, tooltipProps } = useTooltip();

  return (
    <>
      <Button {...elementProps}>Button</Button>
      <Tooltip {...tooltipProps}>Tooltip</Tooltip>
    </>
  );
}
