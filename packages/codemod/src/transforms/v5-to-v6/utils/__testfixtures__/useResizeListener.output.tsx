import { useState } from "react";
import { useResizeListener } from "react-md";

export default function Example(): null {
  const [size, setSize] = useState(window.innerWidth);
  useResizeListener({
    onUpdate() {
      setSize(window.innerWidth);
    },
  });

  useResizeListener({
    onUpdate: () => setSize(window.innerWidth),
    disabled: true,
  });
  useResizeListener({
    onUpdate: () => setSize(window.innerWidth),
    disabled: !(someFlag || anotherFlag),
  });
  useResizeListener({
    onUpdate: () => setSize(window.innerWidth),
    capture: false
  });
  useResizeListener({
    onUpdate: () => {
      console.log(window.innerWidth);
    },
    once: true,
    passive: true,
  });

  const onResize = (): void => {
    // do nothing
  };
  const options = {};
  useResizeListener({
    ...(typeof options === "boolean" ? {
      capture: options
    } : options),

    onUpdate: onResize
  });

  useResizeListener({
    onUpdate: optionsReference.onResize,
    disabled: typeof optionsReference.enabled === "boolean" && !optionsReference.enabled,
    once: optionsReference.once,
    signal: optionsReference.signal,
    capture: optionsReference.capture,
    passive: optionsReference.passive
  });
  useResizeListener({
    onUpdate: optionsReference.onResize,
    disabled: typeof optionsReference.enabled === "boolean" && !optionsReference.enabled,
    once: optionsReference.once,
    signal: optionsReference.signal,
    capture: optionsReference.capture,
    passive: optionsReference.passive,
    disabled: !flag
  });

  return null;
}
