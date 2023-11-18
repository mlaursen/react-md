"use client";
import {
  Button,
  LinearProgress,
  Snackbar,
  ToastManager,
  ToastManagerProvider,
} from "@react-md/core";
import { useRef, type ReactElement } from "react";
import styles from "./MultipleVisibleToastsExample.module.scss";

const manager = new ToastManager();
const { addToast } = manager;

export default function MultipleVisibleToastsExample(): ReactElement {
  const count = useRef(0);
  return (
    <ToastManagerProvider manager={manager}>
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
        position="top-right"
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
    </ToastManagerProvider>
  );
}

function Countdown(): ReactElement {
  return (
    <LinearProgress
      aria-label="Visible time"
      className={styles.progress}
      barClassName={styles.countdown}
    />
  );
}
