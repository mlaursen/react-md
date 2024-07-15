import { type ReactElement, useCallback, useState } from "react";
import { useResizeObserver } from "react-md";

export default function Example(): ReactElement {
  const [state, setState] = useState();
  const refCallback = useResizeObserver(
    {
      onUpdate: useCallback(
        entry => {
          setState({
            height: entry.target.scrollHeight,
            width: entry.target.scrollWidth,
          });
        },
        []
      )
    }
  );

  return <></>;
}
