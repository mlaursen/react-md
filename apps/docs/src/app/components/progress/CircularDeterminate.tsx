import { CircularProgress, loop } from "@react-md/core";
import { useState, type ReactElement, useEffect } from "react";

export default function CircularDeterminate(): ReactElement {
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
  return (
    <>
      <CircularProgress value={10} />
      <CircularProgress value={30} />
      <CircularProgress value={70} />
      <CircularProgress value={progress} />
    </>
  );
}
