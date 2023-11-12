"use client";
import { useResettableContext } from "@/utils/useResettable.jsx";
import RefreshOutlinedIcon from "@react-md/material-icons/RefreshOutlinedIcon";
import { Button, Tooltip, useTooltip } from "@react-md/core";
import { type ReactElement } from "react";

export function ResetDemo(): ReactElement {
  const reset = useResettableContext();
  const { elementProps, tooltipProps } = useTooltip();

  return (
    <>
      <Button {...elementProps} onClick={reset} buttonType="icon">
        <RefreshOutlinedIcon />
      </Button>
      <Tooltip {...tooltipProps}>Reset the demo</Tooltip>
    </>
  );
}
