import { Box } from "@react-md/core";
import type { ReactElement } from "react";

import styles from "./SimpleExample.module.scss";

export function GridBoxExample(): ReactElement {
  return (
    <Box grid className={styles.container}>
      {Array.from({ length: 20 }, (_, i) => (
        <Box key={i} justify="center" className={styles.box}>
          {`Cell ${i + 1}`}
        </Box>
      ))}
    </Box>
  );
}
