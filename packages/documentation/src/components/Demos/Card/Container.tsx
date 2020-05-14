import React, { FC } from "react";
import cn from "classnames";

import styles from "./Container.module.scss";

interface Props {
  centered?: boolean;
}

const Container: FC<Props> = ({ children, centered }) => (
  <div
    className={cn(styles.container, {
      [styles.centered]: centered,
    })}
  >
    {children}
  </div>
);

export default Container;
