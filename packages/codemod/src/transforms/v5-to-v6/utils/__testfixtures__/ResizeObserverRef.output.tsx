import { type ReactElement, useCallback, useRef, useState } from "react";
import { useResizeObserver } from "react-md";

export default function Example(): ReactElement {
  const [state, setState] = useState();
  const nodeRef = useRef();
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

    ref: nodeRef
  });

  return <div ref={ref} />;
}
