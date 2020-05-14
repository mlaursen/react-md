import React, { FC } from "react";
import TooltippedBadgedButton from "./TooltippedBadgedButton";

import styles from "./SimpleExamples.module.scss";

const WithTooltips: FC = () => (
  <>
    <TooltippedBadgedButton
      id="tooltipped-badged-button-1"
      tooltip="No Alerts"
      className={styles.container}
    />
    <TooltippedBadgedButton
      id="tooltipped-badged-button-2"
      tooltip="10 New Alerts"
      className={styles.container}
    >
      10
    </TooltippedBadgedButton>
    <TooltippedBadgedButton
      id="tooltipped-badged-button-3"
      tooltip="100 New Alerts"
      className={styles.container}
    >
      99+
    </TooltippedBadgedButton>
  </>
);

export default WithTooltips;
