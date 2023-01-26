import { Badge, Box } from "@react-md/core";
import type { ReactElement } from "react";

import styles from "./SimpleExample.module.scss";

export function SimpleExample(): ReactElement {
  return (
    <Box className={styles.static}>
      <Badge>3</Badge>
      <Badge theme="primary">100</Badge>
      <Badge theme="secondary">23</Badge>
      <Badge theme="greyscale">18</Badge>
      <Badge theme="clear">1</Badge>
    </Box>
  );
}
