"use client";

import { TooltippedButton } from "@react-md/core/button/TooltippedButton";
import { TooltipHoverModeProvider } from "@react-md/core/tooltip/TooltipHoverModeProvider";
import { type ReactElement } from "react";

export default function ConfiguringTooltipTimeoutsExample(): ReactElement {
  return (
    <TooltipHoverModeProvider
      hoverTimeout={500}
      leaveTimeout={300}
      disableTimeout={10_000}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <TooltippedButton
          key={i}
          tooltip={`Tooltip ${i + 1}`}
          buttonType="text"
        >
          {`Button ${i + 1}`}
        </TooltippedButton>
      ))}
      <TooltippedButton
        tooltip="Another tooltip"
        // these are pass-through to the `useTooltip` hook
        // i.e.
        // useTooltip({ ...tooltipOptions, disabled: !tooltip || tooltipOptions?.disabled })
        tooltipOptions={{
          leaveTimeout: 1000,
          hoverTimeout: 1500,
        }}
        buttonType="text"
      >
        Custom Timeout
      </TooltippedButton>
    </TooltipHoverModeProvider>
  );
}
