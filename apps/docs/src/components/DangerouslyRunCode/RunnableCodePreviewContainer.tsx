import { Card } from "@react-md/core";
import { cnb } from "cnbuilder";
import { type ReactElement, type ReactNode } from "react";
import styles from "./RunnableCodePreviewContainer.module.scss";

export interface RunnableCodePreviewOptions {
  card?: boolean;
  phone?: boolean;
}

export interface RunnableCodePreviewContainerProps
  extends RunnableCodePreviewOptions {
  children: ReactNode;
}

export function RunnableCodePreviewContainer(
  props: RunnableCodePreviewContainerProps
): ReactElement {
  const { card, phone, children } = props;
  if (!card) {
    return <>{children}</>;
  }

  return <Card className={cnb(phone && styles.phone)}>{children}</Card>;
}
