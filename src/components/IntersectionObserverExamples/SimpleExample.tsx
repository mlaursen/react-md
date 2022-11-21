import { Typography, useIntersectionObserver } from "@react-md/core";
import type { ReactElement } from "react";
import { useCallback, useState } from "react";

import styles from "./SimpleExample.module.scss";

const numSteps = 20;
const thresholds = Array.from({ length: numSteps }, (_, i) => i / numSteps);
thresholds.push(0);

const INCREASEING = "rgba(40, 40, 190, ratio)";
const DECREASING = "rgba(190, 40, 40, ratio)";

/**
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#a_simple_example
 */
export function SimpleExample(): ReactElement {
  const [{ ratio, increasing }, setState] = useState({
    ratio: 0.0,
    increasing: true,
  });

  const targetRef = useIntersectionObserver({
    threshold: thresholds,
    rootMargin: "0px",
    onUpdate: useCallback((entry) => {
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
      <Typography type="headline-4" margin="none">
        Scroll Down
      </Typography>
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
    </>
  );
}
