import React, { FC } from "react";
import { Button } from "@react-md/button";

import styles from "./CustomInteractions.module.scss";

const CustomInteractions: FC = () => (
  <Button
    id="custom-state-button"
    enablePressedAndRipple
    className={styles.button}
  >
    Button
  </Button>
);

export default CustomInteractions;
