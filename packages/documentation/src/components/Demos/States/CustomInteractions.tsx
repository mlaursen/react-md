import { ReactElement } from "react";
import { Button } from "@react-md/button";

import styles from "./CustomInteractions.module.scss";

export default function CustomInteractions(): ReactElement {
  return (
    <Button
      id="custom-state-button"
      enablePressedAndRipple
      className={styles.button}
    >
      Button
    </Button>
  );
}
