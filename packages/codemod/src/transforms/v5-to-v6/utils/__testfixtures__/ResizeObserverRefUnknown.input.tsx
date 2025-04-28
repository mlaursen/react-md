import {
  type ReactElement,
  type Ref,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useResizeObserver } from "react-md";

interface ExampleProps {
  nodeRef?: Ref<HTMLDivElement>;
}

export default function Example({ nodeRef }: ExampleProps): ReactElement {
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

  useEffect(() => {
    if (ref.current) {
      // do something
    }
  }, []);

  return <div ref={refCallback} />;
}
