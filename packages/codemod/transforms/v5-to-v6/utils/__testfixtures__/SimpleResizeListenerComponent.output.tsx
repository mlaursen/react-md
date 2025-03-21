import type { ReactElement } from "react";
import { useState } from "react";
import { Checkbox, Typography, useChecked, useResizeListener } from "react-md";

import CodeBlock from "./CodeBlock";

export default function Demo(): ReactElement {
  const [size, setSize] = useState(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth;
    }

    return 0;
  });

  const [enabled, handleEnabledChange] = useChecked(true);
  const [immediate, handleImmediateChange] = useChecked(true);

  useResizeListener({
    onUpdate: () => setSize(window.innerWidth),
    disabled: !enabled
  });

  return (
    <>
      <Checkbox
        id="resize-enabled"
        name="resizeOptions"
        checked={enabled}
        onChange={handleEnabledChange}
        label="Enable Listener"
      />
      <Checkbox
        id="toggle-resize-listener"
        name="resizeOptions"
        checked={immediate}
        onChange={handleImmediateChange}
        label="Invoke on mount"
      />

      <Typography>The current app size is:</Typography>
      <CodeBlock suppressHydrationWarning>{size}px</CodeBlock>
    </>
  );
}
