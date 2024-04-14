"use client";
import {
  createContext,
  useContext,
  type ReactElement,
  type ReactNode,
} from "react";
import {
  createHoverModeContext,
  useHoverModeProvider,
  type HoverModeConfiguration,
  type HoverModeContext,
} from "../hoverMode/useHoverModeProvider.js";
import { DEFAULT_TOOLTIP_DELAY } from "./constants.js";

/** @since 6.0.0 */
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
 * @since 6.0.0
 */
export function useTooltipHoverMode(): Readonly<TooltipHoverModeContext> {
  return useContext(context);
}

/**
 * @since 6.0.0
 */
export interface TooltipHoverModeProviderProps
  extends Partial<HoverModeConfiguration> {
  children: ReactNode;

  /**
   * @see {@link HoverModeConfiguration.hoverTimeout}
   * @defaultValue `1000`
   */
  hoverTimeout?: number;

  /**
   * @see {@link HoverModeConfiguration.leaveTimeout}
   * @defaultValue `0`
   */
  leaveTimeout?: number;

  /**
   * @see {@link HoverModeConfiguration.disableTimeout}
   * @defaultValue `1000`
   */
  disableTimeout?: number;
}

/**
 * **Client Component**
 *
 * Updates all tooltips that are rendered as a child anywhere in the React tree
 * to immediately appear for a short duration once a tooltip has become visible.
 * You can also use this provider to configure all tooltips' visibility delay to
 * a new value.
 *
 * @example
 * Configuration Example
 * ```tsx
 * <TooltipHoverModeProvider
 *   // wait 3 seconds before displaying any tooltips
 *   hoverTimeout={3000}
 *
 *   // wait 1 second before hiding any tooltips
 *   leaveTimeout={1000}
 *
 *   // disable the hover mode functionality only if another tooltip has not
 *   // been visible for 20 seconds
 *   disableTimeout={20000}
 * >
 *   <RestOfTheApp />
 * </TooltipHoverModeProvider>
 * ```
 *
 * @since 6.0.0
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
