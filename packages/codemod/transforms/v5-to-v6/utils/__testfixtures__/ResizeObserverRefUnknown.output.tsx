import {
  type ReactElement,
  type Ref,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useEnsuredRef, useResizeObserver } from "react-md";

interface ExampleProps {
  nodeRef?: Ref<HTMLDivElement>;
}

export default function Example({ nodeRef }: ExampleProps): ReactElement {
  const [state, setState] = useState();
  const [ref, nodeRefCallback] = useEnsuredRef(nodeRef);
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

    ref: nodeRefCallback
  });

  useEffect(() => {
    if (ref.current) {
      // do something
    }
  }, []);

  return <div ref={refCallback} />;
}
