import { Tooltip, cssUtils } from "@react-md/core";
import { type ReactElement } from "react";

export default function CustomTooltipExample(): ReactElement {
  return (
    <div
      style={{ position: "relative", width: "3em", height: "3em" }}
      className={cssUtils({ backgroundColor: "success" })}
    >
      <Tooltip
        visible
        style={{
          left: "50%",
          top: "calc(100% + var(--rmd-tooltip-spacing, 1.5rem))",
          position: "absolute",
          transform: "translateX(-50%)",
        }}
        disablePortal
        textOverflow="nowrap"
      >
        Always visible tooltip
      </Tooltip>
    </div>
  );
}
