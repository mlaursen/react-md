"use client";
import { Box } from "@react-md/core/box/Box";
import { cssUtils } from "@react-md/core/cssUtils";
import { Tooltip } from "@react-md/core/tooltip/Tooltip";
import { useTooltip } from "@react-md/core/tooltip/useTooltip";
import { type CSSProperties, type ReactElement } from "react";

const style: CSSProperties = {
  width: "8rem",
};

export default function OverflowOnlyTooltipExample(): ReactElement {
  const { elementProps, tooltipProps } = useTooltip<HTMLDivElement>({
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
