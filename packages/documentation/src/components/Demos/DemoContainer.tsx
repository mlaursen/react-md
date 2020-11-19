import React, {
  ElementType,
  HTMLAttributes,
  ReactElement,
  ReactNode,
} from "react";

import styles from "./DemoContainer.module.scss";

export interface DemoContainerProps extends HTMLAttributes<HTMLDivElement> {
  as?: ElementType;
  children: ReactNode;
}

export default function DemoContainer({
  as: Component = "div",
  ...props
}: DemoContainerProps): ReactElement {
  return <Component {...props} className={styles.container} />;
}
