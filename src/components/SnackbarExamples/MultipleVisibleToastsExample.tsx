import { Button, LinearProgress, Snackbar, useAddToast } from "@react-md/core";
import type { ReactElement } from "react";
import { useRef } from "react";

import styles from "./MultipleVisibleToastsExample.module.scss";

function Countdown(): ReactElement {
  return (
    <LinearProgress
      className={styles.progress}
      barClassName={styles.countdown}
    />
  );
}

export function MultipleVisibleToastsExample(): ReactElement {
  const addToast = useAddToast();
  const count = useRef(0);
  return (
    <>
      <Button
        onClick={() => {
          count.current = 1;
          addToast({ children: "Hello, world!" });
        }}
      >
        Toast!
      </Button>
      <Snackbar
        limit={5}
        position="top"
        className={styles.snackbar}
        toastDefaults={{
          className: styles.toast,
          closeButton: true,
          onEntered: () => {
            if (count.current < 5) {
              count.current += 1;
              addToast({ children: "Hello, World!" });
            }
          },
          children: <Countdown />,
          action: "Dismiss",
        }}
      />
    </>
  );
}
