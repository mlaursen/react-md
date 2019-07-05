import React, { Fragment, FC, useState } from "react";
import { useCheckboxState } from "@react-md/form";
import { Text } from "@react-md/typography";
import { ResizeListener } from "@react-md/utils";

import CodeBlock from "components/Code/CodeBlock";
import Checkbox from "components/Checkbox";

const ResizeListenerExample: FC = () => {
  const [size, setSize] = useState(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth;
    }

    return 0;
  });

  const [enabled, handleEnabledChange] = useCheckboxState(true);
  const [immediate, handleImmediateChange] = useCheckboxState(true);

  return (
    <Fragment>
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
      {enabled && (
        <ResizeListener
          immediate={immediate}
          onResize={() => setSize(window.innerWidth)}
        />
      )}
      <Text>The current app size is:</Text>
      <CodeBlock>{size}px</CodeBlock>
    </Fragment>
  );
};

export default ResizeListenerExample;
