import React, { FC, useState } from "react";
import { Button } from "@react-md/button";
import { AlarmSVGIcon, CloseSVGIcon } from "@react-md/material-icons";
import { Sheet } from "@react-md/sheet";

import ActionChip from "./ActionChip";
import styles from "./ActionChipAlarm.module.scss";

const ActionChipAlarm: FC = () => {
  const [visible, setVisible] = useState(false);
  const hide = (): void => setVisible(false);

  return (
    <>
      <ActionChip
        id="action-chip-alarm"
        leftIcon={<AlarmSVGIcon />}
        onClick={() => setVisible(true)}
      >
        Set Alarm
      </ActionChip>
      <Sheet
        id="action-chip-alarm-sheet"
        aria-label="Alarm"
        className={styles.absolute}
        overlayClassName={styles.absolute}
        position="bottom"
        visible={visible}
        onRequestClose={hide}
        portalIntoId="action-chips-card"
        disableScrollLock
      >
        <Button
          id="action-chip-alarm-close"
          aria-label="Close"
          buttonType="icon"
          onClick={hide}
        >
          <CloseSVGIcon />
        </Button>
      </Sheet>
    </>
  );
};

export default ActionChipAlarm;
