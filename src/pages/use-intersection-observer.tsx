import { useIntersectionObserver } from "@react-md/core";
import type { ReactElement } from "react";
import { useState } from "react";

import styles from "./use-intersection-observer.module.scss";

const numSteps = 20;
const thresholds = Array.from({ length: numSteps }, (_, i) => i / numSteps);
thresholds.push(0);

const INCREASEING = "rgba(40, 40, 190, ratio)";
const DECREASING = "rgba(190, 40, 40, ratio)";

export default function UseIntersectionObserver(): ReactElement {
  const [{ ratio, increasing }, setState] = useState({
    ratio: 0.0,
    increasing: true,
  });

  const targetRef = useIntersectionObserver({
    threshold: thresholds,
    rootMargin: "0px",
    onUpdate(entry) {
      const { intersectionRatio } = entry;
      setState((prevState) => {
        return {
          ratio: intersectionRatio,
          increasing: intersectionRatio > prevState.ratio,
        };
      });
    },
  });

  return (
    <div className={styles.container}>
      <div
        ref={targetRef}
        className={styles.box}
        style={{
          backgroundColor: (increasing ? INCREASEING : DECREASING).replace(
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
  );
}
