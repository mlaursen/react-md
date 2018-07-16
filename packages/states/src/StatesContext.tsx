import * as React from "react";

export interface IStatesContext {
  /**
   * Boolean if the advanced focus behavior should be enabled. This is really an over-engineered
   * way of making it so that elements only gain the focus state after using the keyboard. If this
   * is disabled, all elements will fallback to using the `:focus` selector instead of a conditional
   * class name.
   */
  advancedFocus: boolean;

  /**
   * The current keyboard focus target. This will be null when there is no element that was keyboard
   * focused via Tab or a "programmatic" focus event.
   */
  focusTarget: HTMLElement | null;

  /**
   * A callback to add a specific element to the list of "valid" focusable targets. This should
   * get called immediately after mounting the consumer.
   */
  initFocusTarget: (el: HTMLElement) => void;

  /**
   * A callback to remove a specific element from the list of "valid" focusable targets. This should get
   * called immediately before unmounting the consumer.
   */
  deinitFocusTarget: (el: HTMLElement) => void;
}

const StatesContext = React.createContext<IStatesContext>({
  advancedFocus: false,
  focusTarget: null,
  initFocusTarget: () => undefined,
  deinitFocusTarget: () => undefined,
});

const { Provider, Consumer } = StatesContext;
export { Provider, Consumer };
