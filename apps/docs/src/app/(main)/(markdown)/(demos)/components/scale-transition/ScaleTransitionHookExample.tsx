"use client";
import { Box } from "@react-md/core/box/Box";
import { Button } from "@react-md/core/button/Button";
import { Card } from "@react-md/core/card/Card";
import { CardContent } from "@react-md/core/card/CardContent";
import { useScaleTransition } from "@react-md/core/transition/useScaleTransition";
import { useToggle } from "@react-md/core/useToggle";
import { type ReactElement } from "react";
import styles from "./ScaleTransitionHookExample.module.scss";

export default function ScaleTransitionHookExample(): ReactElement {
  const { toggle, toggled } = useToggle();
  const { elementProps, rendered } = useScaleTransition({
    // this is the default
    // vertical: false,
    className: styles.element,
    transitionIn: toggled,
  });

  return (
    <Box stacked className={styles.container}>
      <Button onClick={toggle}>Toggle</Button>
      {rendered && (
        <Card {...elementProps}>
          <CardContent>Hello, world!</CardContent>
        </Card>
      )}
    </Box>
  );
}
