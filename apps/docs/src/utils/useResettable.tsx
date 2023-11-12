"use client";
import { createContext, useContext } from "react";

const resettableContext = createContext<VoidFunction | null>(null);
export const { Provider: ResettableContextProvider } = resettableContext;
resettableContext.displayName = "Resettable";

export function useResettableContext(): VoidFunction {
  const value = useContext(resettableContext);
  if (!value) {
    throw new Error("Missing ResettableProvider");
  }

  return value;
}
