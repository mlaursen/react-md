import { Card } from "@react-md/core/card/Card";
import { cnb } from "cnbuilder";
import { type ReactElement, type ReactNode } from "react";

import styles from "./PreviewContainer.module.scss";

export interface PreviewContainerOptions {
  card?: boolean;
  phone?: boolean;
}

export interface PreviewContainerProps extends PreviewContainerOptions {
  children: ReactNode;
}

export function PreviewContainer(props: PreviewContainerProps): ReactElement {
  const { card, phone, children } = props;

  if (!card) {
    return <>{children}</>;
  }

  return <Card className={cnb(phone && styles.phone)}>{children}</Card>;
}
