"use client";

import { Box } from "@react-md/core/box/Box";
import { Button } from "@react-md/core/button/Button";
import { Card } from "@react-md/core/card/Card";
import { CardContent } from "@react-md/core/card/CardContent";
import { ScaleTransition } from "@react-md/core/transition/ScaleTransition";
import { useToggle } from "@react-md/core/useToggle";
import { type ReactElement } from "react";

import styles from "./SimpleExample.module.scss";

export default function SimpleExample(): ReactElement {
  const { toggle, toggled } = useToggle();

  return (
    <Box stacked className={styles.container}>
      <Button onClick={toggle}>Toggle</Button>
      <ScaleTransition transitionIn={toggled}>
        <Card className={styles.element}>
          <CardContent>Hello, world!</CardContent>
        </Card>
      </ScaleTransition>
    </Box>
  );
}
