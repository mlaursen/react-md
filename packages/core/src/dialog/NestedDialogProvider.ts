"use client";

import { createContext, useContext } from "react";

export type SetChildDialogVisible = (visible: boolean) => void;

const context = createContext<SetChildDialogVisible>(() => {
  // do nothing
});
context.displayName = "NestedDialog";
export const { Provider: NestedDialogProvider } = context;

export function useNestedDialogContext(): SetChildDialogVisible {
  return useContext(context);
}
