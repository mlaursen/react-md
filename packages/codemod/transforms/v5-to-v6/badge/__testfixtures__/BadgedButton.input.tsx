import { type ReactElement } from "react";
import { BadgedButton } from "react-md";
import { NotificationsSVGIcon } from "@react-md/material-icons";

import styles from "./SimpleExamples.module.scss";

export default function Example(): ReactElement {
  return (
    <>
      <BadgedButton id="badged-button-1" className={styles.container}>
        3
      </BadgedButton>
      <BadgedButton
        id="badged-button-2"
        className={styles.container}
        buttonChildren={<NotificationsSVGIcon />}
      >
        7
      </BadgedButton>
    </>
  );
}
