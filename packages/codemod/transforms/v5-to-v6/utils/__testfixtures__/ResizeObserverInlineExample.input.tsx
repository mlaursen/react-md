import { type ReactElement, useCallback, useState } from "react";
import { useResizeObserver } from "react-md";

export default function Example(): ReactElement {
  const [state, setState] = useState();
  const [, refCallback] = useResizeObserver(
    useCallback(
      (resizeData) =>
        setState({
          height: resizeData.scrollHeight,
          width: resizeData.scrollWidth,
        }),
      []
    )
  );

  return <></>;
}
