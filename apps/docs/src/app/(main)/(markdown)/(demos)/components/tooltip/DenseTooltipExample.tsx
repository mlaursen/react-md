"use client";

import { Button } from "@react-md/core/button/Button";
import { Tooltip } from "@react-md/core/tooltip/Tooltip";
import { useTooltip } from "@react-md/core/tooltip/useTooltip";
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
