"use client";
import {
  Button,
  Tooltip,
  TooltipHoverModeProvider,
  useTooltip,
} from "@react-md/core";
import { type ReactElement } from "react";

export default function EnablingHoverModeExample(): ReactElement {
  return (
    <TooltipHoverModeProvider>
      {Array.from({ length: 5 }, (_, i) => (
        <TooltippedButton key={i} i={i + 1} />
      ))}
    </TooltipHoverModeProvider>
  );
}

function TooltippedButton({ i }: { i: number }): ReactElement {
  const { elementProps, tooltipProps } = useTooltip();

  return (
    <>
      <Button {...elementProps}>Button {i}</Button>
      <Tooltip {...tooltipProps}>Tooltip {i}</Tooltip>
    </>
  );
}
