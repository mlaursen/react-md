import { Box } from "@react-md/core";
import type { ReactElement } from "react";

import styles from "./box.module.scss";

export default function BoxPage(): ReactElement {
  return (
    <Box grid gridName="extra-padding" className={styles.container}>
      {Array.from({ length: 20 }, (_, i) => (
        <Box key={i} justify="center" className={styles.box}>
          {`Cell ${i + 1}`}
        </Box>
      ))}
    </Box>
  );
}
