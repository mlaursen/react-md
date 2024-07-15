import { type ReactElement, useCallback, useState } from "react";
import { useResizeObserver } from "react-md";

export default function Example(): ReactElement {
  const [state, setState] = useState();
  const [, refCallback] = useResizeObserver(
    useCallback(
      (resizeData) =>
        setState({
          scrollHeight: resizeData.scrollHeight,
          scrollWidth: resizeData.scrollWidth,
          height: resizeData.height,
          width: resizeData.width,
          something: resizeData.element.getBoundingClientRect().top,
        }),
      []
    )
  );

  return <></>;
}
