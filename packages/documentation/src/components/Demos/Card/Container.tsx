import { ReactElement, ReactNode } from "react";
import cn from "classnames";

import styles from "./Container.module.scss";

interface Props {
  centered?: boolean;
  children: ReactNode;
}

export default function Container({ children, centered }: Props): ReactElement {
  return (
    <div
      className={cn(styles.container, {
        [styles.centered]: centered,
      })}
    >
      {children}
    </div>
  );
}
