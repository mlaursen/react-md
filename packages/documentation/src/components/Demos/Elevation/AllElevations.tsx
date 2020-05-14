import React, { FC } from "react";
import cn from "classnames";

import Code from "components/Code/Code";

import styles from "./AllElevations.module.scss";

const AllElevations: FC = () => (
  <ul className={styles.container}>
    {Array.from(new Array(25)).map((_, elevation) => (
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

export default AllElevations;
