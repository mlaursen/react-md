import { type ReactElement } from "react";
import { Badge, Button, getIcon } from "react-md";
import { NotificationsSVGIcon } from "@react-md/material-icons";

import styles from "./SimpleExamples.module.scss";

export default function Example(): ReactElement {
  return (
    <>
      <Button
        id="badged-button-1"
        className={styles.container}
        aria-label="Notifications"
        buttonType="icon">{getIcon("notification")}<Badge>3
                </Badge></Button>
      <Button
        id="badged-button-2"
        className={styles.container}
        aria-label="Notifications"
        buttonType="icon"><NotificationsSVGIcon /><Badge>7
                </Badge></Button>
    </>
  );
}
