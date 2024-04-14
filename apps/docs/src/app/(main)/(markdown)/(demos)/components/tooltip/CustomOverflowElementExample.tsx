"use client";
import { Button } from "@react-md/core/button/Button";
import { cssUtils } from "@react-md/core/cssUtils";
import { Tooltip } from "@react-md/core/tooltip/Tooltip";
import { useTooltip } from "@react-md/core/tooltip/useTooltip";
import { type ReactElement } from "react";

export default function CustomOverflowElementExample(): ReactElement {
  const { elementProps, tooltipProps, overflowRef } = useTooltip({
    overflowOnly: true,
  });

  return (
    <>
      <Button {...elementProps} style={{ width: "2rem" }}>
        <span
          ref={overflowRef}
          className={cssUtils({ textOverflow: "ellipsis" })}
        >
          Some long content
        </span>
      </Button>
      <Tooltip {...tooltipProps}>Tooltip!</Tooltip>
    </>
  );
}
