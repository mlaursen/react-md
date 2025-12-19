import { CircularProgress } from "@react-md/core/progress/CircularProgress";
import { loop } from "@react-md/core/utils/loop";
import { type ReactElement, useEffect, useState } from "react";

export default function DeterminateCircularProgress(): ReactElement {
  const progress = useProgress();
  return (
    <>
      <CircularProgress aria-label="Example" value={10} />
      <CircularProgress aria-label="Example" value={30} />
      <CircularProgress aria-label="Example" value={70} />
      <CircularProgress aria-label="Example" value={progress} />
    </>
  );
}

function useProgress(): number {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const interval = globalThis.setInterval(() => {
      setProgress(
        (prev) =>
          loop({
            min: 0,
            max: 10,
            value: prev / 10,
            increment: true,
          }) * 10
      );
    }, 1000);

    return () => {
      globalThis.clearInterval(interval);
    };
  }, []);

  return progress;
}
