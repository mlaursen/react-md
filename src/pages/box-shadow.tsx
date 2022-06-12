import { Box, box, TextContainer } from "@react-md/core";
import { cnb } from "packages/app-bar/node_modules/cnbuilder/cjs";
import type { ReactElement } from "react";

import styles from "./box-shadow.module.scss";

export default function BoxShadow(): ReactElement {
  return (
    <TextContainer
      className={box({ className: styles.container, autoColumns: true })}
    >
      {Array.from({ length: 24 }, (_, zValue) => (
        <Box
          key={zValue}
          className={cnb(styles.shadow, styles[`shadow${zValue}`])}
          justify="center"
        >
          {zValue}
        </Box>
      ))}
    </TextContainer>
  );
}
