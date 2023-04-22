import type { ReactElement } from "react";

import styles from "./LineNumbers.module.scss";

export interface LineNumbersProps {
  lines: number;
}

export function LineNumbers({ lines }: LineNumbersProps): ReactElement {
  return (
    <span className={styles.container}>
      {Array.from({ length: lines }).map((_, i) => (
        <span key={i} className={styles.counter} />
      ))}
    </span>
  );
}
