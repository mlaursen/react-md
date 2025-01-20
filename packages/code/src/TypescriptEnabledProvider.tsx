"use client";

import { type UseStateInitializer } from "@react-md/core/types";
import {
  type ReactElement,
  type ReactNode,
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";

const noop = (): void => {
  // do nothing
};

export interface TypescriptEnabledContext {
  isTypescriptEnabled: boolean;
  setTypescriptEnabled: (enabled: boolean) => void;
}

const context = createContext<TypescriptEnabledContext | null>(null);
context.displayName = "TypescriptEnabled";
const { Provider } = context;

export function useTypescriptEnabledContext(): TypescriptEnabledContext {
  const value = useContext(context);
  if (!value) {
    throw new Error("TypescriptEnabledProvider is not mounted.");
  }

  return value;
}

export interface TypescriptEnabledProviderProps {
  children: ReactNode;
  defaultValue?: UseStateInitializer<boolean>;
  onTypescriptEnabledChange?: (enabled: boolean) => void;
}

export function TypescriptEnabledProvider(
  props: TypescriptEnabledProviderProps
): ReactElement {
  const {
    children,
    defaultValue = true,
    onTypescriptEnabledChange = noop,
  } = props;

  const [isTypescriptEnabled, setTypescriptEnabled] = useState(defaultValue);

  const value = useMemo<TypescriptEnabledContext>(
    () => ({
      isTypescriptEnabled,
      setTypescriptEnabled(enabled) {
        onTypescriptEnabledChange(enabled);
        setTypescriptEnabled(enabled);
      },
    }),
    [isTypescriptEnabled, onTypescriptEnabledChange]
  );
  return <Provider value={value}>{children}</Provider>;
}
