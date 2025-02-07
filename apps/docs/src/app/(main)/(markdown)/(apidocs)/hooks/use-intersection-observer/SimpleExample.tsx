"use client";

import { Typography } from "@react-md/core/typography/Typography";
import { useIntersectionObserver } from "@react-md/core/useIntersectionObserver";
import { type ReactElement, useCallback, useState } from "react";

import styles from "./SimpleExample.module.scss";

const numSteps = 20;
const thresholds = Array.from({ length: numSteps }, (_, i) => i / numSteps);
thresholds.push(0);

const INCREASING = "rgba(40, 40, 190, ratio)";
const DECREASING = "rgba(190, 40, 40, ratio)";

export default function SimpleExample(): ReactElement {
  const [{ ratio, increasing }, setState] = useState({
    ratio: 0.0,
    increasing: true,
  });

  const targetRef = useIntersectionObserver({
    threshold: thresholds,
    rootMargin: "0px",
    onUpdate: useCallback(([entry]) => {
      const { intersectionRatio } = entry;
      setState((prevState) => {
        return {
          ratio: intersectionRatio,
          increasing: intersectionRatio > prevState.ratio,
        };
      });
    }, []),
  });

  return (
    <>
      <Typography type="headline-4" margin="none" textAlign="center">
        Scroll Down
      </Typography>
      <div className={styles.container}>
        <div
          ref={targetRef}
          className={styles.box}
          style={{
            backgroundColor: (increasing ? INCREASING : DECREASING).replace(
              "ratio",
              `${ratio}`
            ),
          }}
        >
          <div className={styles.vertical}>
            Welcome to <strong>The Box!</strong>
          </div>
        </div>
      </div>
    </>
  );
}
