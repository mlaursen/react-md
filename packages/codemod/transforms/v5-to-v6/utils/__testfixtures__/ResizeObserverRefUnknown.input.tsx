import { type ReactElement, useCallback, useState } from "react";
import { useResizeObserver } from "react-md";

export default function Example({ nodeRef }): ReactElement {
  const [state, setState] = useState();
  const [ref, refCallback] = useResizeObserver(
    useCallback(
      (resizeData) =>
        setState({
          height: resizeData.scrollHeight,
          width: resizeData.scrollWidth,
        }),
      []
    ),
    {
      ref: nodeRef,
    }
  );

  return <div ref={ref} />;
}
