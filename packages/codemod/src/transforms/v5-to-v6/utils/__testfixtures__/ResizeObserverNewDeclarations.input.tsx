import { type ReactElement, useCallback, useState } from "react";
import { useResizeObserver } from "react-md";

export default function Example(): ReactElement {
  const [state, setState] = useState();
  const [, refCallback] = useResizeObserver(
    useCallback((resizeData) => {
      const { height, width, scrollHeight, scrollWidth, element } = resizeData;

      const x = element.getBoundingClientRect().left;
      setState({
        x,
        height,
        width,
        scrollHeight,
        scrollWidth,
      });
    }, [])
  );

  return <></>;
}
