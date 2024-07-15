import { type ReactElement, useCallback, useState } from "react";
import { useResizeObserver } from "react-md";

export default function Example(): ReactElement {
  const [state, setState] = useState();
  const refCallback = useResizeObserver(
    {
      onUpdate: useCallback((entry) => {
        const {
          height: height,
          width: width
        } = entry.contentRect;

        const element = entry.target;

        const {
          scrollHeight: scrollHeight,
          scrollWidth: scrollWidth
        } = element;

        const x = element.getBoundingClientRect().left;
        setState({
          x,
          height,
          width,
          scrollHeight,
          scrollWidth,
        });
      }, [])
    }
  );

  return <></>;
}
