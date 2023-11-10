"use client";
import { Button, Tooltip, cssUtils, useTooltip } from "@react-md/core";
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
