// https://github.com/nihgwu/react-runner/tree/974ebc932db7b7c7d59f1b50a79aed705efbf75a
// This is pretty much everything from there except using the new JSX transform
// and I wanted to understand why things were implemented the way they were
"use client";
import {
  useEffect,
  useRef,
  useState,
  type MutableRefObject,
  type ReactElement,
} from "react";
import { Runner } from "./Runner.jsx";
import { type DangerouslyRunCodeOptions } from "./utils.jsx";

export interface UpdateOptions extends DangerouslyRunCodeOptions {
  setState(nextState: DangerouslyRunCodeResult): void;
  elementRef: MutableRefObject<ReactElement | null>;
}

export interface DangerouslyRunCodeResult {
  error: Error | null;
  element: ReactElement | null;
}

export function useDangerouslyRunnableCode(
  options: DangerouslyRunCodeOptions
): DangerouslyRunCodeResult {
  const { code, scope } = options;
  const elementRef = useRef<ReactElement | null>(null);
  const [state, setState] = useState<DangerouslyRunCodeResult>(() => {
    const element = (
      <Runner
        code={code}
        scope={scope}
        onRendered={(error) => {
          if (error) {
            setState({
              error,
              element: elementRef.current,
            });
          } else {
            elementRef.current = element;
          }
        }}
      />
    );
    return {
      error: null,
      element,
    };
  });

  useEffect(() => {
    const element = (
      <Runner
        code={code}
        scope={scope}
        onRendered={(error) => {
          if (error) {
            setState({
              error,
              element: elementRef.current,
            });
          } else {
            elementRef.current = element;
          }
        }}
      />
    );
    setState({ error: null, element });
  }, [code, scope]);

  return state;
}
