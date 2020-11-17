import React, { ReactElement, ReactNode } from "react";
import cn from "classnames";

import styles from "./SlidersContainer.module.scss";

export interface SlidersContainerProps {
  vertical?: boolean;
  children: ReactNode;
}

export default function SlidersContainer({
  vertical = false,
  children,
}: SlidersContainerProps): ReactElement | null {
  return (
    <div
      className={cn(
        !vertical && styles.horizontal,
        vertical && styles.vertical
      )}
    >
      {children}
    </div>
  );
}
