import type { ReactElement } from "react";
import cn from "classnames";
import { CircularProgress } from "@react-md/progress";

import styles from "./LoadingCode.module.scss";

export interface LoadingCodeProps {
  offset: boolean;
}

export function LoadingCode({ offset }: LoadingCodeProps): ReactElement {
  return (
    <div
      className={cn(styles.container, {
        [styles.offset]: offset,
      })}
    >
      <CircularProgress id="loading-code" />
    </div>
  );
}
