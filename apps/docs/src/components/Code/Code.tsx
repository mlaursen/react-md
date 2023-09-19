import type { HTMLAttributes, ReactElement } from "react";
import { cnb } from "cnbuilder";

import styles from "./Code.module.scss";

export type CodeProps = HTMLAttributes<HTMLElement>;

export function Code(props: CodeProps): ReactElement {
  const { className, ...remaining } = props;
  return <code {...remaining} className={cnb(styles.container, className)} />;
}
