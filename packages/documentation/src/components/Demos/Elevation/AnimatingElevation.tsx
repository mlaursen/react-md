import React, { FC } from "react";
import cn from "classnames";

import styles from "./AnimatingElevation.module.scss";

const AnimatingElevation: FC = () => (
  <>
    <button
      id="animating-elevation-1"
      type="button"
      className={cn(styles.example, styles.simple)}
    >
      This button will animate elevation when the button is hovered or focused.
    </button>
    <button
      id="animating-elevation-2"
      type="button"
      className={cn(styles.example, styles.merging)}
    >
      This button will animate elevation when hovered, as well as a custom focus
      effect that merges box shadows.
    </button>
  </>
);

export default AnimatingElevation;
