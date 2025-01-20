"use client";

import { type UseStateSetter } from "@react-md/core/types";
import {
  type ReactElement,
  type ReactNode,
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";

import { type TestFramework } from "./constants.js";

interface TestFrameworkContext {
  value: TestFramework;
  setValue: UseStateSetter<TestFramework>;
}

const context = createContext<TestFrameworkContext | null>(null);
const { Provider } = context;

export function useTestFramework(): TestFrameworkContext {
  const value = useContext(context);
  if (!value) {
    throw new Error();
  }

  return value;
}

export interface TestFrameworkProviderProps {
  children: ReactNode;
}

export function TestFrameworkProvider({
  children,
}: TestFrameworkProviderProps): ReactElement {
  const [value, setValue] = useState<TestFramework>("jest");
  return (
    <Provider
      value={useMemo(
        () => ({
          value,
          setValue,
        }),
        [value]
      )}
    >
      {children}
    </Provider>
  );
}
