import React, { Fragment, FunctionComponent, useState } from "react";
import { ResizeListener } from "@react-md/sizing";
import { Text } from "@react-md/typography";
import { useToggle } from "@react-md/utils";

import CodeBlock from "components/Code/CodeBlock";

const ResizeListenerExample: FunctionComponent = () => {
  const [size, setSize] = useState(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth;
    }

    return 0;
  });

  const { toggled, toggle } = useToggle(true);
  const { toggled: immediate, toggle: toggleImmediate } = useToggle(true);

  return (
    <Fragment>
      <label htmlFor="toggle-resize-listener">Enable Listener:</label>
      <input
        id="toggle-resize-listener"
        type="checkbox"
        checked={toggled}
        onChange={toggle}
      />
      <label htmlFor="toggle-resize-listener">Invoke on mount:</label>
      <input
        id="toggle-resize-invocation"
        type="checkbox"
        checked={immediate}
        onChange={toggleImmediate}
      />
      {toggled && (
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
