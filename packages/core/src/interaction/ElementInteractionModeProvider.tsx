import type { ReactElement, ReactNode } from "react";
import { createContext, useContext } from "react";
import type { ElementInteractionMode } from "./types";

const context = createContext<ElementInteractionMode>("ripple");
context.displayName = "ElementInteractionMode";
const { Provider } = context;

/**
 * @remarks \@since 6.0.9
 * @internal
 */
export function useElementInteractionMode(): ElementInteractionMode {
  return useContext(context);
}

/** @remarks \@since 6.0.9 */
export interface ElementInteractionModeProviderProps {
  /** {@inheritDOc ElementInteractionMode} */
  mode?: ElementInteractionMode;
  children: ReactNode;
}

/**
 * Note: This is automatically included by the {@link CoreProviders}
 * @remarks \@since 6.0.9
 */
export function ElementInteractionModeProvider(
  props: ElementInteractionModeProviderProps
): ReactElement {
  const { mode = "ripple", children } = props;
  return <Provider value={mode}>{children}</Provider>;
}
