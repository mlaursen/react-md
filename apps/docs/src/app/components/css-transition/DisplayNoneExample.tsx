"use client";
import { Box, Button, useCSSTransition, useToggle } from "@react-md/core";
import { type ReactElement } from "react";
import styles from "./TemporaryElementsTransitionsExample.module.scss";

export default function DisplayNoneExample(): ReactElement {
  const { toggled, toggle } = useToggle();
  const { elementProps } = useCSSTransition({
    transitionIn: toggled,
    exitedHidden: true,
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
      <div {...elementProps}>I am a temporary element!</div>
    </Box>
  );
}
