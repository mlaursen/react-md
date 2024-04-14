"use client";
import { Box } from "@react-md/core/box/Box";
import { Button } from "@react-md/core/button/Button";
import { useCSSTransition } from "@react-md/core/transition/useCSSTransition";
import { useToggle } from "@react-md/core/useToggle";
import { type ReactElement } from "react";
import styles from "./TemporaryElementsTransitionsExample.module.scss";

export default function TemporaryElementsTransitionsExample(): ReactElement {
  const { toggled, toggle } = useToggle();
  const { elementProps, rendered } = useCSSTransition({
    transitionIn: toggled,
    temporary: true,
    timeout: 150,
    classNames: {
      enter: styles.enter,
      enterActive: styles.enterActive,
      exit: styles.exit,
      exitActive: styles.exitActive,
    },
  });

  return (
    <Box stacked disablePadding>
      <Button onClick={toggle}>Toggle</Button>
      {rendered && <div {...elementProps}>I am a temporary element!</div>}
    </Box>
  );
}
