"use client";
import { ResettableContextProvider } from "@/utils/useResettable.jsx";
import {
  useCallback,
  useState,
  type ReactElement,
  type ReactNode,
} from "react";

export interface ResettableProviderProps {
  children: ReactNode;
}

export function ResettableProvider(
  props: ResettableProviderProps
): ReactElement {
  const { children } = props;

  const [key, setKey] = useState(false);
  const reset = useCallback(() => {
    setKey((prev) => !prev);
  }, []);

  return (
    <ResettableContextProvider value={reset} key={`${key}`}>
      {children}
    </ResettableContextProvider>
  );
}
