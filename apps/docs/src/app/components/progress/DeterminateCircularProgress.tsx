import { CircularProgress, loop } from "@react-md/core";
import { useEffect, useState, type ReactElement } from "react";

export default function DeterminateCircularProgress(): ReactElement {
  const progress = useProgress();
  return (
    <>
      <CircularProgress value={10} />
      <CircularProgress value={30} />
      <CircularProgress value={70} />
      <CircularProgress value={progress} />
    </>
  );
}

function useProgress(): number {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const interval = window.setInterval(() => {
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
      window.clearInterval(interval);
    };
  }, []);

  return progress;
}
