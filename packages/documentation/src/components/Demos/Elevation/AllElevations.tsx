import React, { ReactElement } from "react";
import cn from "classnames";

import Code from "components/Code";

import styles from "./AllElevations.module.scss";

export default function AllElevations(): ReactElement {
  return (
    <ul className={styles.container}>
      {Array.from({ length: 25 }).map((_, elevation) => (
        <li
          key={elevation}
          className={cn(styles.example, styles[`elevation${elevation}`])}
        >
          <Code className={styles.code}>
            {`@include rmd-elevation(${elevation})`}
          </Code>
        </li>
      ))}
    </ul>
  );
}
