import { type ReactElement, useCallback, useRef, useState } from "react";
import { useResizeObserver } from "react-md";

export default function Example(): ReactElement {
  const [state, setState] = useState();
  const nodeRef = useRef();
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
