import { useState } from "react";
import { useResizeListener } from "react-md";

export default function Example(): null {
  const [size, setSize] = useState(window.innerWidth);
  useResizeListener({
    onResize() {
      setSize(window.innerWidth);
    },
  });

  useResizeListener({
    onResize: () => setSize(window.innerWidth),
    enabled: false,
  });
  useResizeListener({
    onResize: () => setSize(window.innerWidth),
    enabled: someFlag || anotherFlag,
  });
  useResizeListener({
    immediate: false,
    onResize: () => setSize(window.innerWidth),
    options: false,
  });
  useResizeListener({
    immediate: someFlag,
    onResize: () => {
      console.log(window.innerWidth);
    },
    options: {
      once: true,
      passive: true,
    },
  });

  const onResize = (): void => {
    // do nothing
  };
  const options = {};
  useResizeListener({
    onResize,
    options,
  });

  useResizeListener(optionsReference);
  useResizeListener({
    ...optionsReference,
    enabled: flag,
  });

  return null;
}
