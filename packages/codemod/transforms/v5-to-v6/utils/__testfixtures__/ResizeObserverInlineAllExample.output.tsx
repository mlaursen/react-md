import { type ReactElement, useCallback, useState } from "react";
import { useResizeObserver } from "react-md";

export default function Example(): ReactElement {
  const [state, setState] = useState();
  const refCallback = useResizeObserver(
    {
      onUpdate: useCallback(
        entry => {
          setState({
            scrollHeight: entry.target.scrollHeight,
            scrollWidth: entry.target.scrollWidth,
            height: entry.contentRect.height,
            width: entry.contentRect.width,
            something: entry.target.getBoundingClientRect().top,
          });
        },
        []
      )
    }
  );

  return <></>;
}
