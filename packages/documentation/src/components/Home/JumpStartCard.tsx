import React, { FC } from "react";
import { Card } from "@react-md/card";

import styles from "./JumpStartCard.module.scss";

const JumpStartCard: FC = ({ children }) => (
  <Card className={styles.card}>{children}</Card>
);

export default JumpStartCard;
