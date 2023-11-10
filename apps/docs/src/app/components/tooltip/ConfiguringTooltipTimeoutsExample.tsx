"use client";
import {
  Button,
  Tooltip,
  TooltipHoverModeProvider,
  useTooltip,
} from "@react-md/core";
import { type ReactElement, type ReactNode } from "react";

export default function ConfiguringTooltipTimeoutsExample(): ReactElement {
  return (
    <TooltipHoverModeProvider
      hoverTimeout={500}
      leaveTimeout={300}
      disableTimeout={10000}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <TooltippedButton key={i} tooltip={`Tooltip ${i + 1}`}>
          {`Button ${i + 1}`}
        </TooltippedButton>
      ))}
      <TooltippedButton
        tooltip="Another tooltip"
        leaveTimeout={1000}
        hoverTimeout={1500}
      >
        Custom Timeout
      </TooltippedButton>
    </TooltipHoverModeProvider>
  );
}

export interface TooltippedButtonProps {
  tooltip: ReactNode;
  children: ReactNode;
  hoverTimeout?: number;
  leaveTimeout?: number;
}

function TooltippedButton(props: TooltippedButtonProps): ReactElement {
  const { tooltip, children, hoverTimeout, leaveTimeout } = props;

  const { elementProps, tooltipProps } = useTooltip({
    hoverTimeout,
    leaveTimeout,
  });

  return (
    <>
      <Button {...elementProps}>{children}</Button>
      <Tooltip {...tooltipProps}>{tooltip}</Tooltip>
    </>
  );
}
