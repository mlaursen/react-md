"use client";

import { TooltippedButton } from "@react-md/core/button/TooltippedButton";
import { TooltipHoverModeProvider } from "@react-md/core/tooltip/TooltipHoverModeProvider";
import { type ReactElement } from "react";

export default function EnablingHoverModeExample(): ReactElement {
  return (
    <TooltipHoverModeProvider>
      {Array.from({ length: 5 }, (_, i) => (
        <TooltippedButton
          key={i}
          tooltip={`Tooltip ${i + 1}`}
          buttonType="text"
        >
          Button {i + 1}
        </TooltippedButton>
      ))}
    </TooltipHoverModeProvider>
  );
}
