import { type ReactElement, useCallback, useState } from "react";
import { useEnsuredRef, useResizeObserver } from "react-md";

export default function Example({ nodeRef: TEMP_nodeRef }): ReactElement {
  const [state, setState] = useState();
  const [nodeRef, TEMP_nodeRefCallback] = useEnsuredRef(TEMP_nodeRef);
  const refCallback = useResizeObserver({
    onUpdate: useCallback(
      entry => {
        setState({
          height: entry.target.scrollHeight,
          width: entry.target.scrollWidth,
        });
      },
      []
    ),

    ref: TEMP_nodeRefCallback
  });

  return <div ref={ref} />;
}
