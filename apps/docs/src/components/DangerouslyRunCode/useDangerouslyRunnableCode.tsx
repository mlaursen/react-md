// https://github.com/nihgwu/react-runner/tree/974ebc932db7b7c7d59f1b50a79aed705efbf75a
// This is pretty much everything from there except using the new JSX transform
// and I wanted to understand why things were implemented the way they were
// Note: Also switched from useEffect to useMemo since useEffect doesn't report
// errors correctly in strict mode. useMemo is pretty much the same thing as
// useRef + useEffect anyways?
"use client";
import {
  useMemo,
  useState,
  type MutableRefObject,
  type ReactElement,
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

  const [error, setError] = useState<Error | null>(null);
  const element = useMemo(
    () => (
      <DangerouslyRunCode
        code={code}
        scope={scope}
        onRendered={(error) => {
          setError(error);
        }}
      />
    ),
    [code, scope]
  );

  return { element, error };
}
