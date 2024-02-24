"use client";
import {
  Box,
  Button,
  CSSTransition,
  cssUtils,
  useToggle,
} from "@react-md/core";
import { type ReactElement } from "react";
import styles from "./SimpleCSSTransitionExample.module.scss";

export default function SimpleCSSTransitionExample(): ReactElement {
  const { toggled: transitionIn, toggle } = useToggle();

  return (
    <>
      <CSSTransition
        transitionIn={transitionIn}
        timeout={{
          enter: 2000,
          exit: 1500,
        }}
        classNames={{
          enter: styles.enter,
          enterActive: styles.enterActive,
          enterDone: styles.enterDone,
          exit: styles.exit,
          exitActive: styles.exitActive,
          exitDone: styles.exitDone,
        }}
      >
        <Box
          fullWidth
          align="center"
          justify="center"
          className={cssUtils({ outlineColor: "current-color" })}
        >
          I will have different styles!
        </Box>
      </CSSTransition>
      <Button onClick={toggle}>Toggle</Button>
    </>
  );
}