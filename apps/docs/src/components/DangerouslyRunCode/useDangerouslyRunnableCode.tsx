// https://github.com/nihgwu/react-runner/tree/974ebc932db7b7c7d59f1b50a79aed705efbf75a
// This is pretty much everything from there except using the new JSX transform
// and I wanted to understand why things were implemented the way they were
"use client";
import {
  useRef,
  useState,
  type MutableRefObject,
  type ReactElement,
  useEffect,
} from "react";
import {
  DangerouslyRunCode,
  type DangerouslyRunCodeResult,
} from "./DangerouslyRunCode.jsx";
import { type DangerouslyRunCodeOptions } from "./utils.jsx";

export interface UpdateOptions extends DangerouslyRunCodeOptions {
  setState(nextState: DangerouslyRunCodeResult): void;
  elementRef: MutableRefObject<ReactElement | null>;
}

export function useDangerouslyRunnableCode(
  options: DangerouslyRunCodeOptions
): DangerouslyRunCodeResult {
  const { code, scope } = options;
  const elementRef = useRef<ReactElement | null>(null);

  const [state, setState] = useState<DangerouslyRunCodeResult>(() => {
    const element = (
      <DangerouslyRunCode
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

    return { element, error: null };
  });

  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    const element = (
      <DangerouslyRunCode
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
    setState({
      error: null,
      element,
    });
  }, [code, scope]);
  return state;
}