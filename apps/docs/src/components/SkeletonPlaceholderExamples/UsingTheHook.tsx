import { randomInt, useSkeletonPlaceholder } from "@react-md/core";
import type { ReactElement } from "react";
import { useEffect, useState } from "react";

export function UsingTheHook(): ReactElement {
  const [disabled, setDisabled] = useState(false);
  const skeleton = useSkeletonPlaceholder({
    style: { overflow: "hidden" },
    disabled,
    // height,
    // width,
    minPercentage: 20,
    maxPercentage: 40,
  });

  useEffect(() => {
    const duration = randomInt({ min: 5, max: 8 }) * 1000;
    const timeout = window.setTimeout(() => {
      setDisabled((prevDisabled) => !prevDisabled);
    }, duration);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [disabled]);

  return (
    <div
      style={{
        width: "109%",
        maxWidth: "40rem",
        border: "1px solid var(--rmd-divider-color)",
        padding: "1rem",
      }}
    >
      <div {...skeleton}>This is some content!</div>
    </div>
  );
}
