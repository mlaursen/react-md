"use client";
import type { ReactElement, ReactNode } from "react";
import { createContext, useContext } from "react";
import type { HoverModeConfiguration, HoverModeContext } from "../hoverMode";
import { createHoverModeContext, useHoverModeProvider } from "../hoverMode";
import { DEFAULT_TOOLTIP_DELAY } from "./constants";

/** @remarks \@since 6.0.0 */
export type TooltipHoverModeContext = HoverModeContext;

const context = createContext<TooltipHoverModeContext>(
  createHoverModeContext({
    hoverTimeout: DEFAULT_TOOLTIP_DELAY,
    leaveTimeout: 0,
  })
);
context.displayName = "TooltipHoverMode";
const { Provider } = context;

/**
 * @internal
 * @remarks \@since 6.0.0
 */
export function useTooltipHoverMode(): Readonly<TooltipHoverModeContext> {
  return useContext(context);
}

/**
 * @remarks \@since 6.0.0
 */
export interface TooltipHoverModeProviderProps
  extends Partial<HoverModeConfiguration> {
  children: ReactNode;
}

/**
 * **Client Component**
 *
 * @remarks \@since 6.0.0
 */
export function TooltipHoverModeProvider(
  props: TooltipHoverModeProviderProps
): ReactElement {
  const {
    hoverTimeout = DEFAULT_TOOLTIP_DELAY,
    leaveTimeout = 0,
    disableTimeout = DEFAULT_TOOLTIP_DELAY,
    defaultActiveId,
    children,
  } = props;
  const context = useHoverModeProvider({
    hoverTimeout,
    leaveTimeout,
    disableTimeout,
    defaultActiveId,
  });

  return <Provider value={context}>{children}</Provider>;
}
