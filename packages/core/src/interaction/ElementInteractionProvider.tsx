"use client";
import type { ReactElement, ReactNode } from "react";
import { createContext, useContext, useMemo } from "react";
import type { ElementInteractionMode } from "./types.js";

export interface ElementInteractionContext {
  mode: ElementInteractionMode;
  higherContrast: boolean;
}

const context = createContext<ElementInteractionContext>({
  mode: "ripple",
  higherContrast: true,
});
context.displayName = "ElementInteraction";
const { Provider } = context;

/**
 * @remarks \@since 6.0.9
 * @internal
 */
export function useElementInteractionContext(): Readonly<ElementInteractionContext> {
  return useContext(context);
}

/** @remarks \@since 6.0.9 */
export interface ElementInteractionProviderProps {
  /** {@inheritDoc ElementInteractionMode} */
  mode?: ElementInteractionMode;
  /**
   * This should be set to `true` if the `$disable-higher-contrast-interactions`
   * SCSS variable is set to `false`.
   *
   * @defaultValue `false`
   */
  disableHigherContrast?: boolean;
  children: ReactNode;
}

/**
 * **Client Component**
 *
 * Note: This is automatically included by the {@link CoreProviders}
 * @remarks \@since 6.0.9
 */
export function ElementInteractionProvider(
  props: ElementInteractionProviderProps
): ReactElement {
  const { mode = "ripple", disableHigherContrast = false, children } = props;
  const value = useMemo<ElementInteractionContext>(
    () => ({
      mode,
      higherContrast: !disableHigherContrast,
    }),
    [disableHigherContrast, mode]
  );

  return <Provider value={value}>{children}</Provider>;
}
