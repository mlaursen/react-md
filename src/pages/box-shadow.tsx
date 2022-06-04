import { TextContainer } from "@react-md/core";
import { cnb } from "packages/app-bar/node_modules/cnbuilder/cjs";
import type { ReactElement } from "react";

import styles from "./box-shadow.module.scss";

export default function BoxShadow(): ReactElement {
  return (
    <TextContainer className={styles.container}>
      {Array.from({ length: 24 }, (_, zValue) => (
        <div
          key={zValue}
          className={cnb(styles.shadow, styles[`shadow${zValue}`])}
        >
          {zValue}
        </div>
      ))}
    </TextContainer>
  );
}
