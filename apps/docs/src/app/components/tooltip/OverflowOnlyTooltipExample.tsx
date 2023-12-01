"use client";
import { Box, Tooltip, cssUtils, useTooltip } from "@react-md/core";
import { type CSSProperties, type ReactElement } from "react";

const style: CSSProperties = {
  width: "8rem",
};

export default function OverflowOnlyTooltipExample(): ReactElement {
  const { elementProps, tooltipProps } = useTooltip({
    overflowOnly: true,
  });
  return (
    <Box stacked>
      <div
        {...elementProps}
        style={style}
        className={cssUtils({ textOverflow: "ellipsis" })}
      >
        No Overflow.
      </div>
      <div
        {...elementProps}
        style={style}
        className={cssUtils({ textOverflow: "ellipsis" })}
      >
        There will be overflow here.
      </div>
      <Tooltip {...tooltipProps}>Tooltip!</Tooltip>
    </Box>
  );
}