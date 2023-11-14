import { Tooltip, cssUtils } from "@react-md/core";
import { type ReactElement } from "react";
import styles from "./CustomTooltipExample.module.scss";

export default function CustomTooltipExample(): ReactElement {
  return (
    <div
      className={cssUtils({
        backgroundColor: "success",
        className: styles.container,
      })}
    >
      <Tooltip
        visible
        className={styles.tooltip}
        disablePortal
        textOverflow="nowrap"
      >
        Always visible tooltip
      </Tooltip>
    </div>
  );
}
