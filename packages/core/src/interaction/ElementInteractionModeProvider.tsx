import type { ReactElement, ReactNode } from "react";
import { createContext, useContext } from "react";

export type ElementInteractionMode = "ripple" | "press" | "none";

const context = createContext<ElementInteractionMode>("ripple");
context.displayName = "ElementInteractionMode";
const { Provider } = context;

export function useElementInteractionMode(): ElementInteractionMode {
  return useContext(context);
}

export interface ElementInteractionModeProviderProps {
  /**
   * @defaultValue `"ripple"`
   */
  mode?: ElementInteractionMode;
  children: ReactNode;
}

export function ElementInteractionModeProvider(
  props: ElementInteractionModeProviderProps
): ReactElement {
  const { mode = "ripple", children } = props;
  return <Provider value={mode}>{children}</Provider>;
}
