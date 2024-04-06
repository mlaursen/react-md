"use client";
import { Box, Button, cssUtils, useCSSTransition, useToggle } from "react-md";
import { type ReactElement } from "react";
import styles from "./SimpleUseCSSTransitionExample.module.scss";

export default function SimpleUseCSSTransitionExample(): ReactElement {
  const { toggled: transitionIn, toggle } = useToggle();
  const { elementProps } = useCSSTransition({
    transitionIn,
    timeout: {
      enter: 2000,
      exit: 1500,
    },
    classNames: {
      enter: styles.enter,
      enterActive: styles.enterActive,
      enterDone: styles.enterDone,
      exit: styles.exit,
      exitActive: styles.exitActive,
      exitDone: styles.exitDone,
    },
    className: cssUtils({ outlineColor: "current-color" }),
  });

  return (
    <>
      <Box {...elementProps} fullWidth align="center" justify="center">
        I will have different styles!
      </Box>
      <Button onClick={toggle}>Toggle</Button>
    </>
  );
}
