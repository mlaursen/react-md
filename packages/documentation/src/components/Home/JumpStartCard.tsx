import type { ReactElement, ReactNode } from "react";
import { Card } from "@react-md/card";

import styles from "./JumpStartCard.module.scss";

export interface JumpStartCardProps {
  children: ReactNode;
}

export default function JumpStartCard({
  children,
}: JumpStartCardProps): ReactElement {
  return <Card className={styles.card}>{children}</Card>;
}
