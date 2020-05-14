import React, { FC } from "react";
import { BadgedButton } from "@react-md/badge";
import { NotificationsSVGIcon } from "@react-md/material-icons";

import styles from "./SimpleExamples.module.scss";

const SimpleExamples: FC = () => (
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
    <BadgedButton id="badged-button-3" className={styles.container}>
      0
    </BadgedButton>
    <BadgedButton id="badged-button-4" className={styles.container} />
    <BadgedButton
      id="badged-button-5"
      className={styles.container}
      disableNullOnZero
    >
      0
    </BadgedButton>
  </>
);
export default SimpleExamples;
