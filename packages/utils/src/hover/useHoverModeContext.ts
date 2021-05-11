import { createContext, useContext } from "react";

import { DEFAULT_HOVER_MODE_VISIBLE_IN_TIME } from "./constants";

/** @internal */
const noop = (): void => {
  // do nothing
};

/**
 * This is mostly an internal interface since everything you need will be
 * available in the {@link useHoverMode} hook.
 *
 * @remarks \@since 2.8.0
 */
export interface HoverModeActions {
  /**
   * A function that will enable the hover mode for all connected components.
   * This should normally be called after hovering over an element for the
   * {@link HoverModeContext.visibleInTime}.
   */
  enableHoverMode(): void;

  /**
   * A function that will disable the hover mode for all connected components.
   * This should normally be called after leaving a hoverable element or the
   * {@link UserInteractionMode} changes to `"touch"`.
   */
  disableHoverMode(): void;

  /**
   * A function that will start a timer for disabling the hover mode for all
   * connected components. This should normally be called after leaving a
   * hoverable element
   */
  startDisableTimer(): void;
}

/**
 * This is mostly an internal interface since everything you need will be
 * available in the {@link useHoverMode} hook.
 *
 * @remarks \@since 2.8.0
 */
export interface HoverModeContext extends HoverModeActions {
  /**
   * The amount of time (in ms) before the element being hovered should
   * switch the visibility from `false` to `true`.
   */
  visibleInTime: number;
}

/** @internal */
const context = createContext<HoverModeContext>({
  visibleInTime: DEFAULT_HOVER_MODE_VISIBLE_IN_TIME,
  enableHoverMode: noop,
  disableHoverMode: noop,
  startDisableTimer: noop,
});

/**
 * @internal
 * @remarks \@since 2.8.0
 */
export const { Provider: HoverModeContextProvider } = context;

/**
 * Gets the {@link HoverModeContext} which allows you implement hover mode
 * functionality for any component. This is mostly an internal hook since
 * everything you need will be available in the {@link useHoverMode} hook.
 *
 * @internal
 * @remarks \@since 2.8.0
 * @returns The {@link HoverModeContext}
 */
export function useHoverModeContext(): HoverModeContext {
  return useContext(context);
}
