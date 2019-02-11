import React, { FunctionComponent, ReactNode, useMemo } from "react";
import useKeyboardFocusState from "./hooks/useKeyboardFocusState";
import { KeyboardFocusedId } from "./types.d";
import { KeyboardFocusContext } from "./contexts";
import useKeyboardTrackerState from "./hooks/useKeyboardTrackerState";

export interface IKeyboardTrackerProps {
  children?: ReactNode;
  defaultFocusedId?: KeyboardFocusedId;
  defaultKeyboardMode?: boolean;
}

interface IKeyboardTrackerDefaultProps {
  defaultFocusedId: KeyboardFocusedId;
  defaultKeyboardMode: boolean;
}

type KeyboardTrackerWithDefaultProps = IKeyboardTrackerProps &
  IKeyboardTrackerDefaultProps;

/**
 * The `KeyboardTracker` component is used to determine if your app is in keyboard mode
 * as well as which element on the page is currently keyboard focused. `react-md` relies
 * on this component heavily for different focus states. Unfortunately, this component
 * can only track elements that have `id`s at the moment. It might be possible to update
 * it in the future to allow any element to be tracked, but it is kind of good practice
 * to add unique ids to interactable elements anyways so it isn't a major priority.
 *
 * There should probably only be 1 `KeyboardTracker` component defined in your app at
 * a time since they create window event listeners to track the current focused element.
 */
const KeyboardTracker: FunctionComponent<IKeyboardTrackerProps> = props => {
  const {
    children,
    defaultFocusedId,
    defaultKeyboardMode,
  } = props as KeyboardTrackerWithDefaultProps;

  const value = useKeyboardTrackerState(defaultFocusedId, defaultKeyboardMode);
  return (
    <KeyboardFocusContext.Provider value={value}>
      {children}
    </KeyboardFocusContext.Provider>
  );
};

const defaultProps: IKeyboardTrackerDefaultProps = {
  defaultFocusedId: null,
  defaultKeyboardMode: false,
};

KeyboardTracker.defaultProps = defaultProps;

export default KeyboardTracker;
