import { Box } from "@react-md/core/box/Box";
import { cnb } from "cnbuilder";
import { type ReactElement } from "react";
import styles from "./DarkElevationColors.module.scss";

export default function DarkElevationColors(): ReactElement {
  return (
    <Box grid className={styles.container}>
      {Array.from({ length: 25 }, (_, i) => (
        <Box
          key={i}
          justify="center"
          className={cnb(i > 0 && styles[`elevation-${i}`])}
        >
          {i}
        </Box>
      ))}
    </Box>
  );
}
